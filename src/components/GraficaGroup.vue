<script lang='ts' setup>
import { ref, reactive, onMounted, watch, toRefs, defineEmits } from "vue";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import {
  anilloCMDB,
  equipo,
  enlace,
  ColorEquipo,
  ImagenEquipo,
} from "../models/infoCMDB";

const props = defineProps<{
  nodes: any[];
  links: any[];
  busquedaGrupo: string;
}>();

onMounted(() => {
  //                        ==> MOUNTED
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  window.addEventListener("resize", function () {
    console.log("me movieron");
  });

  let color = d3.scaleOrdinal(d3.schemeCategory10);
  let curveTypes = [
    "curveBasisClosed",
    "curveCardinalClosed",
    "curveCatmullRomClosed",
    "curveLinearClosed",
  ];

  let polygon: any;
  let centroid: any;
  let scaleFactor = 1.3;

  let valueline = d3
    .line()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return d[1];
    })
    .curve(d3.curveLinearClosed);

  const dragBehavior = d3
    .drag()
    .on("start", (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event: any, d: any) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }) as any; //as any

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "fixed")
    .style("padding", "3px 15px")
    .style("border-radius", "3px")
    .style("font-family", "Roboto Condensed")
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .style("text-transform", "uppercase")
    .style("text-align", "center")
    .style("background-color", "#646464")
    //.style("border", "solid 1px #faf2cc")
    .style("color", "#fff");

  const zoomBehavior = d3
    .zoom()
    .scaleExtent([1 / 3, 4])
    .on("zoom", (event, d) => {
      nombreServidor.attr("transform", event.transform);
      ipLabel.attr("transform", event.transform);
      groups.attr("transform", event.transform);
      link.attr("transform", event.transform);
      node.attr("transform", event.transform);
      lablelAnilloOwned.attr("transform", event.transform);
    }) as any; //as any

  let svg = d3.select("svg").attr("width", width).attr("height", height);
  let groups = svg.append("g").attr("class", "groups");

  let grupoAnillos = props.nodes
    .map((nodo: equipo) => {
      return nodo.group;
    })
    .filter((grupo, index, self) => {
      return self.indexOf(grupo) == index;
    })
    .filter((group) => group != 0);

  /*
  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    //.attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("opacity", 0.6)
    .attr("fill", "#000000de")
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");
    */

  var link = svg
    .append("g")
    .attr("class", "links")
    .attr("stroke-opacity", 0.8)
    .selectAll("line")
    .data(props.links)
    .enter()
    .append("path")
    .attr("stroke-width", 4)
    .attr("fill", "transparent")
    .attr("stroke", (d: any) => {
      return d.color;
    });

  let paths = groups
    .selectAll(".path_placeholder")
    .data(grupoAnillos, function (d: any) {
      return +d;
    })
    .enter()
    .append("g")
    .attr("class", "path_placeholder")
    .append("path")
    .attr("stroke", function (d: any) {
      return color(d);
    })
    .attr("fill", function (d: any) {
      return color(d);
    })
    .attr("opacity", 0.3);
  //.call(dragBehavior);

  //paths.transition().duration(2000).attr("opacity", 0.2);
  let nombreServidor = d3
    .select(".names")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .style("font-size", "11px")
    .text(function (d) {
      return d.nombre;
    });

  let ipLabel = d3
    .select(".ips")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .style("font-size", "11px")

    .text(function (d) {
      return d.ip;
    });

  let lablelAnilloOwned = svg
    .append("g")
    .attr("class", "label-anillo")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .style("font-size", "11px")
    .attr("font-weight", 800)
    .attr("fill", (d) => color(d.group))
    .attr("fill", (d) => color(d.group))
    .text(function (d) {
      if (d.tipo == "Switch" && d.containsLinkRed) return d.nombreAnillo;
      //else if(d.tipo == "Router" && d.containsLinkRed && d.numCoincidences > 1) return "COMPARTIDO";
      else if (d.tipo == "Router" && d.containsLinkRed && d.numCoincidences < 2)
        return d.nombreAnillo;
      //if(d.tipo == "OLT" ) return d.nombreAnillo;
      //return "sdsdsdsd"
    });

  let node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("image")
    .data(props.nodes)
    .enter()
    .append("image")
    .attr("width", (d: any) => {
      return d.tipo == "EM" ? 42 : 55;
    })
    .attr("height", (d: any) => {
      return d.tipo == "EM" ? 42 : 55;
    })
    .attr("xlink:href", (d: any) => {
      return d.imagen;
    })
    .call(dragBehavior)
    .on("mouseover.tooltip", function (d, n) {
      console.log("d: ", d)
      tooltip.transition().duration(300).style("opacity", 0.8);
      tooltip
        .html(n.tipo)
        .style("left", d.pageX + "px")
        .style("top", d.pageY + 10 + "px");
    })
    .on("mouseout.tooltip", function () {
      tooltip.transition().duration(100).style("opacity", 0);
    })
    .on("mousemove", function (d, n) {
      tooltip
        .style("left", d.pageX + "px")
        .style("top", d.pageY + 10 + "px");
    });

  svg.call(zoomBehavior);

  let simulation = d3
    .forceSimulation()
    //.force("link",d3.forceLink().id((d: any) => {return d.id;}).distance(1))
    .force("x", d3.forceX().strength(0))
    .force("y", d3.forceY().strength(0))
    .force("charge", d3.forceManyBody().strength(-1030))
    .force("center", d3.forceCenter(width / 2, height / 1.8))
    .force("radial", d3.forceRadial(10, width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(45));

  simulation.nodes(props.nodes).on("tick", ticked);
  simulation.force(
    "link",
    d3
      .forceLink()
      .id((d: any) => d.id)
      .links(props.links)
  );

  //simulation.alpha(1).restart().tick();
  //simulation.alpha(1).restart();

  var polygonGenerator = function (groupId: any) {
    var node_coords = node
      .filter(function (d) {
        return d.group == groupId;
      })
      .data()
      .map(function (d) {
        return [d.x, d.y];
      }) as any;

    return d3.polygonHull(node_coords);
  };

  function updateGroups() {
    grupoAnillos.forEach(function (groupId) {
      var path: any = paths
        .filter(function (d) {
          return d == groupId;
        })
        .attr("transform", "scale(1) translate(0,1)")
        .attr("d", function (d: any) {
          polygon = polygonGenerator(d);
          centroid = d3.polygonCentroid(polygon);

          // to scale the shape properly around its points:
          // move the 'g' element to the centroid point, translate
          // all the path around the center of the 'g' and then
          // we can scale the 'g' element properly
          return valueline(
            polygon.map(function (point: any) {
              //console.log("point: ", point)
              return [point[0] - centroid[0], point[1] - centroid[1]];
            })
          );
        });

      d3.select(path.node().parentNode).attr(
        "transform",
        `translate(${centroid[0]},${centroid[1]}) scale(${scaleFactor})`
      );
    });
  }

  function ticked() {
    link.attr("d", function (d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      let rectline = `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
      let curveLine = `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ,${d.target.x},${d.target.y}`;
      //let rectline = "M" + d.source.x + "," + d.source.y + "L" + d.target.x +"," +d.target.y;
      //let curve = "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      return d.isDoubleLink ? curveLine : rectline;
    });

    nombreServidor
      .attr("x", function (d) {
        return d.x - (d.nombre.length / 2) * 6;
      })
      .attr("y", function (d) {
        return d.y - 25;
      });

    ipLabel
      .attr("x", function (d) {
        return d.x - (d.nombre.length / 2) * 3;
      })
      .attr("y", function (d) {
        return d.y - 40;
      });

    lablelAnilloOwned
      .attr("x", function (d) {
        return d.x - 60;
      })
      .attr("y", function (d) {
        return d.y + 30;
      });

    node
      .attr("x", (d: any) => {
        if (d.tipo == "POP") return d.x - 18;
        else if (d.tipo == "EM") return d.x - 18;
        else return d.x - 22;
      })
      .attr("y", (d: any) => {
        if (d.tipo == "POP") return d.y - 23;
        if (d.tipo == "EM") return d.y - 23;
        else if (d.tipo == "Switch") return d.y - 26;
        else return d.y - 35;
      });

    //updateGroups();
  }

  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(1);
    d.fx = null;
    d.fy = null;
  }
});
</script>

<template>
  <svg id="graphDiv">
    <g class="links"></g>
    <g class="dobleLink"></g>
    <g class="nodes"></g>
    <g class="names"></g>
    <g class="ips"></g>
  </svg>
</template>


<style scoped>
.simbologia {
  position: fixed;
  right: 5px;
  top: 0px;
  width: 12%;
}
</style>
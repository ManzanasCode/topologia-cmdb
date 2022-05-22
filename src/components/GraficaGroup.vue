<script lang='ts' setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import {scaleLinear} from "d3-scale";

onMounted(() => {
  //                        ==> MOUNTED
  const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

  window.addEventListener('resize', function () {
    console.log("me movieron")
    });
  
  let color = d3.scaleOrdinal(d3.schemeCategory10);
  let curveTypes = ['curveBasisClosed', 'curveCardinalClosed', 'curveCatmullRomClosed', 'curveLinearClosed'];
  
   let svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  

 
  //let width = +svg.attr("width");
  //let height = +svg.attr("height");
  let g = svg
    .append("g")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

  const zoomBehavior = d3
    .zoom()
    .scaleExtent([1 / 3, 4])
    .on("zoom", (event, d) => {
      node.attr("transform", event.transform);
      link.attr("transform", event.transform);
      nombreServidor.attr("transform", event.transform);
      ipLabel.attr("transform", event.transform);
    }) as any; //as any

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("opacity", 0.6)
    .attr("fill", "#000000de")
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

  var link = svg
    .append("g")
    .attr("class", "links")
    .attr("stroke-opacity", 0.8)
    .selectAll("line")
    .data(props.links)
    .enter()
    .append("path")
    .attr("stroke-width", 4)
    .attr("fill", 'transparent')
    .attr("stroke", (d: any) => {
      return d.color;
    });

  const dragBehavior = d3
    .drag()
    .on("start", (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(1).restart();
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

  let node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("image")
    .data(props.nodes)
    .enter()
    .append("image")
    .attr("width", (d:any)=> { 
      return (d.tipo=="POP") ? 45 : 55
     })
     .attr("height", (d:any)=> { 
      return (d.tipo=="POP") ? 45 : 55
     })
    .attr("xlink:href",  (d:any)=> { return d.imagen})
    //.attr("fill", (d: any) => {return d.color;})
    //.attr("r", function (d) { return 12; })
    .call(dragBehavior);

  let nombreServidor = d3
    .select(".names")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .style("font-size", '11px')
    .text(function (d) {
      return d.nombre;
    });

    let ipLabel = d3
    .select(".ips")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .style("font-size", '11px')
    .text(function (d) {
      return d.ip;
    });
    

  svg.call(zoomBehavior);

  let simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id((d: any) => {
        return d.id;
      }).distance(0)
    )
    
    .force("x", d3.forceX().strength(0))
    .force("y", d3.forceY().strength(0))
   .force("charge", d3.forceManyBody().strength(-1030))
    .force("center", d3.forceCenter(width / 2, height / 2.5))
    .force("radial", d3.forceRadial(10, width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(35));

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

  function ticked() {
    link
    .attr("d", function(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    //console.log("M" + d.source.x + "," + d.source.y + "L"  + d.target.x + "," + d.target.y)
    let line = "M" + d.source.x + "," + d.source.y + "L"  + d.target.x + "," + d.target.y
    let curve = "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y
    return (d.isDoubleLink) ? curve : line
  });

      

    node
      .attr("x", (d: any) => {
        return (d.tipo=="POP") ?  d.x - 18 :  d.x - 22;
      })
      .attr("y", (d: any) => {
        return (d.tipo=="POP") ?  d.y -23 :  d.y -35;
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
  }
});

const props = defineProps<{
  nodes: any[];
  links: any[];
}>();
</script>

<template>
  
    <svg  id="graphDiv">
      <g class="links"></g>
      <g class="dobleLink"></g>
      <g class="nodes"></g>
      <g class="names"></g>
      <g class="ips"></g>
    </svg>
  
</template>



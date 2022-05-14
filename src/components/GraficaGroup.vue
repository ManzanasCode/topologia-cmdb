<script lang='ts' setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";

onMounted(() => {
  //                        ==> MOUNTED

  let svg = d3.select("svg");
  let width = +svg.attr("width");
  let height = +svg.attr("height");
  let g = svg
    .append("g")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

   
   

  const zoomBehavior = d3
    .zoom()
    .scaleExtent([1 / 2, 4])
    .on("zoom", (event, d) => {
        node.attr("transform", event.transform);
        link.attr("transform", event.transform);
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
    .attr("d", "M0,-5L10,0L0,5")
    

  var link = svg
    .append("g")
    .attr("class", "links")
    .attr("stroke-opacity", 0.8)
    .selectAll("line")
    .data(props.links)
    .enter()
    .append("line")
    .attr("stroke-width", (d: any) => {
      return "3.5px";
    })
    .attr("stroke", (d: any) => {
      return d.color;
    });

  var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(props.nodes)
    .enter()
    .append("circle")
    .attr("fill", (d: any) => {
      return d.color;
    })
    .attr("r", function (d) {
      return 12;
    });

svg.call(zoomBehavior);

  let simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3
        .forceLink()
        .distance(80)
        .id(function (d: any) {
          return d.id;
        })
    )
    .force("charge", d3.forceManyBody().strength(-45))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(30));

  simulation.nodes(props.nodes).on("tick", ticked);
  simulation.force(
    "link",
    d3
      .forceLink()
      .id((d: any) => d.id)
      .links(props.links)
  );

  //simulation.alpha(1).restart();


  function zoomed() {
    //node.attr("transform", zoomTransform);
    //link.attr("transform", zoomTransform);
    //names.attr("transform", zoomTransform);
    //ipLabels.attr("transform", zoomTransform);
  }

  function ticked() {
    link
      .attr("x1", function (d: any) {
        return d.source.x;
      })
      .attr("y1", function (d: any) {
        return d.source.y;
      })
      .attr("x2", function (d: any) {
        return d.target.x;
      })
      .attr("y2", function (d: any) {
        return d.target.y;
      });

    node
      .attr("cx", (d: any) => {
        return d.x;
      })
      .attr("cy", (d: any) => {
        return d.y;
      });
  }
});

const props = defineProps<{
  nodes: any[];
  links: any[];
}>();
</script>

<template>
  <v-container>
    <svg width="1100" height="1100" id="graphDiv">
      <g class="links"></g>
      <g class="dobleLink"></g>
      <g class="nodes"></g>
      <g class="names"></g>
      <g class="ips"></g>
    </svg>
  </v-container>
</template>



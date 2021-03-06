
<script setup lang="ts">
import { reactive, ref } from "vue";
import * as vNG from "v-network-graph";
import data from "../demoConfigs/data";
import data2 from "../demoConfigs/data2";
import icons from "../demoConfigs/icons";
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";



const configs = reactive(
  vNG.defineConfigs({
    view: {
      autoPanOnResize: true,
      panEnabled: true,
      zoomEnabled: true,
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: false,
        // * The following are the default parameters for the simulation.
        // * You can customize it by uncommenting below.
        /*  */
        createSimulation: (d3, nodes, edges) => {
          const forceLink = d3
            .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
            .id((d: any) => d.id);
          return d3
            .forceSimulation(nodes)
            .force("edge", forceLink.distance(50))
            .force("charge", d3.forceManyBody().strength(-250))
            .force("center", d3.forceCenter(1, 1))
            .force("collide", d3.forceCollide())
            .force("center", d3.forceCenter())
            .alphaMin(0.001);
        },
      }),
    },
    node: {
      normal: {
        type: "circle",
        radius: (node) => 13,
      },
      draggable: true,
      label: {
        visible: true,
        fontFamily: undefined,
        fontSize: 12,
        lineHeight: 1.1,
        color: "#000000",
        margin: 8,
        direction: "south",
        text: "labelDisplay",
      },
    },
  })
);

const layouts = ref({
  nodes: {
    node1: {
      x: -90,
      y: -500,
      fixed: true, // Unaffected by force
    },
  },
});

const nodes = reactive({});
const edges = reactive({});

const zoomLevel = ref(0.8);
</script>

<template>
  <div class="outer-box">
    <div class="resizable">
      <div class="handle"></div>
      <v-network-graph
        v-model:zoom-level="zoomLevel"
        :nodes="data.nodes"
        :edges="data.edges"
        :configs="configs"
      >
        <template #override-node="{ nodeId, scale, config, ...slotProps }">
          <!-- circle for filling background -->
          <circle
            class="face-circle"
            :r="15 * scale"
            fill="#ffffff"
            v-bind="slotProps"
          />
          <!--
        The base position of the <image /> is top left. The node's
        center should be (0,0), so slide it by specifying x and y.
      -->
          <image
            class="face-picture"
            :x="-15 * 2"
            :y="-15 * 2"
            :width="55"
            :height="55"
            :xlink:href="`./icons/router_black_blue.png`"
            clip-path="url(#faceCircle)"
          />

          <circle
            class="face-circle"
            :r="config.radius * scale"
            fill="none"
            stroke="#808080"
            :stroke-width="1 * scale"
            v-bind="slotProps"
            style="display: none"
          />

          <!-- circle for drawing stroke -->
        </template>
      </v-network-graph>
    </div>
  </div>
</template>
<style scoped>
.outer-box {
  margin: 0px;
  width: 100%;
  height: 600px;
  position: relative;
  background-color: #aaaaaa;
}
.resizable {
  position: relative;
  resize: both;
  overflow: hidden;
  
  width: 100%;
  height: 100%;
  border: 1px solid #444444;
  background-color: #ffffff;
}
.handle {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid #ff8f8f;
  border-bottom: 8px solid #ff8f8f;
  pointer-events: none;
}
</style>
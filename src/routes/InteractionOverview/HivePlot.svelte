<!-- src/components/HivePlot.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let genes;
  export let interactions;

  const width = 600;
  const height = 600;
  const radius = 200;
  const numAxes = 3; // Number of axes (you can adjust this based on your data)
  const angleBetweenAxes = (2 * Math.PI) / numAxes;
  const axisNames = ['regulator', 'workhorse', 'manager'];

  let svg;

  // Function to calculate the x, y coordinates of a gene based on the axis
  function getPosition(gene, axis) {
    const angle = axis * angleBetweenAxes - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  }

  onMount(() => {
    // You can add interactivity or additional features here if required
  });
</script>

<style>
  /* Add your CSS styling for the Hive Plot visualization here */
  .gene-node {
    fill: blue;
    stroke: #fff;
    cursor: pointer;
  }

  .gene-node-text {
    font-size: 12px;
  }

  .gene-edge {
    stroke: gray;
    stroke-width: 1;
  }
</style>

<svg bind:this={svg} width={width} height={height}>
  <g transform={`translate(${width / 2}, ${height / 2})`}>
    <!-- Draw axes -->
    {#each axisNames as axisName, i}
      <line
        x1={radius * Math.cos(i * angleBetweenAxes - Math.PI / 2)}
        y1={radius * Math.sin(i * angleBetweenAxes - Math.PI / 2)}
        x2={radius * Math.cos(i * angleBetweenAxes - Math.PI / 2 + Math.PI)}
        y2={radius * Math.sin(i * angleBetweenAxes - Math.PI / 2 + Math.PI)}
        stroke="gray"
      />
      <text
        x={radius * Math.cos(i * angleBetweenAxes - Math.PI / 2 + Math.PI / 2)}
        y={radius * Math.sin(i * angleBetweenAxes - Math.PI / 2 + Math.PI / 2)}
        text-anchor="middle"
        alignment-baseline="middle"
      >
        {axisName}
      </text>
    {/each}

    <!-- Draw genes -->
    {#each genes as gene}
      {#if gene.gene_start > 0}
        <circle
          class="gene-node"
          cx={radius * Math.cos(axisNames.indexOf(gene.axes) * angleBetweenAxes - Math.PI / 2)}
          cy={radius * Math.sin(axisNames.indexOf(gene.axes) * angleBetweenAxes - Math.PI / 2)}
          r="5"
        />
        <text
          class="gene-node-text"
          x={radius * Math.cos(axisNames.indexOf(gene.axes) * angleBetweenAxes - Math.PI / 2)}
          y={radius * Math.sin(axisNames.indexOf(gene.axes) * angleBetweenAxes - Math.PI / 2)}
          text-anchor="middle"
          alignment-baseline="middle"
        >
          {gene.ngn}
        </text>
      {/if}
    {/each}

    <!-- Draw interactions -->
    {#each interactions as interaction}
      <line
        class="gene-edge"
        x1={radius * Math.cos(axisNames.indexOf(interaction.from_gene.axes) * angleBetweenAxes - Math.PI / 2)}
        y1={radius * Math.sin(axisNames.indexOf(interaction.from_gene.axes) * angleBetweenAxes - Math.PI / 2)}
        x2={radius * Math.cos(axisNames.indexOf(interaction.to_gene.axes) * angleBetweenAxes - Math.PI / 2)}
        y2={radius * Math.sin(axisNames.indexOf(interaction.to_gene.axes) * angleBetweenAxes - Math.PI / 2)}
      />
    {/each}
  </g>
</svg>

<svg bind:this={svg} width={width} height={height}></svg>

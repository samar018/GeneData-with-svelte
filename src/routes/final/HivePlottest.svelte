<script>
  import { onMount } from 'svelte';

  let nodes = [
    {
      "gene_name": "Fis",
      "axes": "regulator"
    },
    {
      "gene_name": "CRP",
      "axes": "manager"
    },
    {
      "gene_name": "OtherGene",
      "axes": "workhorse"
    }
    // ... more nodes
  ];

  const svgWidth = 600;
  const svgHeight = 600;
  const minDistance = 50;
  const maxDistance = 300;
  const circleRadius = 5;

  const axisColors = {
    regulator: 'red',
    manager: 'yellow',
    workhorse: 'green'
  };

  onMount(() => {
    // Additional setup or data processing can be done here
  });
</script>

<style>
  /* Add your styles here */
</style>

<div class="hive-plot-container">
  <svg width={svgWidth} height={svgHeight}>
    {#each nodes as node, i}
      {#if node.axes === 'regulator'}
        <circle
          cx={svgWidth / 2}
          cy={svgHeight / 2 - (i * (maxDistance - minDistance)) / nodes.length}
          r={circleRadius}
          fill={axisColors[node.axes]}
        />
      {:else if node.axes === 'manager'}
        <!-- Position manager nodes -->
      {:else if node.axes === 'workhorse'}
        <!-- Position workhorse nodes -->
      {/if}
    {/each}
  </svg>
</div>

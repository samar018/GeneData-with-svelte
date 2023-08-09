<!-- HivePlot.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fetchGenesData } from './genes.js';
  import { fetchInteractionsData } from './interactions.js';

  // Variables to store the fetched data
  let genes = [];
  let interactions = [];
  function calculateNodePositions() {
    // Create separate arrays to store genes for each group
    const regulators = [];
    const managers = [];
    const workhorses = [];

    // Categorize genes based on their "axes" property
    genes.forEach((gene) => {
      if (gene.axes === 'regulator') {
        regulators.push(gene);
      } else if (gene.axes === 'manager') {
        managers.push(gene);
      } else if (gene.axes === 'workhorse') {
        workhorses.push(gene);
      }
    });

    // Calculate the angles for each gene in radians
    const angleStepRegulator = (2 * Math.PI) / regulators.length;
    const angleStepManager = (2 * Math.PI) / managers.length;
    const angleStepWorkhorse = (2 * Math.PI) / workhorses.length;

    // Calculate the distance from the center for each gene
    const minDistance = 50;
    const maxDistance = 300;
    const distanceStepRegulator = (maxDistance - minDistance) / (regulators.length - 1);
    const distanceStepManager = (maxDistance - minDistance) / (managers.length - 1);
    const distanceStepWorkhorse = (maxDistance - minDistance) / (workhorses.length - 1);

    // Set the x and y coordinates for each gene
    regulators.forEach((gene, index) => {
      gene.x = minDistance + distanceStepRegulator * index;
      gene.y = 0;
    });

    managers.forEach((gene, index) => {
      gene.x = maxDistance - distanceStepManager * index;
      gene.y = maxDistance;
    });

    workhorses.forEach((gene, index) => {
      gene.x = minDistance + distanceStepWorkhorse * index;
      gene.y = maxDistance;
    });

    // Now you can calculate the positions of interactions between genes using their x and y coordinates.
    // You can set the control points for the quadratic Bezier curves here.
    interactions.forEach((interaction) => {
      interaction.controlPointX = (interaction.fromGene.x + interaction.toGene.x) / 2;
      interaction.controlPointY = (interaction.fromGene.y + interaction.toGene.y) / 2;
    });
  }

  onMount(async () => {
    // Fetch the gene data
    genes = await fetchGenesData();

    // Fetch the interaction data
    interactions = await fetchInteractionsData();

    // Calculate node positions for the hive plot
    calculateNodePositions();
  });

</script>

<style>
  /* Add your Hiveplot styles here */
</style>

<!-- Your Hiveplot visualization code goes here -->
<div class="hiveplot-container">
  <svg width="600" height="600">
    <!-- Example code to draw the hive plot -->
    <!-- Replace this with your hive plot visualization code -->
    {#each genes as gene}
      <!-- Draw genes as circles based on their properties -->
      {#if gene.axes === 'regulator'}
        <circle cx="{gene.x}" cy="{gene.y}" r="2" fill="red" />
      {:else if gene.axes === 'workhorse'}
        <circle cx="{gene.x}" cy="{gene.y}" r="2" fill="green" />
      {:else if gene.axes === 'manager'}
        <circle cx="{gene.x}" cy="{gene.y}" r="2" fill="yellow" />
      {/if}
    {/each}

    {#each interactions as interaction}
      <!-- Draw interactions as quadratic Bezier curves between genes -->
      <path
        d={`M ${interaction.fromGene.x} ${interaction.fromGene.y} Q ${interaction.controlPointX} ${interaction.controlPointY} ${interaction.toGene.x} ${interaction.toGene.y}`}
        fill="none"
        opacity="0.3"
        stroke="black"
      />
    {/each}
  </svg>
</div>

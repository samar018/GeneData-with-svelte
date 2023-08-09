<!-- page.svelte -->
<script>
  import { onMount } from "svelte";
  import { json } from "d3-fetch";
  import HivePlot from './HivePlot.svelte';

  // URLs for your datasets
  const genesDataURL ='https://vda-lab.github.io/assets/genes.json';
  const interactionsDataURL = "https://vda-lab.github.io/assets/interactions.json";

  let genesData;
  let interactionsData;

  // Load the gene data
  onMount(async () => {
    try {
      genesData = await json(genesDataURL);
    } catch (error) {
      console.error("Error loading genes data:", error);
    }
  });

  // Load the gene-gene interactions data
  onMount(async () => {
    try {
      interactionsData = await json(interactionsDataURL);
    } catch (error) {
      console.error("Error loading interactions data:", error);
    }
  });
</script>

{#if genesData && interactionsData}
  <!-- Render the HivePlot component once both datasets are loaded -->
  <HivePlot genesData={genesData} interactionsData={interactionsData} />
{:else}
  <!-- Show a loading message or placeholder while the data is being fetched -->
  <p>Loading...</p>
{/if}

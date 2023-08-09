<!-- +page.svelte -->
<script>
  import { onMount } from 'svelte';
  import Hiveplot from './Hiveplot.svelte';

  let nodes;
  let interactions;

  async function fetchData() {
    try {
      // Fetch genome data
      const genomeResponse = await fetch('https://vda-lab.github.io/assets/genes.json');
      const genomeData = await genomeResponse.json();
      console.log('Genome Data:', genomeData);

      // Fetch gene-gene interaction data
      const interactionsResponse = await fetch('https://vda-lab.github.io/assets/interactions.json');
      const interactionsData = await interactionsResponse.json();
      console.log('Interactions Data:', interactionsData);

      nodes = genomeData;
      interactions = interactionsData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
    fetchData();
  });
</script>

<style>
  /* Add any custom styles for your app here */
</style>

<div>
  {#if nodes && interactions}
    <Hiveplot {nodes} {interactions} />
  {:else}
    <p>Loading genome data...</p>
  {/if}
</div>

<!-- +page.svelte -->
<script>
  import HivePlot from './HivePlot.svelte';

  let genes;
  let interactions;

  async function loadData() {
    try {
      // Fetch the gene data
      const genesResponse = await fetch('https://vda-lab.github.io/assets/genes.json');
      genes = await genesResponse.json();

      // Fetch the interaction data
      const interactionsResponse = await fetch('https://vda-lab.github.io/assets/interactions.json');
      interactions = await interactionsResponse.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      // You can handle errors here, e.g., show an error message or retry fetching.
    }
  }

  loadData();
</script>

<main>
  {#if genes && interactions}
    <HivePlot {genes} {interactions} />
  {:else}
    <p>Loading genome data...</p>
  {/if}
</main>

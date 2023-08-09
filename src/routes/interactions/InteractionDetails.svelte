<script>
  import { onMount } from 'svelte';
  import { navigate, useParams } from '@sveltejs/kit';

  import interactionsData from './interactionsData.json'; // Replace this with the actual URL or data import method
  import GeneDetails from './GeneDetails.svelte'; // Importing the GeneDetails component

  let interactionId;
  let interaction;

  // Get the interaction ID from the URL parameters
  const { id } = useParams();
  interactionId = id;

  // Filter the interaction data based on the interaction ID
  onMount(() => {
    interaction = interactionsData.find(
      (interaction) => interaction.from_id + '-' + interaction.to_id === interactionId
    );
  });

  // Function to handle clicking on the "Details" link for a gene
  async function showGeneDetails(d) {
    const geneId = d.gene_id;
    await navigate(`/gene/${geneId}`);
  }
</script>

<h1>Interaction Details</h1>
{#if interaction}
  <p>From Gene:</p>
  <GeneDetails gene={interaction.fromGene} on:showDetails={showGeneDetails} />

  <p>To Gene:</p>
  <GeneDetails gene={interaction.toGene} on:showDetails={showGeneDetails} />
{:else}
  <p>Loading...</p>
{/if}

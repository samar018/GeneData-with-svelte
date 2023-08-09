<script>
  export let gene;

  // import { setContext } from 'svelte';
  // // Create a context variable to pass the gene data
  // setContext('geneContext', gene);

  // Replace xxxxx with the actual gene ID
  const regulonDBLink = `http://regulondb.ccg.unam.mx/gene?organism=ECK12&format=jsp&type=gene&term=${gene.gene_id}`;
</script>

<h2>{gene.gene_name}</h2>
<ul>
  <li>ID: {gene.gene_id}</li>
  <li>Blattner number: {gene.gene_blattner_number}</li>
  <li>Start: {gene.gene_start}</li>
  <li>Stop: {gene.gene_stop}</li>
  <li>Strand: {gene.gene_strand}</li>
  <li>Product: {gene.gene_product}</li>
  {#if gene.gene_confidence}
    <li>Confidence: {gene.gene_confidence}</li>
  {/if}
  {#if gene.gene_evidence}
    <li>Evidence:
      <ul>
        {#each gene.gene_evidence.split(',') as evidence}
          <li>{evidence.trim()}</li>
        {/each}
      </ul>
    </li>
  {/if}
  <li><a href="{regulonDBLink}" target="_blank">RegulonDB link</a></li>
</ul>

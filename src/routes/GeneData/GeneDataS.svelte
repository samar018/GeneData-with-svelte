<!-- GeneData.svelte -->
<script>
  import GenomeScatterPlot from './GeneDataPlot.svelte';

  let genesData;
  let downloadProgress = 0;

  // Function to handle the download button click
  const handleDownload = async () => {
    // Your download logic...
  };

  // Function to fetch the data
  const fetchData = async () => {
    try {
      const response = await fetch('https://vda-lab.github.io/assets/genes.json');
      genesData = await response.json();

      // Transform the data into genomeData required for the scatter plot
      genomeData = genesData.map((gene) => ({
        x: gene.x_coordinate,
        y: gene.y_coordinate,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch the data when the component mounts
  fetchData();

  // genomeData array to store the transformed data for the scatter plot
  let genomeData = [];
</script>

<main>
  <h1>Gene Data Display</h1>
  {#if genesData}
    <pre>{JSON.stringify(genesData, null, 2)}</pre>
    <GenomeScatterPlot data={genomeData} />
    <button on:click={handleDownload}>Download Data</button>
    <div class="progress-bar">
      <div class="progress" style="width: {downloadProgress}%"></div>
    </div>
  {:else}
    <p>Loading gene data...</p>
  {/if}
</main>

<style>
  /* Add styling for the component here */
  .progress-bar {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
  }

  .progress {
    background-color: #4CAF50;
    height: 100%;
    transition: width 0.2s ease-in;
  }
</style>

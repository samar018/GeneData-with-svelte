<!-- GeneData.svelte -->
<script>
  let genesData;
  let downloadProgress = 0;

  // Function to handle the download button click
  const handleDownload = async () => {
    try {
      const response = await fetch('https://vda-lab.github.io/assets/genes.json');
      const jsonData = await response.json();
      const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'genes.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to fetch the data
  const fetchData = async () => {
    try {
      const response = await fetch('https://vda-lab.github.io/assets/genes.json');
      genesData = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch the data when the component mounts
  fetchData();
</script>

<main>
  <h1>Gene Data Display</h1>
      <button on:click={handleDownload}>Download Data</button>
    <div class="progress-bar">
      <div class="progress" style="width: {downloadProgress}%"></div>
    </div>
  {#if genesData}
    <pre>{JSON.stringify(genesData, null, 2)}</pre>
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

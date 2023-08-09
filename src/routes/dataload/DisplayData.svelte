<!-- DisplayData.svelte -->
<script>
  export let data;

  // State variable to track download progress
  let downloadProgress = 0;

  // Function to handle the download button click
  const handleDownload = () => {
    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
</script>

<main>
  <h1>Displaying Flower Sepal Lengths</h1>
  {#if data}
    <ul>
      {#each data as flower}
        <li>{flower.sepalLength}</li>
      {/each}
    </ul>
    <button on:click={handleDownload}>Download Data</button>
    <div class="progress-bar">
      <div class="progress" style="width: {downloadProgress}%"></div>
    </div>
  {:else}
    <p>Error fetching data.</p>
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

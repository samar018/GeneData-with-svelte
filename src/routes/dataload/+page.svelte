<!-- +page.svelte -->
<script>
  // Fetch data using the loadData.js module
  import { load } from './loadData.js';
  import DisplayData from './DisplayData.svelte';

  let jsonData;

  load().then((data) => {
    jsonData = data.jsonData;
    console.log(jsonData); // Add this line to check the fetched data
  });
</script>

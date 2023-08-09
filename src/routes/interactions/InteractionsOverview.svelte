<script>
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import { curveCatmullRom } from 'd3-shape';

  let data = []; // This will store your merged data

  onMount(async () => {
    try {
      const response = await fetch('./merged_data.json');
      data = await response.json();
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

</script>

<div id="hiveplot-container"></div>


<svg width=400 height=400>
  <circle cx=100 cy=100 r=15 />
  <circle cx=150 cy=75 r=20 />
  <rect x=250 y=300 width=30 height=20 />
</svg>

<script>
  let datapoints = [{x: 100, y: 100},
                    {x: 150, y: 275},
                    {x: 10, y: 101},
                    {x: 80, y: 183},
                    {x: 350, y: 45},
                    {x: 201, y: 285},
                    {x: 150, y: 306},
                    {x: 90, y: 102},
                    {x: 73, y: 39},
                    {x: 332, y: 269}]
</script>

<style>
    circle {
        fill-opacity: 0.5;
    }
</style>

<svg width=400 height=400>
  {#each datapoints as dp}
    <circle cx={dp.x} cy={dp.y} r=10 />
  {/each}
</svg>



<script lang="ts">
  import { gun } from "../initGun.js"

  let count = 0
  const increment = () => {
    update(count + 1)
  }

  const update = (newcount: number) => gun.get("clickcount").put({totclicks: newcount})

  gun.get("clickcount").map().on(function(data: any, key: string) {
    count = data
  })

</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>

<script lang="ts">
  import logo from './assets/logo.svg'
  import Counter from './lib/Counter.svelte'
  import { gun } from "./initGun.js"


  interface Todo {
    title: string;
    done: boolean;
  }

  let input: string = ""
  const create = () => gun.get("todos").get(input).put({title: input, done: false})
  const update = (key: string, value: boolean) => gun.get("todos").get(key).get("done").put(value)
  const remove = key => gun.get("todos").get(key).put(null)

  let store: { [key: string]: Todo } = {}
  gun.get("todos").map().on(function(data: Todo, key: string) {
    if(data) {
      store[key] = data
    } else {
      delete store[key]
      store = store
    }
  })

  // Sort the array by done status
  $: todos =  Object.entries(store)
                    .sort((
                      a: [string, Todo], b: [string, Todo]) => 
                        a[1].done == b[1].done ? 0 : 0 + Number(a[1].done) - Number(b[1].done)
                    )
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>Welcome to InfoZone!</h1>

  
  <Counter />
  <hr>
  <input placeholder="Add todo" bind:value={input}>
  <button on:click={() => create() && (input = "")}>Add</button>

  <div>
    {#each todos as [key, todo]}
    <div id={key}>
        <input type="checkbox" checked={todo.done} on:change={() => update(key, !todo.done)} >
        {todo.title} <a href="/" on:click|preventDefault={() => remove(key)}>remove</a>
    </div>
    {/each}
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>

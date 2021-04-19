<Home {data}/>

<script context="module">
  import { load as loadHome } from "./_home.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    output = {
      ...output,
      ...(await loadHome(params)),
    };

    return output;
  }
</script>

<script>
  import Home from "./_home.svelte";

  export let data;
</script>

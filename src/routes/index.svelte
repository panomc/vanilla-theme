<MainLayout sidebar="{sidebar()}">
  <Home data="{data}" />
</MainLayout>

<script context="module">
  import { load as loadHome, sidebar } from "$lib/pages/Home.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadHome(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import Home from "$lib/pages/Home.svelte";
  import MainLayout from "$lib/layouts/MainLayout.svelte";

  export let data;
</script>

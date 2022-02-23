<MainLayout>
  <Error title="{title}" />
</MainLayout>

<script context="module">
  import { load as loadError } from "$lib/pages/Error.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadError(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import Error from "$lib/pages/Error.svelte";
  import MainLayout from "$lib/layouts/MainLayout.svelte";

  export let title;
</script>

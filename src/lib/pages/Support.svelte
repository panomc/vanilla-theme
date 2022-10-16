Support page!

<script context="module">
  import { setSidebar } from "$lib/Store.js";

  import SupportSidebar from "$lib/component/sidebars/SupportSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    setSidebar(SupportSidebar);
  }
</script>

<script>
  export let data;
</script>

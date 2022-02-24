<MainLayout>
  <slot />
</MainLayout>

<script context="module">
  import { keepSidebar, setSidebar } from "$lib/Store.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    // when page opens, set default
    setSidebar(null);
    keepSidebar.set(false);

    return {};
  }
</script>

<script>
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";

  import { page } from "$app/stores";

  import MainLayout from "$lib/layouts/MainLayout.svelte";

  // check on page change and set null if page doesn't have sidebar
  onDestroy(
    page.subscribe(() => {
      if (!get(keepSidebar)) {
        setSidebar(null);
      } else {
        keepSidebar.set(false);
      }
    })
  );
</script>

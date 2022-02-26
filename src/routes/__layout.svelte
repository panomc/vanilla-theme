<MainLayout>
  <slot />
</MainLayout>

<script context="module">
  import { keepSidebar, setSidebar } from "$lib/Store.js";
  import { browser } from "$app/env";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    // when page opens, set default
    if (!browser) {
      setSidebar(null);
      keepSidebar.set(false);
    }

    return {};
  }
</script>

<script>
  import { get } from "svelte/store";

  import { afterNavigate } from "$app/navigation";

  import MainLayout from "$lib/layouts/MainLayout.svelte";

  // check on page change and set null if page doesn't have sidebar
  afterNavigate(() => {
    if (!get(keepSidebar)) {
      setSidebar(null);
    } else {
      keepSidebar.set(false);
    }
  });
</script>

<MainLayout>
  <slot />
</MainLayout>

<script context="module">
  import {
    keepSidebar,
    setSidebar,
    processQueuedSidebar,
    sidebarPageInit,
  } from "$lib/Store.js";
  import { browser } from "$app/env";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    // when page opens, set default
    if (!browser) {
      setSidebar(null);
      keepSidebar.set(false);
      processQueuedSidebar();
      sidebarPageInit.set(true);
    }

    return {};
  }
</script>

<script>
  import { afterNavigate } from "$app/navigation";

  import MainLayout from "$lib/layouts/MainLayout.svelte";

  // check on page change and set null if page doesn't have sidebar
  afterNavigate((navigation) => {
    if ($keepSidebar) {
      keepSidebar.set(false);
      processQueuedSidebar();

      return;
    }

    if (navigation.from && navigation.from.pathname !== navigation.to.pathname) {
      setSidebar(null);
      processQueuedSidebar();
    }
  });
</script>

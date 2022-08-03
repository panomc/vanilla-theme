<App>
  <Header />

  <Navbar />

  <Main>
    <slot />
  </Main>

  <Footer />

  <!-- Modals Start-->
  <LoginModal />

  <RegisterModal />

  <!-- Modals End -->
</App>

<script context="module">
  import {
    keepSidebar,
    setSidebar,
    processQueuedSidebar,
    sidebarPageInit,
  } from "$lib/Store.js";
  import { browser } from "$app/env";

  import ApiUtil from "$lib/api.util.js";

  function sendVisitorVisitRequest({ request, CSRFToken }) {
    ApiUtil.post({ path: "/api/visitorVisit", request, CSRFToken })
  }

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    if (browser) {
      sendVisitorVisitRequest({ request });
    }

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

  import Header from "$lib/component/Header.svelte";
  import Navbar from "$lib/component/Navbar.svelte";
  import Main from "$lib/component/Main.svelte";
  import Footer from "$lib/component/Footer.svelte";
  import App from "$lib/component/App.svelte";

  import LoginModal from "$lib/component/modals/LoginModal.svelte";
  import RegisterModal from "$lib/component/modals/RegisterModal.svelte";

  // check on page change and set null if page doesn't have sidebar
  afterNavigate((navigation) => {
    if ($keepSidebar) {
      keepSidebar.set(false);
      processQueuedSidebar();

      return;
    }

    if (
      navigation.from &&
      navigation.from.pathname !== navigation.to.pathname
    ) {
      setSidebar(null);
      processQueuedSidebar();
    }
  });
</script>

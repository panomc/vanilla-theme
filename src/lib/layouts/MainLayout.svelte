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
    session,
  } from "$lib/Store.js";

  import ApiUtil from "$lib/api.util.js";
  import { browser } from "$app/environment";
  import { get } from "svelte/store";

  function sendVisitorVisitRequest({ event, CSRFToken }) {
    ApiUtil.post({ path: "/api/visitorVisit", request: event, CSRFToken });
  }

  /**
   * @type {import('@sveltejs/kit').LayoutLoad}
   */
  export async function load(event) {
    const {
      data: { user, CSRFToken },
    } = event;

    session.set({ user, CSRFToken });

    if (browser) {
      sendVisitorVisitRequest({ event, CSRFToken: get(session).CSRFToken });
    }
  }

  /**
   * @type {import('@sveltejs/kit').LayoutLoad}
   */
  export async function loadServer({ locals: { user, CSRFToken } }) {
    setSidebar(null);
    keepSidebar.set(false);
    processQueuedSidebar();
    sidebarPageInit.set(true);

    return { user, CSRFToken };
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
      navigation.from.url.pathname !== navigation.to.url.pathname
    ) {
      setSidebar(null);
      processQueuedSidebar();
    }
  });
</script>

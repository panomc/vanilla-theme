<svelte:head>
  <title>{$session.siteInfo.websiteName}</title>
</svelte:head>

<App>
  <Header />

  <!-- Gives a gray background color to the container area -->
  <div class="bg-light blocks">
    <Navbar />
    <Main>
      <slot />
    </Main>
  </div>

  <Footer />

  <!-- Modals Start-->
  <LoginModal />

  <RegisterModal />

  <!-- Modals End -->

  <NotificationContainer />
</App>

<script context="module">
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  import ApiUtil from "$lib/api.util.js";
  import { init as initLanguage } from "$lib/language.util";

  import { addListener } from "$lib/NotificationManager.js";

  function sendVisitorVisitRequest({ event, CSRFToken }) {
    ApiUtil.post({ path: "/api/visitorVisit", request: event, CSRFToken });
  }

  function initNotificationListeners() {
    addListener("AN_ADMIN_REPLIED_TICKET", (notification) => {
      const {
        properties: { id },
      } = notification;

      goto("/ticket/" + id, { invalidateAll: true });
    });

    addListener("AN_ADMIN_CLOSED_TICKET", (notification) => {
      const {
        properties: { id },
      } = notification;

      goto("/ticket/" + id, { invalidateAll: true });
    });
  }

  /**
   * @type {import('@sveltejs/kit').LayoutServerLoad}
   */
  export async function loadServer(event) {
    const {
      locals: { user, CSRFToken },
    } = event;

    const siteInfo = await ApiUtil.get({
      path: "/api/siteInfo",
      request: event,
      CSRFToken,
    });

    return { user, CSRFToken, siteInfo };
  }

  /**
   * @type {import('@sveltejs/kit').LayoutLoad}
   */
  export async function load(event) {
    const {
      data: { user, CSRFToken, siteInfo },
      parent,
    } = event;
    await parent();

    const output = {
      session: { user, CSRFToken, siteInfo },
    };

    await initLanguage(siteInfo.locale);

    if (browser) {
      initNotificationListeners();
    }

    if (browser) {
      sendVisitorVisitRequest({ event, CSRFToken });
    }

    return output;
  }
</script>

<script>
  import { onDestroy, setContext } from "svelte";

  import { page } from "$app/stores";

  import Header from "$lib/component/Header.svelte";
  import Navbar from "$lib/component/Navbar.svelte";
  import Main from "$lib/component/Main.svelte";
  import Footer from "$lib/component/Footer.svelte";
  import App from "$lib/component/App.svelte";

  import LoginModal from "$lib/component/modals/LoginModal.svelte";
  import RegisterModal from "$lib/component/modals/RegisterModal.svelte";
  import NotificationContainer from "$lib/component/NotificationContainer.svelte";

  export let data;

  const session = writable(data.session);
  const sidebar = writable(null);
  const sidebarProps = writable({});

  const pageUnsubscribe = page.subscribe((page) => {
    session.update(() => page.data.session);
    sidebar.update(() => page.data.sidebar);
    sidebarProps.update(() => page.data.sidebarProps || {});
  });

  setContext("session", session);
  setContext("sidebar", sidebar);
  setContext("sidebarProps", sidebarProps);

  onDestroy(pageUnsubscribe);
</script>

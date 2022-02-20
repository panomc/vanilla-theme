<!-- Modals End -->
<style lang="scss" global>
  @import "../styles/style.scss";
</style>

<Header />

<Navbar />

<Main>
  <slot />
</Main>

<Footer />

<!-- Modals Start-->
<LoginModal />

<ResetPasswordModal />

<RegisterModal />

<ForgottenPasswordModal />

<script>
  import { browser } from "$app/env";

  if (browser) {
    import("$lib/init.libs");
  }

  import Header from "$lib/component/Header.svelte";
  import Navbar from "$lib/component/Navbar.svelte";
  import Main from "$lib/component/Main.svelte";
  import Footer from "$lib/component/Footer.svelte";

  import LoginModal from "$lib/component/modals/LoginModal.svelte";
  import ForgottenPasswordModal from "$lib/component/modals/ForgottenPasswordModal.svelte";
  import RegisterModal from "$lib/component/modals/RegisterModal.svelte";
  import ResetPasswordModal from "$lib/component/modals/ResetPasswordModal.svelte";
</script>

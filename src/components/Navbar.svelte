<!-- Navbar -->
<div class="container">
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary rounded shadow-primary">
    <button
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
      class="navbar-toggler d-lg-none"
      data-target="#navbar"
      data-toggle="collapse"
      type="button">
      <i aria-hidden="true" class="fa fa-bars"></i>
    </button>

    <ul class="navbar-nav flex-row ml-auto order-lg-last">
      {#if $session.user === "-"}
        <li class="nav-item mr-lg-0 mr-5">
          <a
            class="nav-link"
            href="javascript:void(0);"
            on:click="{showLoginModal}">
            GİRİŞ YAP
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="javascript:void(0);"
            on:click="{showRegisterModal}">
            KAYIT OL
          </a>
        </li>
      {:else}
        <li class="nav-item mr-lg-0 mr-5">
          <div class="dropdown">
            <a
              class="nav-link"
              href="javascript:void(0);"
              id="playerMenuDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <i class="fas fa-user mr-2" aria-hidden="true"></i>
              {$session.user.username}
            </a>
            <div class="dropdown-menu" aria-labelledby="playerMenuDropdown">
              <a class="dropdown-item" href="/profile">Profil</a>
              <a class="dropdown-item" href="/tickets">Talepler</a>
              <a class="dropdown-item" href="/settings">Ayarlar</a>
              <a
                class="dropdown-item text-danger"
                href="javascript:void(0);"
                on:click="{logout}">Çıkış Yap</a>
            </div>
          </div>
        </li>
      {/if}
    </ul>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav text-lg-left text-center mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="/">ANA SAYFA</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<script context="module">
  let ApiUtil;

  async function initUtils() {
    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }
  }
</script>

<!-- Navbar -->
<script>
  import { show as showLoginModal } from "./modals/LoginModal.svelte";
  import { show as showRegisterModal } from "./modals/RegisterModal.svelte";

  import { session } from "$app/stores";

  async function logout() {
    await initUtils();

    await new Promise((resolve) => {
      ApiUtil.post("auth/logout", {}).then(() => {
        session.update((session) => {
          session.user = "-";

          return session;
        });

        resolve();
      });
    });
  }
</script>

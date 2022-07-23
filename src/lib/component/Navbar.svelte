<!-- Navbar -->
<style>
  @media (max-width: 991.98px) {
    .rounded-pill {
      border-radius: 0.3rem !important;
    }
  }
</style>

<div class="container">
  <nav
    class="navbar navbar-expand-lg navbar-dark fw-bolder-lightglass bg-primary bg-gradient rounded-pill shadow px-lg-2 px-4 py-2">
    <button
      class="navbar-toggler d-lg-none"
      data-bs-target="#navbar"
      data-bs-toggle="collapse"
      type="button">
      <i aria-hidden="true" class="fa fa-bars"></i>
    </button>

    <ul class="navbar-nav flex-row ml-auto order-lg-last">
      {#if $session.user && $session.user.panelAccess}
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/panel">
            <i
              class="fa-solid fa-arrow-up fa-rotate-by"
              style="--fa-rotate-angle: 45deg;"></i> Panel
          </a>
        </li>
      {/if}
      {#if $session.user}
        <li class="nav-item rounded-pill mr-lg-0 mr-5">
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <i class="fas fa-user-circle"></i>
              {$session.user.username}
            </a>
            <div class="dropdown-menu dropdown-menu-end position-absolute">
              <a class="dropdown-item" href="/profile">Profil</a>
              <a class="dropdown-item" href="/profile/settings">Ayarlar</a>
              <a
                class="dropdown-item text-danger"
                href="javascript:void(0);"
                on:click="{() => logout($session.CSRFToken)}">Çıkış Yap</a>
            </div>
          </div>
        </li>
      {:else}
        <li class="nav-item rounded-pill mr-lg-0 mr-5">
          <a
            class="nav-link"
            href="javascript:void(0);"
            on:click="{showLoginModal}">
            Giriş Yap
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="javascript:void(0);"
            on:click="{showRegisterModal}">
            Kayıt Ol
          </a>
        </li>
      {/if}
    </ul>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav text-lg-left text-center mr-auto mt-2 mt-lg-0">
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/">
            <i class="fa-solid fa-house"></i>
          </a>
        </li>
        <li class="nav-item rounded-pill">
          <a href="/tickets" class="nav-link">Destek</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<!-- Navbar -->
<script>
  import { session } from "$app/stores";
  import { logout } from "$lib/Store";

  import { show as showLoginModal } from "./modals/LoginModal.svelte";
  import { show as showRegisterModal } from "./modals/RegisterModal.svelte";
</script>

<!-- Navbar -->

<div class="container">
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary rounded-pill shadow px-lg-2 px-4">
    <button
      class="navbar-toggler d-lg-none"
      data-bs-target="#navbar"
      data-bs-toggle="collapse"
      type="button">
      <i aria-hidden="true" class="fa fa-bars"></i>
    </button>

    <ul class="navbar-nav flex-row ml-auto order-lg-last">
      {#if $session.user}
        <li class="nav-item rounded-pill mr-lg-0 mr-5">
          <div class="dropdown">
            <a
              class="nav-link"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {$session.user.username}
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="/profile">Profil</a>
              <a class="dropdown-item" href="/tickets">Talepler</a>
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
        <li class="nav-item rounded-pill active">
          <a class="nav-link" href="/">Ana Sayfa</a>
        </li>
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/">Ana Sayfa</a>
        </li>
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/">Ana Sayfa</a>
        </li>
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/">Ana Sayfa</a>
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

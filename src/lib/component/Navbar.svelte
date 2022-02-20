<!-- Navbar -->
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary rounded shadow-lg">
    <button
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
      class="navbar-toggler d-lg-none"
      data-target="#navbar"
      data-bs-toggle="collapse"
      type="button">
      <i aria-hidden="true" class="fa fa-bars"></i>
    </button>

    <ul class="navbar-nav flex-row ml-auto order-lg-last">
      {#if $session.user}
        <li class="nav-item mr-lg-0 mr-5">
          <div class="dropdown">
            <a
              class="nav-link"
              href="#"
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
                href="#"
                on:click="{() => logout($session.CSRFToken)}">Çıkış Yap</a>
            </div>
          </div>
        </li>
      {:else}
        <li class="nav-item mr-lg-0 mr-5">
          <a class="nav-link" href="#" on:click="{showLoginModal}">
            Giriş Yap
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" on:click="{showRegisterModal}">
            Kayıt Ol
          </a>
        </li>
      {/if}
    </ul>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav text-lg-left text-center mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
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

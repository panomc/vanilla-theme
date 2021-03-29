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
    </ul>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav text-lg-left text-center mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="/">ANA SAYFA</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">TALEPLER</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<!-- Navbar -->
<script>
  import { show as showLoginModal } from "./modals/LoginModal.svelte";
  import { show as showRegisterModal } from "./modals/RegisterModal.svelte";
</script>

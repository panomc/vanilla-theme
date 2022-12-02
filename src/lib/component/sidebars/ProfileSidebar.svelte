<Sidebar>
  <div class="card">
    <div class="card-header bg-white">
      <img
        src="https://crafthead.net/avatar/{user.username}"
        class="rounded d-block m-auto"
        width="64"
        height="64"
        alt="{user.username}" />
      <div class="text-center">
        <h2 class="my-2">{user.username}</h2>
        <div
          class="text-muted"
          use:tooltip="{['Gizli', { placement: 'top', hideOnClick: false }]}">
          {user.email}
        </div>
        <div class="d-none text-muted">Kayıt: 01.01.2019</div>
        <div class="my-2">
          <div class="badge bg-light text-black rounded-pill">Oyuncu</div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <ul class="nav nav-pills nav-fill flex-column">
        <li class="nav-item active">
          <a
            class="nav-link"
            href="/profile"
            class:active="{matching($page.url.pathname, '/profile')}">
            İstatistikler
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/profile/settings"
            class:active="{matching(
              $page.url.pathname,
              '/profile/settings',
              true
            )}">
            Ayarlar
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-danger"
            on:click="{logout}"
            href="javascript:void(0);">
            Çıkış Yap
          </a>
        </li>
      </ul>
    </div>
  </div>
</Sidebar>

<script>
  import { page } from "$app/stores";
  import tooltip from "$lib/tooltip.util";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import { logout, session } from "$lib/Store";

  $: user = $session.user ? $session.user : {};

  function matching(path, pathName, startsWith = false) {
    return (
      path.toUpperCase() === pathName.toUpperCase() ||
      path.toUpperCase() === (pathName + "/").toUpperCase() ||
      (startsWith && path.startsWith(pathName))
    );
  }
</script>

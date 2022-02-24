<Sidebar>
  <div class="card bg-transparent">
    <div class="card-header">
      <img
        src="https://minotar.net/avatar/{$session.user.username}"
        class="rounded-circle border d-block m-auto"
        width="64"
        height="64"
        alt="{$session.user.username}" />
      <div class="text-center">
        <h2 class="mb-1">{$session.user.username}</h2>
        <div class="text-muted">{$session.user.email}</div>
        <div class="d-none text-muted">Kayıt: 01.01.2019</div>
        <div class="my-2">
          <div class="badge text-dark border">Oyuncu</div>
        </div>
      </div>
    </div>
    <ul class="nav nav-pills nav-fill flex-column">
      <li class="nav-item active">
        <a
          class="nav-link"
          href="/profile"
          class:active="{matching($page.url.pathname, '/profile')}">
          Profil
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
        <a class="nav-link text-danger" on:click="{() => logout($session.CSRFToken)}" href="javascript:void(0);">
          Çıkış Yap
        </a>
      </li>
    </ul>
  </div>
</Sidebar>

<script>
  import { page, session } from "$app/stores";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import { logout } from "$lib/Store";

  function matching(path, pathName, startsWith = false) {
    return (
      path.toUpperCase() === pathName.toUpperCase() ||
      path.toUpperCase() === (pathName + "/").toUpperCase() ||
      (startsWith && path.startsWith(pathName))
    );
  }
</script>

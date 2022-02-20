<!-- Profile Page -->

<!-- Profile Card -->
<div class="card mb-5">
  <div class="card-header">
    <img
      src="https://minotar.net/avatar/{user.username}"
      class="rounded-circle border d-block m-auto"
      width="64"
      height="64"
      alt="{user.username}" />
    <div class="text-center">
      <h2 class="mb-1">{user.username}</h2>
      <div class="text-muted">{user.email}</div>
      <div class="d-none text-muted">Kayıt: 01.01.2019</div>
      <div class="my-2">
        <div class="badge text-dark border">Oyuncu</div>
      </div>
    </div>
  </div>
  <div class="card-body">
    <ul class="nav flex-lg-row flex-column">
      <li class="nav-item">
        <a
          class="nav-link active"
          href="/profile"
          class:active="{matching($page.url.pathname, '/profile')}">
          Profil
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/profile/settings"
          class:active="{matching($page.url.pathname, '/profile/settings', true)}">
          Ayarlar
        </a>
      </li>
    </ul>
  </div>

  <slot />
</div>

<script context="module">
  export function load({ session }) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return { props: { user } };
  }
</script>

<script>
  import { page, session } from "$app/stores";

  import { logout } from "$lib/Store";

  export let user;

  function matching(path, pathName, startsWith = false) {
    return (
      path.toUpperCase() === pathName.toUpperCase() ||
      path.toUpperCase() === (pathName + "/").toUpperCase() ||
      (startsWith && path.startsWith(pathName))
    );
  }
</script>

<!-- Profile Page -->

<div class="card shadow">
  <div class="card-body">
    <!-- Profile Card -->
    <div class="card-body rounded border mb-3">
      <div class="row">
        <div class="col-lg-6 d-flex flex-row">
          <img
            src="https://minotar.net/avatar/{user.username}"
            class="mr-3 rounded float-left"
            width="64"
            height="64"
            alt="{user.username}" />
          <div>
            <h5>{user.username}</h5>
            <div class="text-muted">{user.email}</div>
            <div class="d-none text-muted">Kayıt: 01.01.2019</div>
          </div>
        </div>
        <div class="col-lg-6">
          <button
            on:click="{() => logout($session.CSRFToken)}"
            type="button"
            class="btn btn-danger float-right mt-lg-0 mt-3">
            Çıkış Yap
          </button>
        </div>
        <div class="col-lg-12">
          <hr />
          <ul class="nav nav-pills flex-lg-row flex-column">
            <li class="nav-item">
              <a
                class="nav-link active"
                href="/profile"
                class:active="{matching($page.path, '/profile')}">
                Profil
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/profile/settings"
                class:active="{matching(
                  $page.path,
                  '/profile/settings',
                  true
                )}">
                Ayarlar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <slot />
  </div>
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

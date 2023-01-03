<Sidebar>
  <div class="card mb-3">
    <div class="card-header bg-white">
      <img
        src="https://crafthead.net/avatar/{user.username}"
        class="rounded d-block m-auto"
        width="64"
        height="64"
        alt="{user.username}"
        class:border={isOnline(checkTime)}
        class:border-5={isOnline(checkTime)}
        class:border-secondary={isOnline(checkTime)}
        use:tooltip="{[
          isOnline(checkTime)
            ? ($data.inGame ? 'Oyunda' : 'Sitede') + ' Çevrimiçi'
            : formatRelative(
                new Date(parseInt($data.lastActivityTime)),
                new Date()
              ).capitalize(),
          { placement: 'bottom' },
        ]}" />
      <div class="text-center">
        <h2 class="my-2">{user.username}</h2>
        <div
          class="text-muted"
          use:tooltip="{['Gizli', { placement: 'top', hideOnClick: false }]}">
          {user.email}
        </div>
        <div class="d-none text-muted">Kayıt: 01.01.2019</div>
        <div class="my-2">
          <div class="badge bg-light text-black rounded-pill">
            {#if $data.permissionGroupName}
              {$data.permissionGroupName.capitalize()}
            {:else}
              Oyuncu
            {/if}
          </div>
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

<script context="module">
  import ApiUtil from "$lib/api.util.js";
  import { writable } from "svelte/store";

  const data = writable({
    lastActivityTime: 0,
    inGame: false,
    permissionGroupName: ""
  });

  export const load = async (event) => {
    data.set(
      await ApiUtil.get({
        path: "/api/sidebar/profile",
        request: event,
      })
    );
  };

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
</script>

<script>
  import { formatRelative } from "date-fns";

  import { page } from "$app/stores";
  import tooltip from "$lib/tooltip.util";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import { logout, session } from "$lib/Store";
  import { onDestroy, onMount } from "svelte";

  $: user = $session.user ? $session.user : {};

  let checkTime = 0;
  let interval;

  function matching(path, pathName, startsWith = false) {
    return (
      path.toUpperCase() === pathName.toUpperCase() ||
      path.toUpperCase() === (pathName + "/").toUpperCase() ||
      (startsWith && path.startsWith(pathName))
    );
  }

  function isOnline(checkTime) {
    const fiveMinutesAgoInMillis = Date.now() - 5 * 60 * 1000;

    return $data.lastActivityTime > fiveMinutesAgoInMillis || $data.inGame;
  }

  onMount(() => {
    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  })

  onDestroy(() => {
    clearInterval(interval);
  })
</script>

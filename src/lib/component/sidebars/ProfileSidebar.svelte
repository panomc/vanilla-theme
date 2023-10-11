<Sidebar>
  <div class="card bg-white mb-3">
    <div class="card-header bg-white">
      <PlayerHead
        username="{user.username}"
        inGame="{$data.inGame}"
        lastActivityTime="{$data.lastActivityTime}"
        checkTime="{checkTime}" />
      <div class="text-center">
        <h2 class="my-2">{user.username}</h2>
        <div
          class="text-muted"
          use:tooltip="{['Gizli', { placement: 'top', hideOnClick: false }]}">
          {user.email}
        </div>
        <div class="d-none text-muted">Kayıt: 01.01.2019</div>
        <div class="my-2">
          <PlayerPermissionBadge
            permissionGroupName="{$data.permissionGroupName}" />
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
    permissionGroupName: "",
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
  import { getContext, onDestroy, onMount } from "svelte";

  import { page } from "$app/stores";
  import tooltip from "$lib/tooltip.util";

  import { logout } from "$lib/Store";

  import PlayerPermissionBadge from "$lib/component/PlayerPermissionBadge.svelte";
  import Sidebar from "$lib/component/Sidebar.svelte";
  import PlayerHead from "$lib/component/PlayerHead.svelte";

  const session = getContext("session");

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

  onMount(() => {
    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<Sidebar side="left">
  <div class="card mb-3">
    <div class="card-header bg-white">
      <img
        src="https://crafthead.net/avatar/Butlu"
        class="rounded d-block m-auto border border-5 border-secondary"
        use:tooltip="{['Çevrimiçi', { placement: 'bottom' }]}"
        width="64"
        height="64"
        alt="Butlu" />
      <img
        src="https://crafthead.net/avatar/Butlu"
        class="rounded d-block m-auto"
        width="64"
        height="64"
        alt="Butlu" />
      <div class="text-center">
        <h2 class="my-2">Butlu</h2>
        <div class="d-none text-muted">Kayıt: 01.01.2019</div>
        <div class="my-2">
          <div class="badge bg-light text-black rounded-pill">Oyuncu</div>
        </div>
      </div>
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
        path: "/api/sidebar/playerProfile",
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
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

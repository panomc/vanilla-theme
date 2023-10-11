<Sidebar side="{side}">
  <div class="card bg-white mb-3">
    <div class="card-header bg-white">
      <PlayerHead
        username="{$data.username}"
        inGame="{$data.inGame}"
        lastActivityTime="{$data.lastActivityTime}"
        checkTime="{checkTime}" />
      <div class="text-center">
        <h2 class="my-2">{$data.username}</h2>
        <div class="my-2">
          <PlayerPermissionBadge
            permissionGroupName="{$data.permissionGroupName}" />
        </div>
      </div>
    </div>
  </div>
</Sidebar>

<script context="module">
  import ApiUtil from "$lib/api.util.js";
  import { writable } from "svelte/store";

  const data = writable({
    username: "",
    lastActivityTime: 0,
    inGame: false,
    permissionGroupName: "",
  });

  export const load = async (event) => {
    data.set({
      ...(await ApiUtil.get({
        path: `/api/sidebar/profile/${event.params.player}`,
        request: event,
      })),
      username: event.params.player,
    });
  };

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
</script>

<script>
  import { onDestroy, onMount } from "svelte";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import PlayerPermissionBadge from "$lib/component/PlayerPermissionBadge.svelte";
  import PlayerHead from "$lib/component/PlayerHead.svelte";

  let checkTime = 0;
  let interval;

  export let side;

  onMount(() => {
    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

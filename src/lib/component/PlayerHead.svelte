{#if lastActivityTime}
  <img
    src="https://crafthead.net/avatar/{username}"
    class="rounded d-block m-auto"
    width="{width}"
    height="{height}"
    alt="{username}"
    class:border="{isOnline}"
    class:border-5="{isOnline}"
    class:border-secondary="{isOnline}"
    use:tooltip="{[
      isOnline
        ? (inGame ? 'Oyunda' : 'Sitede') + ' Çevrimiçi'
        : getOfflineRelativeDateText(checkTime),
      { placement: 'bottom' },
    ]}" />
{:else}
  <img
    src="https://crafthead.net/avatar/{username}"
    class="rounded d-block m-auto"
    width="{width}"
    height="{height}"
    alt="{username}" />
{/if}

<script>
  import tooltip from "$lib/tooltip.util";
  import { formatRelative } from "date-fns";

  export let username;
  export let width = 64;
  export let height = 64;
  export let checkTime;
  export let inGame = false;
  export let lastActivityTime;

  $: isOnline = lastActivityTime > Date.now() - 5 * 60 * 1000 || inGame;

  function getOfflineRelativeDateText(checkTime) {
    return formatRelative(
      new Date(parseInt(lastActivityTime)),
      new Date()
    ).capitalize();
  }

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
</script>

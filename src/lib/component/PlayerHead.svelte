{#if lastActivityTime}
  <img
    src="https://crafthead.net/avatar/{username}"
    class="rounded d-block m-auto"
    width="{width}"
    height="{height}"
    alt="{username}"
    class:border="{isOnline(checkTime)}"
    class:border-5="{isOnline(checkTime)}"
    class:border-secondary="{isOnline(checkTime)}"
    use:tooltip="{[
      isOnline(checkTime)
        ? (inGame ? 'Oyunda' : 'Sitede') + ' Çevrimiçi'
        : formatRelative(
            new Date(parseInt(lastActivityTime)),
            new Date()
          ).capitalize(),
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

  function isOnline(checkTime) {
    const fiveMinutesAgoInMillis = Date.now() - 5 * 60 * 1000;

    return lastActivityTime > fiveMinutesAgoInMillis || inGame;
  }
</script>

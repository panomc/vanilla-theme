{#if status === TicketStatuses.NEW}
  <span class="badge bg-mint rounded-pill">Yeni</span>
{:else if status === TicketStatuses.REPLIED}
  <span class="badge bg-sunflower rounded-pill">Yanıtlandı</span>
{:else if status === TicketStatuses.CLOSED}
  <span class="badge bg-bittersweet rounded-pill">Kapalı</span>
{/if}

<script context="module">
  export const TicketStatuses = Object.freeze({
    NEW: 1,
    REPLIED: 2,
    CLOSED: 3,
  });
</script>

<script>
  export let status = TicketStatuses.NEW;
</script>

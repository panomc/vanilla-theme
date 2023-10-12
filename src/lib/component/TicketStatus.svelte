{#if status === TicketStatuses.NEW}
  <span class="badge bg-mint rounded-pill">{$_("ticket-statuses.new")}</span>
{:else if status === TicketStatuses.REPLIED}
  <span class="badge bg-warning rounded-pill">{$_("ticket-statuses.replied")}</span>
{:else if status === TicketStatuses.CLOSED}
  <span class="badge bg-danger rounded-pill">{$_("ticket-statuses.closed")}</span>
{/if}

<script context="module">
  export const TicketStatuses = Object.freeze({
    NEW: 1,
    REPLIED: 2,
    CLOSED: 3,
  });
</script>

<script>
  import { _ } from "svelte-i18n";

  export let status = TicketStatuses.NEW;
</script>

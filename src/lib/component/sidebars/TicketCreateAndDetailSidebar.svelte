<Sidebar>
  {#if $ticketData}
    {#if $ticketData.status !== TicketStatuses.CLOSED}
      <button
        class="btn btn-lg btn-danger w-100 mb-3"
        type="button"
        on:click="{() => showCloseTicketConfirmModal($ticketData)}">
        <i class="fas fa-times me-2"></i>
        {$_("components.ticket-create-and-detail.close-ticket-button")}
      </button>
    {/if}
  {/if}
  <OnlineAdmins onlineAdmins="{$data.onlineAdmins}" />
</Sidebar>

<script context="module">
  import { writable } from "svelte/store";

  import ApiUtil from "$lib/api.util.js";

  const data = writable({
    onlineAdmins: [],
  });
  const ticketData = writable(null);

  export const load = async (event, ticket) => {
    data.set(
      await ApiUtil.get({
        path: "/api/sidebar/support",
        request: event,
      })
    );

    if (ticket) {
      ticketData.set(ticket);
    }
  };

  export const update = (ticket) => {
    ticketData.set(ticket);
  };
</script>

<script>
  import { _ } from "svelte-i18n";

  import Sidebar from "$lib/component/Sidebar.svelte";

  import OnlineAdmins from "$lib/component/OnlineAdmins.svelte";

  import { show as showCloseTicketConfirmModal } from "$lib/component/modals/CloseTicketConfirmModal.svelte";
  import { TicketStatuses } from "$lib/component/TicketStatus.svelte";
</script>

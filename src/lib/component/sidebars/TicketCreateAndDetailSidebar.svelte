<Sidebar>
  <OnlineAdmins onlineAdmins="{$data.onlineAdmins}" />


  {#if $ticketData.status !== TicketStatuses.CLOSED}
    <button
      class="btn btn-danger"
      type="button"
      on:click="{() => showCloseTicketConfirmModal($ticketData)}">
      <i class="fas fa-times me-2"></i> Talebi Kapat
    </button>
  {/if}
</Sidebar>

<script context="module">
  import ApiUtil from "$lib/api.util.js";
  import { writable } from "svelte/store";

  const data = writable({
    onlineAdmins: [],
  });
  const ticketData = writable({})

  export const load = async (event, ticket) => {
    data.set(
      await ApiUtil.get({
        path: "/api/sidebar/support",
        request: event,
      })
    );

    ticketData.set(ticket)
  };

  export const update = (ticket) => {
    ticketData.set(ticket)
  }
</script>

<script>
  import Sidebar from "$lib/component/Sidebar.svelte";

  import OnlineAdmins from "$lib/component/OnlineAdmins.svelte";

  import {
    show as showCloseTicketConfirmModal,
  } from "$lib/component/modals/CloseTicketConfirmModal.svelte";
  import {
    TicketStatuses,
  } from "$lib/component/TicketStatus.svelte";
</script>

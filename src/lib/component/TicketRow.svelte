<tr class:table-primary="{ticket.selected}">
  <th scope="row">
    {#if ticket.status !== TicketStatuses.CLOSED}
      <a
        use:tooltip="{[
          'Talebi Kapat',
          { placement: 'bottom', hideOnClick: false },
        ]}"
        class="btn btn-sm btn-link link-bittersweet"
        role="button"
        href="javascript:void(0);"
        on:click="{() => onCloseTicket()}">
        <i class="fas fa-check"></i>
      </a>
    {/if}
  </th>
  <td class="align-middle text-nowrap">
    <a href="/ticket/{ticket.id}" title="Talebi Görüntüle"
      >#{ticket.id} {ticket.title}</a>
  </td>
  <td class="align-middle text-nowrap">
    <TicketStatus status="{ticket.status}" />
  </td>
  <td class="align-middle text-nowrap">
    <a
      use:tooltip="{['Filtrele', { placement: 'bottom' }]}"
      class="badge rounded-pill bg-light text-black"
      href="/tickets/category/{ticket.category.url}">
      {ticket.category.title === "-" ? "Kategorisiz" : ticket.category.title}
    </a>
  </td>
  <td class="align-middle text-nowrap"
    ><span><Date time="{ticket.lastUpdate}" /></span></td>
</tr>

<script>
  import { createEventDispatcher } from "svelte";

  import tooltip from "$lib/tooltip.util";
  import TicketStatus, {
    TicketStatuses,
  } from "$lib/component/TicketStatus.svelte";
  import Date from "$lib/component/Date.svelte";

  export let ticket;

  const dispatch = createEventDispatcher();

  function onCloseTicket() {
    dispatch("closeTicket", { ticket });
  }
</script>

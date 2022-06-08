<tr>
  <th scope="row">
    <a
      use:tooltip="{[
        'Talebi Kapat',
        { placement: 'bottom', hideOnClick: false },
      ]}"
      class="btn btn-sm btn-link text-bittersweet"
      role="button"
      href="javascript:void(0);">
      <i class="fas fa-check mr-1"></i>
    </a>
  </th>
  <td class="align-middle text-nowrap">
    <a href="/ticket/{ticket.id}" title="Talebi Görüntüle"
      >#{ticket.id} {ticket.title}</a>
  </td>
  <td class="align-middle text-nowrap">
    <TicketStatus status="{ticket.status}" />
  </td>
  <td class="align-middle text-nowrap">
    <a href="/tickets/category/{ticket.category.url}">
      {ticket.category.title}
    </a>
  </td>
  <td class="align-middle text-nowrap"
    ><span><Date time="{ticket.lastUpdate}" /></span></td>
</tr>

<script>
  import tooltip from "$lib/tooltip.util";
  import TicketStatus from "$lib/component/TicketStatus.svelte";
  import Date from "$lib/component/Date.svelte";

  export let ticket;
</script>

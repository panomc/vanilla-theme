<!-- Tickets Card -->

{#if tickets.length > 0}
  <div class="table-responsive">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th class="align-middle" scope="col"> </th>
          <th class="align-middle" scope="col">Başlık</th>
          <th class="align-middle" scope="col">Durum</th>
          <th class="align-middle" scope="col">Kategori</th>
          <th class="align-middle" scope="col">Son Yanıt</th></tr>
      </thead>
      <tbody>
        {#each tickets as ticket, index (ticket)}
          <TicketRow ticket="{ticket}" />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class="container text-center animate__animated animate__zoomIn">
    <i class="fas fa-ticket-alt fa-3x m-3 text-dark text-opacity-25"></i>
    <p class="text-gray">Burada içerik yok.</p>
  </div>
{/if}

<!-- Tickets Card End -->
<script>
  import TicketRow from "$lib/component/TicketRow.svelte";
  import { setCallback as setCloseTicketConfirmCallback } from "$lib/component/modals/CloseTicketConfirmModal.svelte";
  import { TicketStatuses } from "$lib/component/TicketStatus.svelte";

  export let tickets;

  setCloseTicketConfirmCallback((updatedTicket) => {
    tickets.forEach((ticket) => {
      if (ticket.id === updatedTicket.id) {
        ticket.status = TicketStatuses.CLOSED;
      }
    })

    tickets = tickets
  });
</script>

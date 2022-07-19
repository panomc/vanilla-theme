<!-- Tickets Card -->

{#if tickets.length > 0}
  <div class="table-responsive">
    <table class="table table-borderless table-hover">
      <thead>
        <tr>
          <th class="align-middle" scope="col"> </th>
          <th class="align-middle" scope="col">Başlık</th>
          <th class="align-middle" scope="col">Durum</th>
          <th class="align-middle" scope="col">Kategori</th>
          <th class="align-middle" scope="col">Son Yanıt</th></tr
        >
      </thead>
      <tbody>
        {#each tickets as ticket, index (ticket)}
          <TicketRow
            ticket="{ticket}"
            on:closeTicket="{(event) =>
              onCloseTicketClick(event.detail.ticket)}"
          />
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
  import { createEventDispatcher } from "svelte";

  export let tickets;

  const dispatch = createEventDispatcher();

  const onCloseTicketClick = (ticket) => {
    dispatch("closeTicket", { ticket });
  };
</script>

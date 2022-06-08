<div class="card">
  <div class="card-body">
    <div class="row justify-content-between pb-3 align-items-center">
      <div class="col-auto">
        <h4 class="card-title mb-md-0"><strong>"{data.category.title}"</strong> Kategorisindeki Talepler</h4>
      </div>
    </div>
    <Tickets tickets="{data.tickets}"/>
  </div>
</div>

<br/>

<!-- Pagination -->
{#if data.ticketCount > 0}
  <Pagination
    page="{data.page}"
    totalPage="{data.totalPage}"
    loading="{false}"
    on:firstPageClick="{() => reloadData(1)}"
    on:lastPageClick="{() => reloadData(data.totalPage)}"
    on:pageLinkClick="{(event) => reloadData(event.detail.page)}" />
{/if}

<script context="module">
  import TicketsSidebar from "$lib/component/sidebars/TicketsSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import { getCategoryTickets } from "$lib/services/tickets.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    let output = {
      props: {
        data: {
          tickets: [],
          ticketCount: 0,
          page: 1,
          totalPage: 1,
          url: request.params.url,
          category: {
            id: -1,
            title: "-",
            description: "",
            url: "-",
          },
        },
      },
    };

    setSidebar(TicketsSidebar);

    await getCategoryTickets({
      page: request.params.page || 1,
      url: request.params.url,
      request,
    }).then((body) => {
      if (body.error) {
        output = null;

        return;
      }

      console.log(body)

      output.props.data = body;
    });

    return output;
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  import Pagination from "$lib/component/Pagination.svelte";
  import Tickets from "$lib/component/Tickets.svelte";

  export let data;

  function reloadData(page = data.page, url = data.url) {
    getCategoryTickets({ page, url, CSRFToken: $session.CSRFToken }).then(
      (body) => {
        if (body.result === "ok") {
          if (page !== data.page) {
            goto(page === 1 ? "/tickets/category/" + url : "/tickets/category/" + url + "/" + page);
          } else {
            data = body;
          }
        } else if (body.error === "PAGE_NOT_FOUND") {
          reloadData(page - 1);
        }
      }
    );
  }
</script>

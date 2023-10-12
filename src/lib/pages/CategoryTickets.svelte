<div class="card bg-white">
  <div class="card-body">
    <div class="row justify-content-between pb-3 align-items-center">
      <div class="col-auto">
        <h4 class="card-title mb-md-0">
          {@html $_("pages.category-tickets.title", {values: {categoryName: `<strong
            >"${data.category.title === "-"
              ? $_("pages.category-tickets.no-category")
              : data.category.title}"</strong>`}})}
        </h4>
      </div>
    </div>
    <Tickets tickets="{data.tickets}" />
  </div>
</div>

<br />

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
  import ProfileSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/ProfileSidebar.svelte";
  import { getCategoryTickets } from "$lib/services/tickets.js";
  import { error } from "@sveltejs/kit";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    let data = {
      tickets: [],
      ticketCount: 0,
      page: 1,
      totalPage: 1,
      url: event.params.url,
      category: {
        id: -1,
        title: "-",
        description: "",
        url: "-",
      },
    };

    await loadSidebar(event);

    await getCategoryTickets({
      page: event.params.page || 1,
      url: event.params.url,
      request: event,
    }).then((body) => {
      if (body.error) {
        if (body.error === "NOT_EXISTS" || body.error === "PAGE_NOT_FOUND") {
          throw error(404, body.error);
        }

        throw error(500, body.error);
      }

      data = body;
    });

    return { ...data, sidebar: ProfileSidebar };
  }
</script>

<script>
  import { _ } from "svelte-i18n";

  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import Pagination from "$lib/component/Pagination.svelte";
  import Tickets from "$lib/component/Tickets.svelte";

  export let data;

  function reloadData(page = data.page, url = data.url) {
    getCategoryTickets({ page, url }).then((body) => {
      if (body.result === "ok") {
        if (page !== data.page) {
          goto(
            page === 1
              ? "/tickets/category/" + url
              : "/tickets/category/" + url + "/" + page
          );
        } else {
          data = body;
        }
      } else if (body.error === "PAGE_NOT_FOUND") {
        reloadData(page - 1);
      } else if (body.error === "NOT_EXISTS") {
        goto(base + "/error-404");
      }
    });
  }
</script>

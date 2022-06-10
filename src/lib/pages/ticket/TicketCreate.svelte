<div class="card">
  <div class="card-body">
    <div class="row justify-content-between mb-3">
      <div class="col-auto">
        <h4 class="card-title">Destek Talebi Oluştur</h4>
      </div>
      <div class="col-auto">
        <a href="/tickets">
          <i class="fas fa-arrow-left mr-2"></i>
          Talepler
        </a>
      </div>
    </div>

    <ErrorAlert error="{error}" />

    <div class="mb-3">
      <div class="row align-items-end">
        <div class="col-8">
          <input
            type="email"
            class="form-control"
            placeholder="Talep başlığını girin"
            bind:value="{title}" />
        </div>
        <div class="col-4">
          <select
            class="form-select"
            id="datalistOptions"
            bind:value="{categoryId}">
            <option value="{-1}">Kategorisiz</option>
            {#each data.categories as category, index (category)}
              <option value="{category.id}">{category.title}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Ticket Editor -->
    <div class="mb-3">
      <textarea class="form-control" rows="6" bind:value="{message}"></textarea>
    </div>

    <button class="btn btn-primary w-100" on:click="{() => submit()}"
      >Talep Oluştur</button>
  </div>
</div>

<script context="module">
  import TicketCreateSidebar from "$lib/component/sidebars/TicketCreateSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import { getTicketCategories } from "$lib/services/tickets";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    let output = {
      props: {
        data: {
          categories: [],
          categoryPage: 0,
        },
      },
    };

    setSidebar(TicketCreateSidebar);

    await getTicketCategories({
      page: output.props.data.categoryPage,
      request,
    }).then((body) => {
      if (body.error) {
        output = null;

        return;
      }

      output.props.data = body;
    });

    return output;
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  import { createTicket } from "$lib/services/tickets";
  import ErrorAlert from "$lib/component/ErrorAlert.svelte";
  import { NETWORK_ERROR } from "$lib/api.util";

  export let data;

  let error;
  let title = "";
  let message = "";
  let categoryId = -1;

  async function submit() {
    error = null;

    await createTicket({
      title,
      message,
      categoryId,
      CSRFToken: $session.CSRFToken,
    })
      .then((body) => {
        if (body.error) {
          error = body.error;

          return;
        }

        goto("/ticket/" + body.id);
      })
      .catch(() => {
        error = NETWORK_ERROR;
      });
  }
</script>

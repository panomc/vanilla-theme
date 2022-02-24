<div class="card">
  <div class="card-body">
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-md-auto col-12 text-md-left text-center">
        <h4 class="card-title mb-md-0">Taleplerin</h4>
      </div>
      <div class="col-md-auto col-12 text-md-right text-center">
        <div class="btn-group">
          <a class="btn btn-sm btn-white active" role="button" href="#">
            Tümü
          </a>
          <a
            class="btn btn-sm btn-white text-bittersweet"
            role="button"
            href="#">
            Kapalı
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<br />
<br />

<a href="/ticket/detail/10">Ticket Detail</a>

<script context="module">
  import TicketsSidebar from "$lib/component/sidebars/TicketsSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    setSidebar(TicketsSidebar);

    return {}
  }
</script>

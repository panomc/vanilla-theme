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

    <div class="mb-3">
      <div class="row align-items-end">
        <div class="col-8">
          <input
            type="email"
            class="form-control form-control-lg border-0"
            placeholder="Talep başlığını girin" />
        </div>
        <div class="col-4">
          <select class="form-select" id="datalistOptions">
            <option value="1" selected>Kategori</option>
            <option value="San Francisco">dsadkasd</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Ticket Editor -->
    <div class="mb-3">Editor</div>
  </div>
</div>

<script context="module">
  import TicketCreateSidebar from "$lib/component/sidebars/TicketCreateSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load() {
    setSidebar(TicketCreateSidebar);

    return {};
  }
</script>

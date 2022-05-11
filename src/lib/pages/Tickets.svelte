<div class="card">
  <div class="card-body">
    <div class="row justify-content-between pb-3 align-items-center">
      <div class="col-auto">
        <h4 class="card-title mb-md-0">Destek Talepleri</h4>
      </div>
      <div class="col-md-auto col-12 text-md-right text-center">
        <div class="btn-group">
          <a
            class="btn btn-sm btn-outline-light btn-link"
            role="button"
            href="javascript:void(0);">
            Tümü
          </a>
          <a
            class="btn btn-sm btn-outline-light btn-link text-bittersweet"
            role="button"
            href="javascript:void(0);">
            Kapalı
          </a>
        </div>
      </div>
    </div>
    <div class="container text-center animate__animated animate__zoomIn">
      <i class="fas fa-ticket-alt fa-3x m-3 text-dark text-opacity-25"></i>
      <p class="text-gray">Burada içerik yok.</p>
    </div>

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
              <a href="/tickets/ticket/1" title="Talebi Görüntüle">#1 test</a>
            </td>
            <td class="align-middle text-nowrap">
              <a href="/tickets">
                <span class="badge bg-sunflower rounded-pill">Yanıtlandı</span>
              </a>
            </td>
            <td class="align-middle text-nowrap">
              <a href="/tickets/category/-">-</a></td>
            <td class="align-middle text-nowrap"><span>02/10/2022</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<br />
<br />

<a href="/ticket/detail/10">Ticket Detail</a>

<script context="module">
  import TicketsSidebar from "$lib/component/sidebars/TicketsSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import tooltip from "$lib/tooltip.util";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    setSidebar(TicketsSidebar);

    return {};
  }
</script>

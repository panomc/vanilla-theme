<div class="card bg-white">
  <div class="card-body">
    <h3 class="card-title">Destek</h3>
    <p class="my-3">Nasıl yardım almak istersin?</p>
    <ul class="list-group">
      <a href="/ticket/create" class="list-group-item list-group-item-action">
        <div class="row">
          <div class="col-auto d-flex align-items-center">
            <i class="fas fa-ticket fa-2x"></i>
          </div>
          <div class="col-auto">
            <h5>Talep Oluştur</h5>
            <p class="mb-0">
              Destek talebi oluştur ve cevaplandığında bildirim al.
            </p>
          </div>
        </div>
      </a>
      <a href="#" class="list-group-item list-group-item-action disabled">
        <div class="row">
          <div class="col-auto d-flex align-items-center">
            <i class="fas fa-envelope fa-2x"></i>
          </div>
          <div class="col-auto">
            <h5>E-Posta Gönder</h5>
            <p class="mb-0">
              {$session.siteInfo.websiteName} yöneticilerine e-postayla iletişime
              geç.
            </p>
          </div>
        </div>
      </a>
    </ul>
  </div>
</div>

<script context="module">
  import SupportSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/SupportSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    await loadSidebar(event);

    return { sidebar: SupportSidebar };
  }
</script>

<script>
  import { getContext } from "svelte";

  export let data;

  const session = getContext("session");
</script>

<div class="card bg-white">
  <div class="card-body">
    <h3 class="card-title">Destek</h3>
    <p class="my-3">Nasıl destek almak istersin?</p>
    <ul class="list-group list-group-horizontal text-center">
      <a href="/ticket/create" class="list-group-item list-group-item-action">
        <i class="fas fa-ticket fa-2x my-3"></i>
        <h5>Destek Talebi Oluştur</h5>
        <p class="mb-0">
          Oyuncu olarak yetkililere mesaj gönder ve yanıtlandığında bildirim al.
        </p>
      </a>

      <a href="#" class="list-group-item list-group-item-action">
        <i class="fas fa-envelope fa-2x my-3"></i>
        <div class="col-auto">
          <h5>E-Posta Gönder</h5>
          <p class="mb-0">Çeşitli konular için {$session.siteInfo.websiteName} yöneticisine e-posta gönder.</p>
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

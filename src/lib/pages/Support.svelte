<div class="card bg-white">
  <div class="card-body">
    <h3 class="card-title">Oyuncu Destek</h3>
    <p class="text-muted my-3">Nasıl yardım almak istersin?</p>
    <ul class="list-group list-group-horizontal text-center">
      <a href="/ticket/create" class="list-group-item list-group-item-action">
        <h5 class="link-primary">Talep</h5>
        <p class="mb-0">
          Destek talebi oluştur ve cevaplandığında bildirim al.
        </p>
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        <h5 class="link-primary">E-Posta</h5>
        <p class="mb-0">
          {$session.siteInfo.websiteName} yöneticilerine e-postayla iletişime geç.
        </p>
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

<div class="card">
  <div class="card-body">
    <h3 class="card-title">Oyuncu Destek</h3>
    <h5 class="my-3">Nasıl yardım almak istersin?</h5>
    <ul class="list-group list-group-horizontal text-center">
      <a href="/ticket/create" class="list-group-item list-group-item-action">
        <h5 class="link-primary">Talep</h5>
        <p>Destek talebi oluştur ve cevaplandığında bildirim al.</p>
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        <h5 class="link-primary">E-Posta</h5>
        <p>
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

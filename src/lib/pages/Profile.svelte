<!-- Statistics -->
<h4 class="card-title pb-3">İstatistikler</h4>
<table class="table">
  <tbody>
    <tr>
      <td>Oynanış Süresi</td>
      <td>1 Saat</td>
    </tr>
  </tbody>
</table>

<script context="module">
  import { setSidebar } from "$lib/Store.js";

  import ProfileSidebar from "$lib/component/sidebars/ProfileSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export function load() {
    setSidebar(ProfileSidebar);

    return {};
  }
</script>
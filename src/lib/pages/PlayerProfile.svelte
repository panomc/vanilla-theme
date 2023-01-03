<!-- Statistics -->
<div class="card">
  <div class="card-body">
    <h4 class="card-title">İstatistikler</h4>
    <table class="table table-borderless mb-0">
      <tbody>
        <tr>
          <td>Kayıt</td>
          <td>data</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script context="module">
  import { setSidebar } from "$lib/Store.js";
  import PlayerProfileSidebar from "$lib/component/sidebars/PlayerProfileSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ parent }) {
    await parent();

    setSidebar(PlayerProfileSidebar);
  }
</script>

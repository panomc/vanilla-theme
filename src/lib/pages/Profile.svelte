<!-- Statistics -->
<div class="card">
  <div class="card-body">
    <h4 class="card-title">İstatistikler</h4>
    <table class="table">
      <tbody>
        <tr>
          <td>Kayıt Tarihi</td>
          <td>01.01.0000</td>
        </tr>
        <tr>
          <td>Web Siteye Son Giriş</td>
          <td>01.01.0000</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script context="module">
  import { setSidebar } from "$lib/Store.js";

  import ProfileSidebar from "$lib/component/sidebars/ProfileSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({parent}) {
    await parent();

    setSidebar(ProfileSidebar);
  }
</script>

<!-- Statistics -->
<div class="card">
  <div class="card-body">
    <h4 class="card-title">İstatistikler</h4>
    <table class="table">
      <tbody>
        <tr>
          <td>Kayıt Tarihi</td>
          <td><Date time="{data.registerDate}" /></td>
        </tr>
        <tr>
          <td>Web Siteye Son Giriş</td>
          <td><Date time="{data.lastLoginDate}" relativeFormat="true" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script context="module">
  import { setSidebar } from "$lib/Store.js";

  import ProfileSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/ProfileSidebar.svelte";

  import { getProfile } from "$lib/services/profile.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    let data = {
      registerDate: 0,
      lastLoginDate: 0,
    };

    await loadSidebar(event);
    setSidebar(ProfileSidebar);

    await getProfile({ request: event }).then((body) => {
      data = body;
    });

    return data;
  }
</script>

<script>
  import Date from "$lib/component/Date.svelte";

  export let data;
</script>

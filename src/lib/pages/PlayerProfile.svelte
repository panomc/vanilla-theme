<!-- Statistics -->
<div class="card">
  <div class="card-body">
    <h4 class="card-title">İstatistikler</h4>
    <table class="table table-borderless mb-0">
      <tbody>
        <tr>
          <td>Kayıt</td>
          <td><Date time="{data.registerDate}" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script context="module">
  import { error } from "@sveltejs/kit";

  import { setSidebar } from "$lib/Store.js";

  import PlayerProfileSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/PlayerProfileSidebar.svelte";

  import { getPlayerProfile } from "$lib/services/profile.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    let data = {
      registerDate: 0
    };

    await loadSidebar(event);
    setSidebar(PlayerProfileSidebar, {side: "left"});

    await getPlayerProfile({ username: event.params.player, request: event }).then(
      (body) => {
        if (body.error) {
          if (body.error === "NOT_EXISTS") {
            throw error(404, body.error)
          }

          throw error(500, body.error)
        }

        data = body;
      }
    );

    return data;

  }
</script>

<script>
  import Date from "$lib/component/Date.svelte";

  export let data;
</script>
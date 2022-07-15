
<PlayerProfile />

<script context="module">
  import { load as loadPlayerProfile } from "$lib/pages/PlayerProfile.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadPlayerProfile(params);

    output = {
      ...output,
      ...data,
    };

    return data ? output : null;
  }
</script>

<script>
  import PlayerProfile from "$lib/pages/PlayerProfile.svelte";
</script>

<Profile />

<script context="module">
  import { load as loadProfile } from "$lib/pages/Profile.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadProfile(params);

    output = {
      ...output,
      ...data,
    };

    return data ? output : null;
  }
</script>

<script>
  import Profile from "$lib/pages/Profile.svelte";
</script>

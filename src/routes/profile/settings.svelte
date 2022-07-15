<Settings />

<script context="module">
  import { load as loadSettings } from "$lib/pages/profile/Settings.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadSettings(params);

    output = {
      ...output,
      ...data,
    };

    return data ? output : null;
  }
</script>

<script>
  import Settings from "$lib/pages/profile/Settings.svelte";
</script>

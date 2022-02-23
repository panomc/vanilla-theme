<ProfileLayout {...props}>
  <Settings />
</ProfileLayout>

<script context="module">
  import { load as loadLayout } from "$lib/layouts/ProfileLayout.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadLayout(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import Settings from "$lib/pages/profile/Settings.svelte";
  import ProfileLayout from "$lib/layouts/ProfileLayout.svelte";

  export let props;
</script>

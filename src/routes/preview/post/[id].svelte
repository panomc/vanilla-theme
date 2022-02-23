<MainLayout>
  <PreviewPost post="{post}" />
</MainLayout>

<script context="module">
  import { load as loadPreviewPost } from "$lib/pages/PreviewPost.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadPreviewPost(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import PreviewPost from "$lib/pages/PreviewPost.svelte";
  import MainLayout from "$lib/layouts/MainLayout.svelte";

  export let post;
</script>

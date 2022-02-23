<MainLayout sidebar="{sidebar()}">
  <PostDetail data="{data}" />
</MainLayout>

<script context="module">
  import {
    load as loadPostDetail,
    sidebar,
  } from "$lib/pages/PostDetail.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadPostDetail(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import PostDetail from "$lib/pages/PostDetail.svelte";
  import MainLayout from "$lib/layouts/MainLayout.svelte";

  export let data;
</script>

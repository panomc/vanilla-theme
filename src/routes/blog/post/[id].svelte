<PostDetail data="{data}" />

<script context="module">
  import { load as loadPostDetail } from "$lib/pages/PostDetail.svelte";

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

  export let data;
</script>

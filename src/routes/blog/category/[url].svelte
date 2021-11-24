<CategoryPosts data="{data}" />

<script context="module">
  import { load as loadCategoryPosts } from "./_categoryPosts.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadCategoryPosts(params)

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import CategoryPosts from "./_categoryPosts.svelte";

  export let data;
</script>

<CategoryPosts data="{data}" />

<script context="module">
  import { load as loadCategoryPosts } from "./_categoryPosts.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    output = {
      ...output,
      ...(await loadCategoryPosts(params)),
    };

    return output;
  }
</script>

<script>
  import CategoryPosts from "./_categoryPosts.svelte";

  export let data;
</script>

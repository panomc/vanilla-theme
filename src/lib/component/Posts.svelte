<!-- Post Card -->
{#each posts as post, index (post)}
  <Post post="{post}" />
{:else}
  <NoContent />
{/each}

<!-- Post Card End -->
<script>
  import Post from "$lib/component/Post.svelte";
  import NoContent from "$lib/component/NoContent.svelte";

  export let posts;
</script>

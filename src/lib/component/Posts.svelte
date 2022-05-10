<!-- Post Card -->
{#each posts as post, index (post)}
  <Post post="{post}" />
{:else}
  <div class="container text-center">
    <i class="fa-solid fa-pen fa-3x text-dark text-opacity-25 m-3"></i>
    <p class="text-gray">Burada içerik yok.</p>
  </div>
{/each}

<!-- Post Card End -->
<script>
  import Post from "$lib/component/Post.svelte";

  export let posts;
</script>

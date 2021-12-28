<!-- Post Card -->
{#each posts as post, index (post)}
  <Post post="{post}" />
{:else}
  <div class="container text-center py-5">
    <i class="fas fa-sticky-note text-gray fa-3x mb-3"></i>
    <p class="text-gray">Henüz bir blog yazısı yayınlanmamış.</p>
  </div>
{/each}

<!-- Post Card End -->
<script>
  import Post from "$lib/component/Post.svelte";

  export let posts;
</script>

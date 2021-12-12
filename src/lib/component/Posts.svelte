<!-- Post Card -->
{#each posts as post, index (post)}
  <div class="card shadow-sm mb-5 border-0 shadow-sm">
    <div class="card-body">
      <div class="row mb-3 justify-content-center">
        <div class="col">
          <a href="/blog/post/{post.id}" class="card-title text-black">
            <h3 class="mb-0 d-inline-block">
              {truncate(post.title, 100)}{@html post.title.length > 100
                ? "&hellip;"
                : ""}
            </h3>
          </a>
        </div>
        <div class="col-auto">
          {#if post.category.title !== "-"}
            <div class="lead">
              <a href="/blog/category/{post.category.url}">
                <span class="badge badge-primary text-white"
                  >{post.category.title}</span
                >
              </a>
            </div>
          {/if}
        </div>
      </div>

      <p class="card-text">
        {@html post.post}
      </p>
    </div>
    <div class="card-footer d-flex align-items-center">
      <div class="text-muted">
        <img
          src="https://minotar.net/avatar/{post.writer.username}"
          alt="{post.writer.username}"
          width="32"
          height="32"
          title="{post.writer.username}"
          class="rounded mr-3"
        />
        <Date time="{post.date}"/>
      </div>

      <a href="/blog/post/{post.id}" class="btn btn-secondary ml-auto">
        Devamını Oku >
      </a>
    </div>
  </div>
{:else}
  <div class="container text-center py-5">
    <i class="fas fa-sticky-note text-gray fa-3x mb-3"></i>
    <p class="text-gray">Henüz bir blog yazısı yayınlanmamış.</p>
  </div>
{/each}

<!-- Post Card End -->
<script>
  import { truncate } from "$lib/string.util";

  import Date from "$lib/component/Date.svelte";

  export let posts;
</script>

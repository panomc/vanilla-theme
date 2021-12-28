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
                >{post.category.title}</span>
            </a>
          </div>
        {/if}
      </div>
    </div>

    <p class="card-text">
      {@html post.text}
    </p>
  </div>
  <div class="card-footer d-flex justify-content-between align-items-center">
    <div class="text-muted">
      <img
        src="https://minotar.net/avatar/{post.writer.username}"
        alt="{post.writer.username}"
        width="32"
        height="32"
        title="{post.writer.username}"
        class="rounded mr-3" />
      <Date time="{post.date}" />
    </div>

    {#if $page.path.startsWith("/blog/post/")}
      <div class="text-muted">
        <ul class="mb-0">
          <li class="list-inline">
            <span
              class="list-inline-item px-1"
              use:tooltip="{['Görüntülenme', { placement: 'bottom' }]}">
              <i class="fas fa-eye mr-2"></i>
              {post.views}
            </span>
          </li>
        </ul>
      </div>
    {:else}
      <a href="/blog/post/{post.id}" class="btn btn-secondary">
        Devamını Oku >
      </a>
    {/if}
  </div>
</div>

<script>
  import { page } from "$app/stores";

  import { truncate } from "$lib/string.util";
  import tooltip from "$lib/tooltip.util";

  import Date from "$lib/component/Date.svelte";

  export let post;
</script>

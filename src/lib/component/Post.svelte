<div class="card mb-3">
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
          <a
            class="badge rounded-pill bg-light text-black"
            href="/blog/category/{post.category.url}"
            use:tooltip="{['Filtrele', { placement: 'bottom' }]}">
            {post.category.title}
          </a>
        {/if}
      </div>
    </div>

    <p class="card-text">
      {@html post.text}
    </p>
  </div>
  <div
    class="card-footer bg-white d-flex align-items-center justify-content-between">
    {#if detail}
      <ul class="m-0 p-0 text-muted">
        <li class="list-inline">
          <div
            class="list-inline-item px-1"
            use:tooltip="{['Görüntülenme', { placement: 'bottom' }]}">
            <i class="fas fa-eye me-2"></i>
            {post.views}
          </div>
        </li>
      </ul>

      <div>
        <Date class="text-muted" time="{post.date}" />
        <a href="/player/{post.writer.username}">
          <img
            src="https://minotar.net/avatar/{post.writer.username}"
            alt="{post.writer.username}"
            width="32"
            height="32"
            use:tooltip="{[post.writer.username, { placement: 'bottom' }]}"
            class="rounded-circle ms-2" />
        </a>
      </div>
    {:else}
      <a class="btn btn-link" href="/blog/post/{post.id}">
        Devamını Oku <i class="fas fa-chevron-right ms-2"></i>
      </a>

      <div>
        <Date class="text-muted" time="{post.date}" />
        <a href="/player/{post.writer.username}">
          <img
            src="https://minotar.net/avatar/{post.writer.username}"
            alt="{post.writer.username}"
            width="32"
            height="32"
            use:tooltip="{[post.writer.username, { placement: 'bottom' }]}"
            class="rounded-circle ms-2" />
        </a>
      </div>
    {/if}
  </div>
</div>

<script>
  import { truncate } from "$lib/string.util";
  import tooltip from "$lib/tooltip.util";

  import Date from "$lib/component/Date.svelte";

  export let post;
  export let detail = false;
</script>

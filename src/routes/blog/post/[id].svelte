<div class="card shadow-sm mb-4">
  <div class="card-body">
    <div class="row mb-3 justify-content-center">
      <div class="col">
        <h3 class="mb-0 d-inline-block">{data.post.title}</h3>
      </div>
      {#if data.post.category !== "-"}
        <div class="col-auto">
          <div class="lead">
            <a href="/blog/category/{data.post.category.url}">
              <span class="badge badge-primary text-white"
                >{data.post.category.title}</span>
            </a>
          </div>
        </div>
      {/if}
    </div>

    {@html data.post.text}
  </div>
  <div class="card-footer d-flex justify-content-between align-items-center">
    <div class="text-muted">
      <img
        src="https://minotar.net/avatar/{data.post.writer.username}"
        alt="{data.post.writer.username}"
        width="32"
        height="32"
        title="{data.post.writer.username}"
        class="rounded mr-3" />
      {format(new Date(parseInt(data.post.date)), "dd MMMM yyyy - HH:mm")}
    </div>
    <div class="text-muted">
      <ul class="mb-0">
        <li class="list-inline">
          <span
            class="list-inline-item px-1"
            use:tooltip="{['Görüntülenme', { placement: 'bottom' }]}">
            <i class="fas fa-eye mr-2"></i>
            {data.post.views}
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row justify-content-between">
  <div class="col-auto">
    <a
      href="/blog/post/{data.previous_post === '-'
        ? ''
        : data.previous_post.id}"
      class="btn btn-link"
      class:disabled="{data.previous_post === '-'}"
      use:tooltip="{[data.previous_post.title, { placement: 'bottom' }]}">
      <i class="fas fa-chevron-left mr-2"></i> Önceki Yazı
    </a>
  </div>
  <div class="col-auto">
    <a
      href="/blog/post/{data.next_post === '-' ? '' : data.next_post.id}"
      class="btn btn-link"
      class:disabled="{data.next_post === '-'}"
      use:tooltip="{[data.next_post.title, { placement: 'bottom' }]}">
      Sonraki Yazı
      <i class="fas fa-chevron-right ml-2"></i>
    </a>
  </div>
</div>

<script context="module">
  import { browser } from "$app/env";

  import ApiUtil from "$lib/api.util";

  let refreshable = false;

  async function loadData(id) {
    return new Promise((resolve) => {
      ApiUtil.post("posts/detail", {
        id: parseInt(id),
      })
        .then((response) => {
          if (response.data.result === "ok") {
            const data = response.data;

            data.id = parseInt(id)

            resolve(data);
          } else if (response.data.result === "error") {
            const errorCode = response.data.error;

            reject(errorCode, response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    let output = {
      props: {},
    };

    if (!!session.data && session.data.error === "PAGE_NOT_FOUND")
      output = null;

    if (browser && (page.path !== session.loadedPath || refreshable)) {
      // from another page
      output.props.data = await loadData(
        !!page.params.id ? parseInt(page.params.id) : 1,
        false
      );
    }

    if (page.path === session.loadedPath && !refreshable) {
      if (browser) refreshable = true;

      output.props.data = session.data;
      output.props.data.id = parseInt(page.params.id);
    }

    return output;
  }
</script>

<script>
  import { format } from "date-fns";

  import tooltip from "$lib/tooltip.util";

  export let data;
</script>

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
  import ApiUtil from "$lib/api.util";

  let refreshable = false;

  async function loadData({ id, request, CSRFToken }) {
    return new Promise((resolve, reject) => {
      ApiUtil.post({
        path: "/api/posts/detail",
        body: {
          id: parseInt(id),
        },
        request,
        CSRFToken,
      })
        .then((body) => {
          if (body.result === "ok") {
            const data = body;

            data.id = parseInt(id);

            resolve(data);
          } else {
            reject(body)
          }
        })
    });
  }

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    let output = {
      props: {
        data: {
          post: {
            id: -1,
            title: "",
            category: "-",
            writer: {
              username: "",
            },
            text: "",
            date: 0,
            status: 1,
            image: "",
            views: 0,
          },
          previous_post: "-",
          next_post: "-",
        },
      },
    };

    await loadData({ id: request.page.params.id, request })
      .then((body) => {
        output.props.data = body;
      })
      .catch(() => {
        output = null;
      });

    return output;
  }
</script>

<script>
  import { format } from "date-fns";

  import tooltip from "$lib/tooltip.util";

  export let data;
</script>

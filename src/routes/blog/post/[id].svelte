<Post post="{data.post}" detail="{true}" />

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

  async function loadData({ id, request, CSRFToken }) {
    return new Promise((resolve, reject) => {
      ApiUtil.post({
        path: "/api/posts/detail",
        body: {
          id: parseInt(id),
        },
        request,
        CSRFToken,
      }).then((body) => {
        if (body.result === "ok") {
          const data = body;

          data.id = parseInt(id);

          resolve(data);
        } else {
          reject(body);
        }
      });
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
  import tooltip from "$lib/tooltip.util";

  import Post from "$lib/component/Post.svelte";

  export let data;
</script>

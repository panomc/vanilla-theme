<Post post="{data.post}" detail="{true}" />

<div class="row justify-content-between">
  <div class="col-auto">
    <a
      href="/blog/post/{data.previousPost === '-' ? '' : data.previousPost.id}"
      class="btn btn-link"
      class:disabled="{data.previousPost === '-'}"
      use:tooltip="{[data.previousPost.title, { placement: 'bottom' }]}">
      Önceki Yazı
    </a>
  </div>
  <div class="col-auto">
    <a
      href="/blog/post/{data.nextPost === '-' ? '' : data.nextPost.id}"
      class="btn btn-link"
      class:disabled="{data.nextPost === '-'}"
      use:tooltip="{[data.nextPost.title, { placement: 'bottom' }]}">
      Sonraki Yazı
    </a>
  </div>
</div>

<script context="module">
  import PostDetailSidebar from "$lib/component/sidebars/PostDetailSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import { getPostDetail } from "$lib/services/posts.js";

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
          previousPost: "-",
          nextPost: "-",
        },
      },
    };

    setSidebar(PostDetailSidebar);

    await getPostDetail({ id: request.params.id, request }).then((body) => {
      if (body.error) {
        output = null;

        return;
      }

      output.props.data = body;
    });

    return output;
  }
</script>

<script>
  import tooltip from "$lib/tooltip.util";

  import Post from "$lib/component/Post.svelte";

  export let data;
</script>

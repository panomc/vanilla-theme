<Post post="{data.post}" detail="{true}" />

<div class="row justify-content-between">
  <div class="col-auto">
    <a
      href="/blog/post/{data.previousPost === '-' ? '' : data.previousPost.url}"
      class="btn btn-link"
      class:disabled="{data.previousPost === '-'}"
      use:tooltip="{[data.previousPost.title, { placement: 'bottom' }]}">
      Önceki Yazı
    </a>
  </div>
  <div class="col-auto">
    <a
      href="/blog/post/{data.nextPost === '-' ? '' : data.nextPost.url}"
      class="btn btn-link"
      class:disabled="{data.nextPost === '-'}"
      use:tooltip="{[data.nextPost.title, { placement: 'bottom' }]}">
      Sonraki Yazı
    </a>
  </div>
</div>

<script context="module">
  import HomeSidebar from "$lib/component/sidebars/HomeSidebar.svelte";
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
            url: ""
          },
          previousPost: "-",
          nextPost: "-",
        },
      },
    };

    setSidebar(HomeSidebar);

    await getPostDetail({ url: request.params.url, request }).then((body) => {
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

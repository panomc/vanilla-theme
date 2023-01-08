<h5 class="card-title mb-3">Önizlenen Yazı: {post.title}</h5>

<Post post="{post}" detail="{true}" />

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  import { getPostPreview } from "$lib/services/posts.js";
  import { get } from "svelte/store";
  import { session } from "$lib/Store.js";

  export async function load(event) {
    const { parent } = event;

    await parent();

    const { user } = get(session);

    if (!user && !user.panelAccess) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    let data = {
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
    };

    await getPostPreview({ id: event.params.id, request: event }).then(
      (body) => {
        if (body.error) {
          data = {};

          return;
        }

        data.post = body;
      }
    );

    return data;
  }
</script>

<script>
  import Post from "$lib/component/Post.svelte";

  export let post;
</script>

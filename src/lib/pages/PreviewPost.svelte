<h1>Önizlenen Yazı: {post.title}</h1>

<hr />

<br />

<Post post="{post}" detail="{true}" />

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  import { getPostPreview } from "$lib/services/posts.js";
  import { get } from "svelte/store";
  import { session } from "$lib/Store.js";

  export async function load(event) {
    const { user } = get(session);

    if (!user && !user.panelAccess) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    let output = {
      props: {
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
    };

    await getPostPreview({ id: event.params.id, request: event }).then((body) => {
      if (body.error) {
        output = null;

        return;
      }

      output.props.post = body;
    });

    return output;
  }
</script>

<script>
  import Post from "$lib/component/Post.svelte";

  export let post;
</script>

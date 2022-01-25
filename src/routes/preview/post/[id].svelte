<h1>Önizlenen Yazı: {post.title}</h1>

<hr/>

<br/>

<Post post="{post}" detail="{true}" />

<script context="module">
  import ApiUtil from "$lib/api.util";

  async function loadData({ id, request, CSRFToken }) {
    return new Promise((resolve, reject) => {
      ApiUtil.post({
        path: "/api/panel/post/preview",
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
    const { user } = request.session;

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
        previous_post: "-",
        next_post: "-",
      },
    };

    await loadData({ id: request.page.params.id, request })
      .then((body) => {
        output.props.post = body;
      })
      .catch(() => {
        output = null;
      });

    return output;
  }
</script>

<script>
  import Post from "$lib/component/Post.svelte";

  export let post;
</script>

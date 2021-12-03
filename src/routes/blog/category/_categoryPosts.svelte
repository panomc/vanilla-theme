<div class="row justify-content-between">
  <div class="col-auto">
    <h4>
      {data.category.title} <i class="font-weight-light">kategorisinde</i>
      {data.posts_count} <i class="font-weight-light">yazı var:</i>
    </h4>
  </div>
</div>
<hr />

<Posts posts="{data.posts}" />

<!-- Pagination -->
{#if data.posts_count > 0}
  <Pagination
    page="{data.page}"
    totalPage="{data.total_page}"
    loading="{false}"
    on:firstPageClick="{() => reloadData(1)}"
    on:lastPageClick="{() => reloadData(data.total_page)}"
    on:pageLinkClick="{(event) => reloadData(event.detail.page)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import ApiUtil from "$lib/api.util";

  async function loadData({ page, url, request, CSRFToken }) {
    return new Promise((resolve, reject) => {
      ApiUtil.post({
        path: "/api/posts/categoryPosts",
        body: {
          page: parseInt(page),
          url,
        },
        request,
        CSRFToken,
      }).then((body) => {
        if (body.result === "ok") {
          const data = body;

          data.page = parseInt(page);
          data.url = url;

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
          posts: [],
          posts_count: 0,
          total_page: 1,
          page: 1,
          category: {
            id: -1,
            title: "",
            description: "",
            url: "",
            color: "",
          },
        },
      },
    };

    await loadData({
      page: request.page.params.page || 1,
      url: request.page.params.url,
      request,
    })
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
  import { session } from "$app/stores";

  import { goto } from "$app/navigation";

  import Pagination from "../../../components/Pagination.svelte";
  import Posts from "../../../components/Posts.svelte";

  export let data;

  function reloadData(page = data.page, url = data.url) {
    loadData({ page, url, CSRFToken: $session.CSRFToken })
      .then((body) => {
        if (page !== data.page) {
          goto(
            page === 1
              ? "/blog/category/" + url
              : "/blog/category/" + url + "/" + page
          );
        } else {
          data = body;
        }
      })
      .catch((body) => {
        if (!!body.error && body.error === "PAGE_NOT_FOUND") {
          reloadData(page - 1);
        }
      });
  }
</script>

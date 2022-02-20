<!-- Post Cards -->
<Posts posts="{data.posts}" />
<!-- Post Cards End -->

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

  async function loadData({ page, request, CSRFToken }) {
    return new Promise((resolve, reject) => {
      ApiUtil.post({
        path: "/api/posts",
        body: { page: parseInt(page) },
        request,
        CSRFToken,
      }).then((body) => {
        if (body.result === "ok") {
          const data = body;

          data.page = parseInt(page);

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
          page: 1,
          total_page: 1,
        },
      },
    };

    await loadData({ page: request.params.page || 1, request })
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
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  import Pagination from "$lib/component/Pagination.svelte";
  import Posts from "$lib/component/Posts.svelte";

  export let data;

  function reloadData(page = data.page) {
    loadData({ page, CSRFToken: $session.CSRFToken })
      .then((body) => {
        if (page !== data.page) {
          goto(page === 1 ? "/" : "/blog/page/" + page);
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

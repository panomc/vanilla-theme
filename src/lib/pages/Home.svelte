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
  import HomeSidebar from "$lib/component/sidebars/HomeSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import { getPosts } from "$lib/services/posts.js";

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

    setSidebar(HomeSidebar);

    await getPosts({ page: request.params.page || 1, request }).then((body) => {
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
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  import Pagination from "$lib/component/Pagination.svelte";
  import Posts from "$lib/component/Posts.svelte";

  export let data;

  function reloadData(page = data.page) {
    getPosts({ page, CSRFToken: $session.CSRFToken }).then((body) => {
      if (body.result === "ok") {
        if (page !== data.page) {
          goto(page === 1 ? "/" : "/blog/page/" + page);
        } else {
          data = body;
        }
      } else if (body.error === "PAGE_NOT_FOUND") {
        reloadData(page - 1);
      }
    });
  }
</script>

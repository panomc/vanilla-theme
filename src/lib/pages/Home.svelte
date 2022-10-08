<!-- Post Cards -->
<Posts posts="{data.posts}" />
<!-- Post Cards End -->

<!-- Pagination -->
{#if data.postCount > 0}
  <Pagination
    page="{data.page}"
    totalPage="{data.totalPage}"
    loading="{false}"
    on:firstPageClick="{() => reloadData(1)}"
    on:lastPageClick="{() => reloadData(data.totalPage)}"
    on:pageLinkClick="{(event) => reloadData(event.detail.page)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import HomeSidebar from "$lib/component/sidebars/HomeSidebar.svelte";
  import { setSidebar } from "$lib/Store.js";
  import { getPosts } from "$lib/services/posts.js";

  /**
   * @type {import('@sveltejs/kit').PageLoad}
   */
  export async function load(event) {
    let data = {
      posts: [],
      postCount: 0,
      page: 1,
      totalPage: 1,
    };

    setSidebar(HomeSidebar);

    await getPosts({ page: event.params.page || 1, request: event }).then((body) => {
      if (body.error) {
        return;
      }

      data = body;
    });

    return data;
  }
</script>

<script>
  import { goto } from "$app/navigation";

  import Pagination from "$lib/component/Pagination.svelte";
  import Posts from "$lib/component/Posts.svelte";
  import { session } from "$lib/Store.js";

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

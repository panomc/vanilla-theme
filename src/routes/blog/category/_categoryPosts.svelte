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
    on:firstPageClick="{() => loadData(1, data.url)}"
    on:lastPageClick="{() => loadData(data.total_page, data.url)}"
    on:pageLinkClick="{(event) => loadData(event.detail.page, data.url)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let ApiUtil;

  async function initUtils() {
    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../../../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }
  }

  async function loadData(page, url, routePage = true) {
    await initUtils();

    return new Promise((resolve) => {
      ApiUtil.post("posts/categoryPosts", {
        page: parseInt(page),
        url,
      })
        .then((response) => {
          if (response.data.result === "ok") {
            resolve(response.data);

            if (routePage)
              goto(
                page === 1
                  ? "/blog/category/" + url
                  : "/blog/category/" + url + "/" + page
              );
          } else goto("/error-404");
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    let output = {
      props: {},
    };

    if (session.error === "PAGE_NOT_FOUND" || session.error === "NOT_EXISTS")
      output = null;

    if (page.path === session.loadedPath) output.props.data = session.data;

    if (browser && page.path !== session.loadedPath) {
      // from another page
      output.props.data = await loadData(
        !!page.params.page ? parseInt(page.params.page) : 1,
        page.params.url,
        false
      );
    }

    output.props.data.page = !!page.params.page
      ? parseInt(page.params.page)
      : 1;
    output.props.data.url = page.params.url;

    return output;
  }
</script>

<script>
  import Pagination from "../../../components/Pagination.svelte";
  import Posts from "../../../components/Posts.svelte";

  export let data;
</script>

<div class="row justify-content-between">
  <div class="col-auto">
    <h4>
      {$data.category.title} <i class="font-weight-light">kategorisinde</i>
      {$data.posts_count} <i class="font-weight-light">yazı var:</i>
    </h4>
  </div>
</div>
<hr />

<Posts posts="{$data.posts}" />

<!-- Pagination -->
{#if $data.posts_count > 0}
  <Pagination
    page="{$currentPage}"
    totalPage="{$data.total_page}"
    loading="{$dataLoading}"
    on:firstPageClick="{() => loadData(1)}"
    on:lastPageClick="{() => loadData($data.total_page)}"
    on:pageLinkClick="{(event) => loadData(event.detail.page)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import { get, writable } from "svelte/store";

  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const currentPage = writable(0);
  const currentUrl = writable("");
  let data = writable({
    posts: [],
    posts_count: 0,
    total_page: 1,
    category: {
      id: -1,
      title: "",
      description: "",
      url: "",
      color: "",
    },
  });
  const dataLoading = writable(false);

  let ApiUtil;

  async function initUtils() {
    dataLoading.set(true);

    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../../../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }

    dataLoading.set(false);
  }

  async function loadData(page, url = get(currentUrl), routePage = true) {
    await initUtils();

    dataLoading.set(true);

    ApiUtil.post("posts/categoryPosts", {
      page: parseInt(page),
      url,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          dataLoading.set(false);

          data.set(response.data);

          currentPage.set(page);

          if (routePage)
            goto(
              page === 1
                ? "/blog/category/" + url
                : "/blog/category/" + url + "/" + page
            );
        } else goto("/error-404");
      })
      .catch((e) => {
        dataLoading.set(false);

        console.log(e);
      });
  }

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    let output = {};

    if (session.error === "PAGE_NOT_FOUND" || session.error === "NOT_EXISTS")
      output = null;

    if (page.path === session.loadedPath)
      data.set(session)

    if (
      browser &&
      (page.path !== session.loadedPath)
    ) {
      // from another page
      await loadData(
        !!page.params.page ? parseInt(page.params.page) : 1,
        !!page.params.url ? page.params.url : "",
        false
      );
    }

    return output;
  }
</script>

<script>
  import { onDestroy, getContext } from "svelte";

  import Pagination from "../../../components/Pagination.svelte";
  import Posts from "../../../components/Posts.svelte";

  // init first time the current page on both sides
  if (get(currentPage) === 0)
    currentPage.set(
      !!get(page).params.page ? parseInt(get(page).params.page) : 1
    );

  // init first time the current url on both sides
  if (get(currentUrl) === "")
    currentUrl.set(!!get(page).params.url ? get(page).params.url : "");

  // server-side current page and url rendering
  if (!browser)
    onDestroy(
      page.subscribe((page) => {
        currentPage.set(!!page.params.page ? parseInt(page.params.page) : 1);
        currentUrl.set(!!page.params.url ? page.params.url : "");
      })
    );
</script>

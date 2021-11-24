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
  import { browser } from "$app/env";

  import ApiUtil from "$lib/api.util";

  let refreshable = false;

  async function loadData(page, url) {
    return new Promise((resolve) => {
      ApiUtil.post("posts/categoryPosts", {
        page: parseInt(page),
        url,
      })
        .then((response) => {
          if (response.data.result === "ok") {
            const data = response.data;

            data.page = parseInt(page);
            data.url = url;

            resolve(data);
          } else if (response.data.result === "error") {
            const errorCode = response.data.error;

            reject(errorCode, response.data);
          }
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

    if (
      page.path === session.loadedPath &&
      !refreshable &&
      !!session.data &&
      (session.data.error === "PAGE_NOT_FOUND" ||
        session.data.error === "NOT_EXISTS")
    )
      output = null;

    if (browser && (page.path !== session.loadedPath || refreshable)) {
      // from another page
      output.props.data = await loadData(
        !!page.params.page ? page.params.page : 1,
        page.params.url,
        false
      );
    }

    if (page.path === session.loadedPath && !refreshable) {
      if (browser) refreshable = true;

      output.props.data = session.data;

      output.props.data.page = !!page.params.page
        ? parseInt(page.params.page)
        : 1;
      output.props.data.url = page.params.url;
    }

    return output;
  }
</script>

<script>
  import { goto } from "$app/navigation";

  import Pagination from "../../../components/Pagination.svelte";
  import Posts from "../../../components/Posts.svelte";

  export let data;

  function reloadData(page = data.page, url = data.url) {
    loadData(page, url)
      .then((loadedData) => {
        if (page !== data.page) {
          goto(
            page === 1
              ? "/blog/category/" + url
              : "/blog/category/" + url + "/" + page
          );
        } else {
          data = loadedData;
        }
      })
      .catch((errorCode) => {
        if (!!errorCode && errorCode === "PAGE_NOT_FOUND") {
          reloadData(page - 1);
        }
      });
  }
</script>

<div class="row justify-content-between mb-3">
  <div class="col-auto">
    <h4>
      {$_("pages.category-posts.title", {values: {categoryTitle: data.category.title, postCount: data.postCount}})}
    </h4>
  </div>
  <div class="col-auto">
    <a href="/">
      <i class="fas fa-arrow-left me-2"></i>
      {$_("pages.category-posts.posts")}
    </a>
  </div>
</div>

<Posts posts="{data.posts}" />

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
  import { getCategoryPosts } from "$lib/services/posts";
  import { error } from "@sveltejs/kit";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    let data = {
      posts: [],
      postCount: 0,
      totalPage: 1,
      page: 1,
      category: {
        id: -1,
        title: "",
        description: "",
        url: "",
        color: "",
      },
    };

    await getCategoryPosts({
      page: event.params.page || 1,
      url: event.params.url,
      request: event,
    }).then((body) => {
      if (body.error) {
        if (body.error === "NOT_EXISTS") {
          throw error(404, body.error);
        }

        throw error(500, body.error);
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
  import { _ } from "svelte-i18n";

  export let data;

  function reloadData(page = data.page, url = data.url) {
    getCategoryPosts({ page, url }).then((body) => {
      if (body.result === "ok") {
        if (page !== data.page) {
          goto(
            page === 1
              ? "/blog/category/" + url
              : "/blog/category/" + url + "/" + page
          );
        } else {
          data = body;
        }
      } else if (body.error === "PAGE_NOT_FOUND") {
        reloadData(page - 1);
      } else {
        console.log(body);
      }
    });
  }
</script>

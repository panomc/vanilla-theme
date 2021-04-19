<!-- Post Cards -->
<Posts posts="{data.posts}" />
<!-- Post Cards End -->

<!-- Post Card -->
<!--<div class="card shadow-sm mb-5 border-0 shadow-sm">-->
<!--  <img alt="Post Image" class="card-img-top" src="/assets/img/post-image.jpg" />-->
<!--  <div class="card-body">-->
<!--    <router-link to="/" class="text-black d-inline-block">-->
<!--      <h5 class="card-title">-->
<!--        <span class="badge badge-pill badge-mint text-light mr-3">DUYURU</span>-->
<!--        Minecraft sunucumuz açıldı!-->
<!--      </h5>-->
<!--    </router-link>-->
<!--    <p class="card-text">-->
<!--      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium-->
<!--      recusandae repellendus sit enim ipsam, officia inventore magnam quasi-->
<!--      repellat quaerat fugiat. Voluptatibus saepe in commodi itaque explicabo-->
<!--      totam earum dolorem.-->
<!--    </p>-->
<!--  </div>-->
<!--  <div class="card-footer d-flex justify-content-between">-->
<!--    <span class="text-muted">-->
<!--      <img-->
<!--        src="/assets/img/head.png"-->
<!--        alt="Steve"-->
<!--        width="32"-->
<!--        height="32"-->
<!--        title="Steve"-->
<!--        class="rounded mr-3" />-->
<!--      14 Mart 2018-->
<!--    </span>-->
<!--    <button class="btn btn-secondary" type="button">Devamını Oku ></button>-->
<!--  </div>-->
<!--</div>-->
<!-- Post Card End -->

<!-- Pagination -->
{#if data.posts_count > 0}
  <Pagination
    page="{data.page}"
    totalPage="{data.total_page}"
    loading="{false}"
    on:firstPageClick="{() => loadData(1)}"
    on:lastPageClick="{() => loadData(data.total_page)}"
    on:pageLinkClick="{(event) => loadData(event.detail.page)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let ApiUtil;

  async function initUtils() {
    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }
  }

  async function loadData(page, routePage = true) {
    await initUtils();

    return new Promise((resolve) => {
      ApiUtil.post("posts", {
        page: parseInt(page),
      })
        .then((response) => {
          if (response.data.result === "ok") {
            resolve(response.data);

            if (routePage) goto(page === 1 ? "/" : "/blog/page/" + page);
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

    if (session.error === "PAGE_NOT_FOUND") output = null;

    if (page.path === session.loadedPath) output.props.data = session.data;

    if (browser && page.path !== session.loadedPath) {
      // from another page
      output.props.data = await loadData(
        !!page.params.page ? parseInt(page.params.page) : 1,
        false
      );
    }

    output.props.data.page = !!page.params.page
      ? parseInt(page.params.page)
      : 1;

    return output;
  }
</script>

<script>
  import Pagination from "../components/Pagination.svelte";
  import Posts from "../components/Posts.svelte";

  export let data;
</script>

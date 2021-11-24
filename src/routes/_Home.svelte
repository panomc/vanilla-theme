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
    on:firstPageClick="{() => reloadData(1)}"
    on:lastPageClick="{() => reloadData(data.total_page)}"
    on:pageLinkClick="{(event) => reloadData(event.detail.page)}" />
{/if}

<!-- Pagination End -->
<script context="module">
  import { browser } from "$app/env";

  import ApiUtil from "$lib/api.util";

  let refreshable = false;

  async function loadData(page) {
    return new Promise((resolve, reject) => {
      ApiUtil.post("posts", {
        page: parseInt(page),
      })
        .then((response) => {
          if (response.data.result === "ok") {
            const data = response.data;

            data.page = parseInt(page);

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
          page: 1,
          total_page: 1,
        },
      },
    };

    if (!!session.data && session.data.error === "PAGE_NOT_FOUND")
      output = null;

    if (browser && (page.path !== session.loadedPath || refreshable)) {
      // from another page
      output.props.data = await loadData(
        !!page.params.page ? page.params.page : 1,
        false
      );
    }

    if (page.path === session.loadedPath && !refreshable) {
      if (browser) refreshable = true;

      output.props.data = session.data;

      output.props.data.page = !!page.params.page
        ? parseInt(page.params.page)
        : 1;
    }

    return output;
  }
</script>

<script>
  import Pagination from "../components/Pagination.svelte";
  import Posts from "../components/Posts.svelte";
  import { goto } from "$app/navigation";

  export let data;

  function reloadData(page = data.page) {
    loadData(page)
      .then((loadedData) => {
        if (page !== data.page) {
          goto(page === 1 ? "/" : "/blog/page/" + page);
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

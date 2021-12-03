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

    await loadData({ page: request.page.params.page || 1, request })
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

  import Pagination from "../components/Pagination.svelte";
  import Posts from "../components/Posts.svelte";

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

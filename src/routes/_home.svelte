<!-- Post Card -->
{#each $data.posts as post, index (post)}
  <div class="card shadow-sm mb-5 border-0 shadow-sm">
    <div class="card-body">
      <div class="row mb-3 justify-content-center">
        <div class="col">
          <a href="/blog/post/{post.id}" class="card-title text-black">
            <h3 class="mb-0 d-inline-block">
              {truncate(post.title, 100)}{@html post.title.length > 100
              ? "&hellip;"
              : ""}
            </h3>
          </a>
        </div>
        <div class="col-auto">
          {#if post.category.title !== "-"}
            <div class="lead">
              <span class="badge badge-primary text-white"
              >{post.category.title}</span>
            </div>
          {/if}
        </div>
      </div>

      <p class="card-text">
        {@html post.post}
      </p>
    </div>
    <div class="card-footer d-flex align-items-center">
      <div class="text-muted">
        <img
          src="https://minotar.net/avatar/{post.writer.username}"
          alt="{post.writer.username}"
          width="32"
          height="32"
          title="{post.writer.username}"
          class="rounded mr-3" />
        {format(new Date(parseInt(post.date)), "dd MMMM yyyy - HH:mm")}
      </div>

      <a href="/blog/post/{post.id}" class="btn btn-secondary ml-auto">
        Devamını Oku >
      </a>
    </div>
  </div>
{:else}
  <div class="container text-center py-5">
    <i class="fas fa-sticky-note text-gray fa-3x mb-3"></i>
    <p class="text-gray">Henüz bir blog yazısı yayınlanmamış.</p>
  </div>
{/each}
<!-- Post Card End -->

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
  let data = writable({
    posts: [],
    posts_count: 0,
    total_page: 1,
  });
  const dataLoading = writable(false);

  let ApiUtil;

  async function initUtils() {
    dataLoading.set(true);

    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }

    dataLoading.set(false);
  }

  async function loadData(page, routePage = true) {
    await initUtils();

    dataLoading.set(true);

    ApiUtil.post("posts", {
      page: parseInt(page),
    })
      .then((response) => {
        if (response.data.result === "ok") {
          dataLoading.set(false);

          data.set(response.data);

          currentPage.set(page);

          if (routePage) goto(page === 1 ? "/" : "/blog/page/" + page);
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
    const output = {};

    if (session.error === "PAGE_NOT_FOUND") output.redirect = "/error-404";

    if (browser && page.path !== session.loadedPath) {
      // from another page
      await loadData(
        !!page.params.page ? parseInt(page.params.page) : 1,
        false
      );
    }

    return output;
  }
</script>

<script>
  import { truncate } from "$lib/string.util";
  import { format } from "date-fns";

  import { onDestroy, getContext } from "svelte";

  import Pagination from "../components/Pagination.svelte";

  const unsubscribeData = getContext("data").subscribe((initialData) => {
    // first data load in server-side
    if (initialData !== null && get(page).path === initialData.loadedPath)
      data.set(initialData);
  });

  // init first time the current page on both sides
  if (get(currentPage) === 0)
    currentPage.set(
      !!get(page).params.page ? parseInt(get(page).params.page) : 1
    );

  // server-side current page rendering
  if (!browser)
    onDestroy(
      page.subscribe((page) => {
        currentPage.set(!!page.params.page ? parseInt(page.params.page) : 1);
      })
    );

  // browser-side follow page and load data
  if (browser)
    onDestroy(
      page.subscribe(async (page) => {
        if (
          (!!page.params.page ? parseInt(page.params.page) : 1) !==
          get(currentPage)
        )
          await loadData(!!page.params.page ? page.params.page : 1, false);
      })
    );

  onDestroy(unsubscribeData);
</script>

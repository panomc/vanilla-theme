<div class="card shadow-sm mb-4">
  <div class="card-body">
    <div class="row mb-3 justify-content-center">
      <div class="col">
        <h3 class="mb-0 d-inline-block">{$data.post.title}</h3>
      </div>
      {#if $data.post.category !== "-"}
        <div class="col-auto">
          <div class="lead">
            <a href="/blog/category/{$data.post.category.url}">
              <span class="badge badge-primary text-white"
                >{$data.post.category.title}</span>
            </a>
          </div>
        </div>
      {/if}
    </div>

    {@html $data.post.text}
  </div>
  <div class="card-footer d-flex justify-content-between align-items-center">
    <div class="text-muted">
      <img
        src="https://minotar.net/avatar/{$data.post.writer.username}"
        alt="{$data.post.writer.username}"
        width="32"
        height="32"
        title="{$data.post.writer.username}"
        class="rounded mr-3" />
      {format(new Date(parseInt($data.post.date)), "dd MMMM yyyy - HH:mm")}
    </div>
    <div class="text-muted">
      <ul class="mb-0">
        <li class="list-inline">
          <span class="list-inline-item px-1">
            <i class="fas fa-eye mr-2"></i>
            {$data.post.views}
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row justify-content-between">
  <div class="col-auto">
    <a href="#" class="btn btn-link">
      <i class="fas fa-chevron-left mr-2"></i> Önceki Yazı
    </a>
  </div>
  <div class="col-auto">
    <a href="#" class="btn btn-link">
      Sonraki Yazı
      <i class="fas fa-chevron-right ml-2"></i>
    </a>
  </div>
</div>

<script context="module">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { browser } from "$app/env";

  const data = writable({
    post: {
      id: -1,
      title: "",
      category: "-",
      writer: {
        username: "",
      },
      text: "",
      date: 0,
      status: 1,
      image: "",
      views: 0,
    },
  });

  let ApiUtil;

  async function initUtils() {
    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../../../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
    }
  }

  async function loadData(id) {
    await initUtils();

    ApiUtil.post("posts/detail", {
      id,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          data.set(response.data);
        } else goto("/error-404");
      })
      .catch((e) => {
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
      await loadData(parseInt(page.params.id));
    }

    return output;
  }
</script>

<script>
  import { format } from "date-fns";

  import { page } from "$app/stores";

  import { onDestroy, getContext } from "svelte";
  import { get } from "svelte/store";

  onDestroy(
    getContext("data").subscribe((initialData) => {
      // first data load in server-side
      if (initialData !== null && get(page).path === initialData.loadedPath)
        data.set(initialData);
    })
  );

  // browser-side follow page and load data
  if (browser)
    onDestroy(
      page.subscribe(async (page) => {
        if (
          get(data).post.id !== -1 &&
          parseInt(page.params.id) !== get(data).post.id
        )
          await loadData(parseInt(page.params.id));
      })
    );
</script>

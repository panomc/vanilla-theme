<nav>
  <ul class="pagination justify-content-center">
    <li class="page-item" class:disabled="{parseInt(page) === 1 || loading}">
      <a
        class="page-link"
        href="javascript:void(0);"
        on:click="{onFirstPageClick}"
        aria-hidden="{parseInt(page) === 1 || loading}">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>

    {#each pages as index}
      <li
        class="page-item"
        class:active="{parseInt(page) === index}"
        aria-current="{parseInt(page) === index ? 'page' : ''}"
        class:disabled="{parseInt(page) !== index && loading}">
        <a
          class="page-link"
          href="javascript:void(0);"
          on:click="{() => (loading ? void 0 : onPageLinkClick(index))}"
          aria-hidden="{parseInt(page) === index}">{index}</a>
      </li>
    {/each}
    <li
      class="page-item"
      class:disabled="{parseInt(page) === totalPage || loading}">
      <a
        class="page-link"
        on:click="{onLastPageClick}"
        aria-hidden="{parseInt(page) === totalPage || loading}"
        href="javascript:void(0);">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>

<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let pages;

  export let page;
  export let loading = false;
  export let totalPage = 1;

  $: {
    pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  }

  function onFirstPageClick() {
    dispatch("firstPageClick", {});
  }

  function onLastPageClick() {
    dispatch("lastPageClick", {});
  }

  function onPageLinkClick(index) {
    dispatch("pageLinkClick", {
      page: index,
    });
  }
</script>

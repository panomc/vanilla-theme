<!-- Main Block -->
<main class="container">
  <div class="row">
    <!-- Content -->
    <div class="col">
      <slot />
    </div>
    <!-- Content End -->

    <svelte:component this="{$sidebar}" {...$sidebarProps} />
  </div>
</main>

<!-- Main Block End -->
<script>
  import { sidebar, sidebarProps } from "$lib/Store.js";
</script>

<!-- Main Block -->
<main class="container">
  <div class="row">
    <!-- Content -->
    <div class="col">
      <slot />
    </div>
    <!-- Content End -->

    <svelte:component this="{$sidebar}" />
  </div>
</main>

<!-- Main Block End -->
<script>
  import { sidebar } from "$lib/Store.js";
</script>

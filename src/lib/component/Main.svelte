<!-- Main Block -->
<main class="container">
  <div class="row">
    {#if !$sidebarProps || $sidebarProps.side === "left"}
      <svelte:component this="{$sidebar}" {...$sidebarProps} />
    {/if}

    <!-- Content -->
    <div class="col">
      <slot />
    </div>
    <!-- Content End -->

    {#if !$sidebarProps || !$sidebarProps.side}
      <svelte:component this="{$sidebar}" {...$sidebarProps} />
    {/if}
  </div>
</main>

<!-- Main Block End -->
<script>
  import { getContext } from "svelte";

  const sidebar = getContext("sidebar");
  const sidebarProps = getContext("sidebarProps");
</script>

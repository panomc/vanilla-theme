<!-- Sidebar -->
<aside
  class="col-lg-4"
  class:order-lg-last="{side === 'right'}"
  class:order-first="{side === 'right'}"
  class:order-lg-first="{side === 'left'}"
  class:order-last="{side === 'left'}">
  <slot />
</aside>

<!-- Sidebar End -->
<script>
  export let side = "right";
</script>

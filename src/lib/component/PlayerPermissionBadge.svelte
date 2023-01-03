<div class="badge bg-light text-black rounded-pill">
  {#if permissionGroupName}
    {permissionGroupName.capitalize()}
  {:else}
    Oyuncu
  {/if}
</div>

<script context="module">
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
</script>

<script>
  export let permissionGroupName;
</script>
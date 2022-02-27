{#if error || alwaysVisible}
  <div class="alert alert-danger" in:fade out:fade>
    <strong>Hata:</strong>
    {error}
    <button type="button" class="btn-close" on:click="{() => hide()}"> </button>
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let error;

  const alwaysVisible = false;

  function hide() {
    error = null;
  }
</script>

{#if error}
  <div class="alert alert-danger" in:fade out:fade>
    <strong>Hata:</strong>
    {error}
    <button type="button" class="btn-close" on:click="{() => hide()}"> </button>
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let error;

  function hide() {
    error = null;
  }
</script>

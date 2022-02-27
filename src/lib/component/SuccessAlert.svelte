{#if message || alwaysVisible}
  <div class="alert alert-primary" in:fade out:fade>
    {message}
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let message;

  const alwaysVisible = false;
</script>

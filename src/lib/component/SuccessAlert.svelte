{#if message || alwaysVisible}
  <div class="alert border border-success text-success" in:fade out:fade>
    <div class="d-flex">
      <div class="alert__icon mr-3">
        <i class="fas fa-exclamation-circle"></i>
      </div>

      <div class="align-self-center mr-3">
        {message}
      </div>

      <div class="ml-auto">
        <button
          type="button"
          class="alert__close alert__close--light"
          aria-label="Close"
          on:click="{() => hide()}">
          <span aria-hidden="true" class="text-success">×</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let message;

  const alwaysVisible = false;

  function hide() {
    message = null;
  }
</script>

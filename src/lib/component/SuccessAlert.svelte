<div
  class="alert border border-success text-success"
  style="display: none;"
  role="alert"
  bind:this="{$alertElement}"
>
  <div class="d-flex">
    <div class="alert__icon mr-3">
      <i class="fas fa-exclamation-circle"></i>
    </div>

    <div class="align-self-center mr-3">
      {$message}
    </div>

    <div class="ml-auto">
      <button
        type="button"
        class="alert__close alert__close--light"
        aria-label="Close"
        on:click="{() => hide($alertElement)}"
      >
        <span aria-hidden="true" class="text-success">×</span>
      </button>
    </div>
  </div>
</div>

<script context="module">
  import { writable } from "svelte/store";

  export function show(alertElement) {
    window.$(alertElement).fadeIn("slow");
  }

  export function hide(alertElement) {
    window.$(alertElement).fadeOut("fast");
  }
</script>

<script>
  export let alertElement = writable(null);
  export let message = writable("");
</script>

<div
  class="alert alert-danger alert-dismissible"
  style="display: none;"
  role="alert"
  bind:this="{$alertElement}">
  <button type="button" class="close" on:click="{() => hide($alertElement)}">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Hata:</strong>
  {$error}
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
  export let error = writable("");
</script>

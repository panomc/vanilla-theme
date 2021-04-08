<div
  id="{id}"
  class="alert alert-danger alert-dismissible"
  style="display: none;"
  role="alert">
  <button type="button" class="close" on:click="{hide}">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Hata:</strong>
  {$error}
</div>

<script context="module">
  import { writable } from "svelte/store";

  const id = "errorAlert";
  let error = writable("");

  export function show(errorCode) {
    error.set(errorCode);

    window.$("#" + id).fadeIn("slow");
  }

  export function hide() {
    window.$("#" + id).fadeOut("fast");
  }
</script>

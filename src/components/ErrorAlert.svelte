
<div
  id="{id}"
  class="alert alert-danger alert-dismissible" style="display: none;"
  role="alert">
  <button type="button" class="close" data-dismiss="alert">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Hata:</strong>
  {$error}
</div>

<script context="module">
  import jQuery from "jquery";
  import { writable } from "svelte/store";

  const id = "errorAlert";
  let error = writable("");

  export function show(errorCode) {
    error.set(errorCode);

    jQuery("#" + id).fadeIn("slow");
  }

  export function hide() {
    jQuery("#" + id).fadeOut("fast");
  }
</script>
<!-- Profile Page -->

<slot />

<script context="module">
  import { requireLogin } from "$lib/Store.js";

  export async function load({parent}) {
    await parent();

    requireLogin()
  }
</script>

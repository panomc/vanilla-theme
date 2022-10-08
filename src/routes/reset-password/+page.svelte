<ResetPassword />

<script context="module">
  import { requireLogin } from "$lib/Store.js";

  /**
   * @type {import('@sveltejs/kit').LayoutLoad}
   */
  export async function load({ parent }) {
    await parent();

    requireLogin();
  }
</script>

<script>
  import ResetPassword from "$lib/pages/ResetPassword.svelte";
</script>

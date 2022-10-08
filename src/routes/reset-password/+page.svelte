<ResetPassword />

<script>
  import ResetPassword from "$lib/pages/ResetPassword.svelte";
</script>

<script context="module">
  import { get } from "svelte/store";
  import { session } from "$lib/Store.js";
  import { redirect } from "@sveltejs/kit";

  /**
   * @type {import('@sveltejs/kit').LayoutLoad}
   */
  export async function load() {
    if (!get(session).user) {
      throw redirect(302, "/");
    }
  }
</script>
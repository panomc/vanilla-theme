<!-- Profile Page -->

<slot />

<script context="module">
  import { requireLogin } from "$lib/Store.js";

  export async function load({ parent }) {
    const parentData = await parent();
    const { session } = parentData;

    requireLogin(session);

    return parentData;
  }
</script>

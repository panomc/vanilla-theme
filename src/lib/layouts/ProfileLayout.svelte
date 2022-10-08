<!-- Profile Page -->

<slot />

<script context="module">
  import { redirect } from "@sveltejs/kit";
  import { session } from "$lib/Store.js";
  import { get } from "svelte/store";

  export function load() {
    if (!get(session).user) {
      throw redirect(302, "/");
    }
  }
</script>

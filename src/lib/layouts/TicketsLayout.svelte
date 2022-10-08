<!-- Tickets Page -->

<slot />

<CloseTicketConfirmModal />

<script context="module">
  import { redirect } from "@sveltejs/kit";
  import { get } from "svelte/store";
  import { session } from "$lib/Store.js";

  export function load() {
    if (!get(session).user) {
      throw redirect(302, "/");
    }
  }
</script>

<script>
  import CloseTicketConfirmModal from "$lib/component/modals/CloseTicketConfirmModal.svelte";
</script>

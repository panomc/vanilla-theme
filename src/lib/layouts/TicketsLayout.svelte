<!-- Tickets Page -->

<slot />

<CloseTicketConfirmModal />

<script context="module">
  import { requireLogin } from "$lib/Store.js";

  export async function load({ parent }) {
    await parent();

    requireLogin();
  }
</script>

<script>
  import CloseTicketConfirmModal from "$lib/component/modals/CloseTicketConfirmModal.svelte";
</script>

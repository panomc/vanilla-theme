<!-- Tickets Page -->

<slot />

<CloseTicketConfirmModal />

<script context="module">
  export function load({ session: { user } }) {
    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return {};
  }
</script>

<script>
  import CloseTicketConfirmModal from "$lib/component/modals/CloseTicketConfirmModal.svelte";
</script>

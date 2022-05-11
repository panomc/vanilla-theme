<TicketCreate />

<script context="module">
  import { load as loadTicketCreate } from "$lib/pages/ticket/TicketCreate.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadTicketCreate(params);

    output = {
      ...output,
      ...data,
    };

    return !!data ? output : null;
  }
</script>

<script>
  import TicketCreate from "$lib/pages/ticket/TicketCreate.svelte";
</script>

<CategoryTickets data="{data}" />

<script context="module">
  import { load as loadTickets } from "$lib/pages/CategoryTickets.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadTickets(params);

    output = {
      ...output,
      ...data,
    };

    return data ? output : null;
  }
</script>

<script>
  import CategoryTickets from "$lib/pages/CategoryTickets.svelte";

  export let data;
</script>

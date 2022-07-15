<TicketsLayout>
  <slot />
</TicketsLayout>

<script context="module">
  import { load as loadLayout } from "$lib/layouts/TicketsLayout.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(params) {
    let output = {};

    const data = await loadLayout(params);

    output = {
      ...output,
      ...data,
    };

    return data ? output : null;
  }
</script>

<script>
  import TicketsLayout from "$lib/layouts/TicketsLayout.svelte";
</script>

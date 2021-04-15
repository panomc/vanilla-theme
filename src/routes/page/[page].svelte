<Index />

<script context="module">

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    const output = {};

    if (session.error === "PAGE_NOT_FOUND")
    output.redirect = "/error-404"

    return output;
  }

</script>

<script>
  import Index from "../index.svelte";
</script>

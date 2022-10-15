Hello world!

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ parent }) {
    await parent();
  }
</script>

Bildirimler!!!


<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();
  }
</script>

<script>
  export let data;
</script>

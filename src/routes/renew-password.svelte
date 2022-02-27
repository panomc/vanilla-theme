<ResetPassword />

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ session: { user } }) {
    if (user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return {};
  }
</script>

<script>
  import ResetPassword from "$lib/pages/RenewPassword.svelte";
</script>

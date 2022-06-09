<!-- Tickets Page -->

<slot />

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

<!-- Profile Page -->

<!-- Profile Card -->
<div class="card mb-3">
  <div class="card-body">
    <slot />
  </div>
</div>

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

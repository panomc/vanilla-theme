<!-- Header -->
<div class="bg-warning border-bottom border-5 border-white">
  <div class="container">
    <img
      title="{$session.siteInfo.websiteName}"
      alt="{$_('components.header.alt')}"
      class="img-fluid d-block m-auto p-3"
      src="/api/websiteLogo" />
  </div>
</div>
<!-- Header End -->

<!-- Announcement Alerts -->
<div class="mb-3 d-none">
  <div class="container">
    <div
      class="alert alert-primary alert-dismissible fade show rounded-pill"
      role="alert">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"></button>

      <strong>Holy guacamole!</strong> You should check in on some of those fields
      below.
    </div>
  </div>
</div>

<!--Announcement Alerts End-->

<script>
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  const session = getContext("session");
</script>

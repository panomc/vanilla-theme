<!-- Header -->
<header id="header">
  <img
    title="{$session.siteInfo.websiteName}"
    alt="Server Logo"
    class="d-block m-auto p-3"
    src="/api/websiteLogo" />
</header>
<!-- Header End -->

<script>
  import { getContext } from "svelte";

  const session = getContext("session");
</script>
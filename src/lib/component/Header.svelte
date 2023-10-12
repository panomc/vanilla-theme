<!-- Header -->
<header id="header">
  <img
    title="{$session.siteInfo.websiteName}"
    alt="{$_('components.header.alt')}"
    class="d-block m-auto p-3"
    src="/api/websiteLogo" />
</header>
<!-- Header End -->

<script>
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  const session = getContext("session");
</script>
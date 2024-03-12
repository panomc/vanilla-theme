<!-- Footer -->
<nav class="navbar bg-light navbar-light">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img
        title="{$session.siteInfo.websiteName}"
        alt="{$_('components.header.alt')}"
        width="auto"
        height="24"
        src="/api/websiteLogo" />
    </a>
    <span class="navbar-text">
      {@html $_("footer.been-created-with", {
        values: {
          pano: `<a href="https://panomc.com" target="_blank" rel="noreferrer">Pano</a>`,
        },
      })}
    </span>
  </div>
</nav>

<!-- Footer End -->
<script>
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  const session = getContext("session");
</script>

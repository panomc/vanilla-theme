<!-- Footer -->
<div class="container">
  <div class="row justify-content-between text-muted py-3">
    <div class="col-auto">
      <p class="mb-0">© {$session.siteInfo.websiteName}</p>
    </div>
    <div class="col-auto">
      <p class="mb-0">
        {@html $_("footer.been-created-with", {values: {pano: `<a href="https://panocms.com" target="_blank" rel="noreferrer">Pano</a>`}})}
      </p>
    </div>
  </div>
</div>

<!-- Footer End -->
<script>
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  const session = getContext("session");
</script>

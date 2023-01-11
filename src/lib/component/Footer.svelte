<!-- Footer -->
<div class="container">
  <div class="row justify-content-between text-muted py-3">
    <div class="col-auto">
      <p class="mb-0">© {$session.siteInfo.websiteName}</p>
    </div>
    <div class="col-auto">
      <p class="mb-0">
        <a href="https://panocms.com" target="_blank">Pano</a> ile oluşturuldu.
      </p>
    </div>
  </div>
</div>

<!-- Footer End -->
<script>
  import { getContext } from "svelte";

  const session = getContext("session");
</script>

<!-- Online Admins Card -->
<div class="card">
  <h5 class="card-body">{$_("components.online-admins.online-admins")}</h5>
  <div class="card-body">
    <div class="row">
      {#each onlineAdmins as onlineAdmin, index (onlineAdmin)}
        <div class="col-3">
          <a href="/player/{onlineAdmin}">
            <img
              alt=""
              class="rounded"
              src="https://minotar.net/avatar/{onlineAdmin}"
              use:tooltip="{[onlineAdmin, { placement: 'bottom' }]}"
              width="24" />
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>
<!-- Online Admins Card End -->
<script>
  import { _ } from "svelte-i18n";
  import tooltip from "$lib/tooltip.util";

  export let onlineAdmins;
</script>

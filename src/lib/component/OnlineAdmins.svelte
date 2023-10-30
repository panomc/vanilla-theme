<!-- Online Admins -->
<div class="card bg-white text-center mb-3">
  <h5 class="card-header bg-warning text-white rounded-top">{$_("components.online-admins.online-admins")}</h5>
  <div class="card-body p-0">
    <div class="row">
      {#each onlineAdmins as onlineAdmin, index (onlineAdmin)}
        <div class="col-3">
          <a href="/player/{onlineAdmin}">
            <img
              alt=""
              class="rounded m-2"
              src="https://minotar.net/avatar/{onlineAdmin}"
              use:tooltip="{[onlineAdmin, { placement: 'bottom' }]}"
              width="24" />
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Online Admins End -->
<script>
  import { _ } from "svelte-i18n";
  import tooltip from "$lib/tooltip.util";

  export let onlineAdmins;
</script>

<!-- Online Admins -->
<div class="card text-center mb-3">
  <h5 class="card-header bg-sunflower text-white">Çevrimiçi Adminler</h5>
  <div class="card-body p-0">
    <div class="row">
      {#each onlineAdmins as onlineAdmin, index (onlineAdmin)}
        <div class="col-3">
          <a href="/player/{onlineAdmin}">
            <img
              alt=""
              class="rounded m-2"
              src="https://crafthead.net/avatar/{onlineAdmin}"
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
  import tooltip from "$lib/tooltip.util";

  export let onlineAdmins;
</script>

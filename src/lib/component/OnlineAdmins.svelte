<!-- Online Admins -->
<div class="card text-center mb-3">
  <h5 class="card-header bg-sunflower text-white">Çevrimiçi Adminler</h5>
  <div class="card-body p-0">
    <table class="table table-borderless mb-0">
      <tbody>
        <tr>
          {#each onlineAdmins as onlineAdmin, index (onlineAdmin)}
            <td>
              <a href="/player/{onlineAdmin}">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/{onlineAdmin}"
                  use:tooltip="{[onlineAdmin, { placement: 'bottom' }]}"
                  width="24" />
              </a>
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Online Admins End -->
<script>
  import tooltip from "$lib/tooltip.util";

  export let onlineAdmins;
</script>

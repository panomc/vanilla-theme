<Sidebar>
  <!-- Online Admins -->
  <div class="card text-center border-0">
    <h5 class="card-header bg-sunflower text-white">Çevrimiçi Adminler</h5>
    <div class="card-body p-0">
      <table class="table table-borderless mb-0">
        <tbody>
          <tr>
            <td>
              <a href="/player/Butlu">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/butlu"
                  use:tooltip="{['Butlu', { placement: 'bottom' }]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve', { placement: 'bottom' }]}"
                  width="24" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Online Admins End -->
</Sidebar>

<script>
  import Sidebar from "$lib/component/Sidebar.svelte";

  import tooltip from "$lib/tooltip.util";
</script>

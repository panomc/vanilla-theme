<Sidebar>
  <a href="/ticket/create" class="btn btn-secondary w-100 mb-3">
    <i class="fas fa-plus"></i>
    <br />Destek Talebi Oluştur
  </a>
  <!-- Online Admins -->
  <div class="card text-center mb-3">
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
              <a href="/player/kahverengi">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/kahverengi"
                  use:tooltip="{['kahverengi', { placement: 'bottom' }]}"
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

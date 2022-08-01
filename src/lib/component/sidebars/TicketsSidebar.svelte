<Sidebar>
  <a href="/ticket/create">
    <button class="btn btn-secondary w-100 mb-5">
      <i class="fas fa-plus"></i>
      <br />Destek Talebi Oluştur
    </button>
  </a>
  <!-- Latest Registers -->
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
                  use:tooltip="{['Butlu',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/kahverengi">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/kahverengi"
                  use:tooltip="{['kahverengi',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Latest Registers End -->
</Sidebar>

<script>
  import Sidebar from "$lib/component/Sidebar.svelte";

  import tooltip from "$lib/tooltip.util"
</script>

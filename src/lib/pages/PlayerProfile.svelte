<div class="row">
  <div class="col-lg-4 order-lg-first order-last">
    <div class="card mb-3">
      <div class="card-header bg-white">
        <img
          src="https://crafthead.net/avatar/Butlu"
          class="rounded d-block m-auto border border-5 border-secondary"
          use:tooltip="{['Çevrimiçi', { placement: 'bottom' }]}"
          width="64"
          height="64"
          alt="Butlu" />
        <img
          src="https://crafthead.net/avatar/Butlu"
          class="rounded d-block m-auto"
          width="64"
          height="64"
          alt="Butlu" />
        <div class="text-center">
          <h2 class="my-2">Butlu</h2>
          <div class="d-none text-muted">Kayıt: 01.01.2019</div>
          <div class="my-2">
            <div class="badge bg-light text-black rounded-pill">Oyuncu</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-8">
    <!-- Statistics -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">İstatistikler</h4>
        <table class="table table-borderless mb-0">
          <tbody>
            <tr>
              <td>Kayıt</td>
              <td>data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ parent }) {
    await parent();
  }
</script>

<script>
  import tooltip from "$lib/tooltip.util";
</script>

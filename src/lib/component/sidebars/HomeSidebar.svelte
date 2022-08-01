<Sidebar>
  <!-- Play Button -->
  <div class="mb-4">
    <button
      class="btn btn-sunflower bg-gradient w-100 py-4"
      type="button"
      on:click="{onCopyCommandTextClick}"
      use:tooltip="{[
        isCommandTextCopied ? 'Kopyalandı!' : 'Kopyala',
        { placement: 'bottom', hideOnClick: false },
      ]}">
      <h4 class="text-white text-uppercase mb-0">
        {ip}
      </h4>
    </button>
  </div>
  <!-- Play Button End -->

  <!-- Server Status -->
  <div class="card text-center border-0 mb-4">
    <h5 class="card-header bg-bittersweet text-white">Sunucu Durumu</h5>
    <div class="card-body">
      <div class="d-flex flex-row align-items-center justify-content-around">
        <div use:tooltip="{['play.serveradress.com', { placement: 'bottom' }]}">
          <i class="fas fa-check-circle fa-lg d-block text-mint py-3"></i>
          Çevrimiçi
        </div>
        <div use:tooltip="{['157 players are playing', { placement: 'bottom' }]}">
          <i class="fas fa-users fa-lg d-block text-secondary py-3"></i>
          16/32
        </div>
        <div use:tooltip="{['Game client version', { placement: 'bottom' }]}">
          <i class="fas fa-gamepad fa-lg d-block text-bittersweet py-3"></i>
          1.8.x
        </div>
      </div>
    </div>
  </div>
  <!-- Server Status End -->

  <!-- Latest Registers -->
  <div class="card text-center border-0 mb-4">
    <h5 class="card-header bg-secondary text-white">Son Kayıt Olanlar</h5>
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
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="/player/Kahverengi">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/kahverengi"
                  use:tooltip="{['kahverengi',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
                  width="24" />
              </a>
            </td>
            <td>
              <a href="/player/Steve">
                <img
                  alt=""
                  class="rounded"
                  src="https://crafthead.net/avatar/steve"
                  use:tooltip="{['Steve',{ placement: 'bottom' },]}"
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
  import copy from "copy-to-clipboard";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import tooltip from "$lib/tooltip.util";

  const ip = "oyna.ipadresi.com";
  let copyClickIDForCommandText = 0;
  let isCommandTextCopied = false;

  function onCopyCommandTextClick() {
    copyClickIDForCommandText++;

    const id = copyClickIDForCommandText;

    copy(ip);

    isCommandTextCopied = true;

    setTimeout(function () {
      if (copyClickIDForCommandText === id) {
        isCommandTextCopied = false;
      }
    }, 1000);
  }
</script>

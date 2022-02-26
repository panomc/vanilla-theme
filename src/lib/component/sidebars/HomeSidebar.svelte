<Sidebar>
  <!-- Play Button -->
  <div class="mb-5">
    <button
      class="btn btn-yellow w-100 py-3"
      type="button"
      on:click="{onCopyCommandTextClick}"
      use:tooltip="{[
        isCommandTextCopied ? 'Kopyalandı!' : 'Kopyala',
        { placement: 'bottom', hideOnClick: false },
      ]}">
      <h4 class="text-white text-uppercase mb-2">
        {ip}
      </h4>
    </button>
  </div>
  <!-- Play Button End -->

  <!-- Server Status -->
  <div class="card text-center border-0 mb-5">
    <h5 class="card-header bg-bittersweet text-white">Sunucu Durumu</h5>
    <div class="card-body">
      <div
        class="d-flex flex-row align-items-center justify-content-around
              text-muted">
        <div>
          <i class="fas fa-check-circle fa-lg mb-2 text-mint"></i>
          <br />
          Çevrimiçi
        </div>
        <div>
          <i class="fas fa-users fa-lg mb-2 text-secondary"></i>
          <br />
          16/32
        </div>
        <div>
          <i class="fas fa-gamepad fa-lg mb-2 text-bittersweet"></i>
          <br />
          1.8.x
        </div>
      </div>
    </div>
  </div>
  <!-- Server Status End -->

  <!-- Latest Registers -->
  <div class="card text-center border-0 mb-5">
    <h5 class="card-header bg-secondary text-white">Son Kayıt Olanlar</h5>
    <div class="card-body p-0">
      <table class="table table-borderless mb-0">
        <tbody>
          <tr>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/butlu"
                title="Butlu"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/kahverengi"
                title="Kahverengi"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
            </td>
            <td>
              <img
                alt=""
                class="rounded"
                data-placement="bottom"
                data-toggle="tooltip"
                src="https://minotar.net/avatar/steve"
                title="Steve"
                width="24" />
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

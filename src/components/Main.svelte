<!-- Main Block -->
<main class="container">
  <div class="row">
    <!-- Content -->
    <div class="col-lg-8">
      <!-- Alert -->
      <div
        class="alert alert-secondary alert-dismissible fade d-none shadow-sm
        shadow-sm"
        role="alert">
        <h4>Bu bir duyuru</h4>
        <strong>Hey!</strong>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti officia
        voluptates maxime itaque ut sed, officiis laudantium accusamus.
        <button
          aria-label="Close"
          class="close"
          data-dismiss="alert"
          type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Alert End -->

      <slot />
    </div>
    <!-- Content End -->

    <!-- Sidebar -->
    <aside class="col-lg-4 d-lg-block d-none">
      <!-- Play Button -->
      <div class="mb-5">
        <button
          class="btn btn-lg btn-block btn-yellow py-3 shadow"
          type="button">
          <h3 class="lead text-neon text-white font-weight-bolder">
            OYNA.IPADRESI.COM
          </h3>
          <small class="text-muted">IP adresini kopyalamak için tıkla!</small>
        </button>
      </div>
      <!-- Play Button End -->

      <!-- Server Status -->
      <div class="mb-5 text-center">
        <div class="card bg-bittersweet border-bittersweet border-lg shadow-sm">
          <div class="card-header text-white h5">Sunucu Durumu</div>
          <div class="bg-white">
            <div class="card-body">
              <div
                class="d-flex flex-row align-items-center justify-content-around
                text-muted">
                <div>
                  <i class="fas fa-check-circle fa-lg mb-2 text-success"></i>
                  <br />
                  Çevrimiçi
                </div>
                <div>
                  <i class="fas fa-users fa-lg mb-2 text-secondary"></i>
                  <br />
                  16/32
                </div>
                <div>
                  <i class="fas fa-gamepad fa-lg mb-2 text-warning"></i>
                  <br />
                  1.8.x
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Server Status End -->

      <!-- Latest Registers -->
      <div class="mb-5 text-center">
        <div class="card bg-secondary border-secondary border-lg shadow-sm">
          <div class="card-header text-white h5">Son Kayıt Olanlar</div>
          <div class="bg-white">
            <div class="card-body p-0">
              <table class="table">
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
        </div>
      </div>
      <!-- Latest Registers End -->

      <!-- Online Heads -->
      <div class="mb-5 text-center">
        <div class="card bg-primary border-primary border-lg shadow-sm">
          <div class="card-header text-white h5">Çevrimiçi Kafalar</div>
          <div class="bg-white">
            <div class="card-body p-0">
              <table class="table">
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
        </div>
      </div>
      <!-- Online Heads End -->

      <!-- Discord Widget -->
      <!-- <div class="mb-5 text-center d-md-block d-none">
          <iframe class="shadow" src="https://discordapp.com/widget?id=531572737660026888&theme=dark" width="300"
            height="500" allowtransparency="true" frameborder="0"></iframe>
        </div> -->
      <!-- Discord Widget End -->
    </aside>
    <!-- Sidebar End -->
  </div>
</main>
<!-- Main Block End -->

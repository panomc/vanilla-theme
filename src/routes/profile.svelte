<!-- Profile Page -->

<div class="card shadow">
  <div class="card-body">
    <!-- Profile Card -->
    <div class="card-body rounded border mb-3">
      <div class="row">
        <div class="col-lg-6 d-flex flex-row">
          <img
            src="/assets/img/head.png"
            class="mr-3 rounded float-left"
            width="64"
            height="64"
            alt="Profile Picture" />
          <div>
            <h5>Butlu</h5>
            <div class="text-muted">selimgokcek@outlook.com</div>
            <div class="d-none text-muted">Kayıt: 01.01.2019</div>
          </div>
        </div>
        <div class="col-lg-6">
          <button type="button" class="btn btn-danger float-right mt-lg-0 mt-3">
            Çıkış Yap
          </button>
        </div>
        <div class="col-lg-12">
          <hr />
          <ul class="nav nav-pills flex-lg-row flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#"> Profil </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> Ödemeler </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> Ayarlar </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Profile Category -->

    <!-- Statistics -->
    <div class="card mb-3">
      <div class="card-header">İstatistikler</div>
      <table class="table">
        <tbody>
          <tr>
            <td>Oynanış Süresi</td>
            <td>1 Saat</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Payments Category -->

    <!-- Active Items -->
    <div class="card mb-3">
      <div class="card-header">Aktif Ürünler</div>
      <table class="table">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Adet</th>
            <th>Süre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VIP+</td>
            <td>1</td>
            <td>25 Gün</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Purchase History (30 Days) -->
    <div class="card mb-3">
      <div class="card-header">Satın Alma Geçmişi (Son 30 Gün)</div>
      <table class="table">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Adet</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VIP+</td>
            <td>1</td>
            <td>01.01.01</td>
          </tr>
          <tr>
            <td>VIP+</td>
            <td>1</td>
            <td>01.01.01</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Settings Category -->
    <div class="row">
      <!-- Set New Password -->
      <div class="col-lg-6">
        <div class="card mb-lg-0 mb-3">
          <div class="card-header">Şifreni Değiştir</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="newPassowrd">* Yeni Şifre:</label>
                <input type="password" id="newPassowrd" class="form-control" />
              </div>
              <div class="form-group">
                <label for="newPassowrdRepeat">* Yeni Şifre Tekrarı:</label>
                <input
                  type="password"
                  id="newPassowrdRepeat"
                  class="form-control" />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-block btn-secondary">
                  Yeni Şifre Belirle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Set New Email -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">E-Postanı Değiştir</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="verifyPassword">Şifre:</label>
                <input
                  type="password"
                  id="verifyPassword"
                  class="form-control" />
              </div>
              <div class="form-group">
                <label for="setNewEmail">* Yeni E-Posta:</label>
                <input type="email" id="setNewEmail" class="form-control" />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-block btn-secondary">
                  Yeni E-Posta Belirle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

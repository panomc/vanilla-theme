<!-- Settings Category -->
<div class="container">
  <div class="accordion accordion-flush mb-3" id="accordionFlushExample">
    <div class="accordion-item">
      <h4 class="card-title">
        <button
          class="accordion-button collapsed h3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#settings-collapsePassword"
          aria-expanded="false"
          aria-controls="flush-collapseOne">
          Şifre Değiştir
        </button>
      </h4>
      <div
        id="settings-collapsePassword"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <!-- Set New Password -->
          <form>
            <div class="row align-items-end">
              <div class="col-4">
                <label for="newPassowrd">* Yeni Şifre:</label>
                <input type="password" id="newPassowrd" class="form-control" />
              </div>
              <div class="col-4">
                <label for="newPassowrdRepeat">* Yeni Şifre Tekrarı:</label>
                <input
                  type="password"
                  id="newPassowrdRepeat"
                  class="form-control" />
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-outline-secondary w-100">
                  Kaydet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h4 class="card-title">
        <button
          class="accordion-button collapsed h3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#settings-collapseEmail"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
          >E-Posta Değiştir
        </button>
      </h4>
      <div
        id="settings-collapseEmail"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <!-- Set New Password -->
          <form>
            <div class="row align-items-end">
              <div class="col-4">
                <label for="verifyPassword">Şifre:</label>
                <input
                  type="password"
                  id="verifyPassword"
                  class="form-control" />
              </div>
              <div class="col-4">
                <label for="setNewEmail">* Yeni E-Posta:</label>
                <input type="email" id="setNewEmail" class="form-control" />
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-outline-secondary w-100">
                  Kaydet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

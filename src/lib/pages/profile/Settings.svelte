<!-- Settings -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Ayarlar</h5>
    <div class="row mb-3">
      <label class="col-md-4 col-form-label" for="userPassword">
        Şifre Değiştir
      </label>
      <div class="col col-form-label">
        <a href="#" aria-describedby="userPassword"
          >Şifre sıfırlama bağlantısı gönder</a>
        <p class="text-dark mb-0">
          MAIL adresine şifreni değiştirme bağlantısı gönderildi.
        </p>
      </div>
    </div>

    <div class="row mb-3">
      <label class="col-md-4 col-form-label" for="userEmail">
        E-Posta Değiştir
      </label>
      <div class="col col-form-label">
        <div class="row">
          <div class="col-12">
            <a href="#" aria-describedby="userEmail">E-posta değiştir</a>
          </div>
          <div class="col">
            <input
              type="email"
              id="currentPassword"
              placeholder="Mevcut Şifre"
              class="form-control" />
          </div>
          <div class="col-auto">
            <button type="reset" class="btn btn-link link-danger">
              İptal
            </button>
            <button type="submit" class="btn btn-link">Devam Et</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="email"
              id="currentPassword"
              placeholder="Yeni E-Posta"
              class="form-control" />
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-link link-secondary">
              Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script context="module">
  import { setSidebar } from "$lib/Store.js";

  import ProfileSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/ProfileSidebar.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    await loadSidebar(event);
    setSidebar(ProfileSidebar);
  }
</script>

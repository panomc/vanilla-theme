<div class="col-lg-4 col-md-6 m-auto">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Şifreni Sıfırla</h3>
      <ErrorAlert error="{error}" />
      <SuccessAlert message="{message}" />
      <form>
        <p>
          Kayıt olduğun e-posta adresine bir sıfırlama bağlantısı gönderilecek.
          Lütfen e-posta adresini gir.
        </p>

        <div class="mb-3">
          <div class="form-group">
            <label for="forgettenPasswordEmail">* E-Posta:</label>
            <input
              type="email"
              placeholder="ahmo@mail.com"
              id="forgettenPasswordEmail"
              class="form-control" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          Sıfırlama E-Postası Gönder
        </button>
      </form>
    </div>
  </div>
</div>

<script>
  import ErrorAlert from "$lib/component/ErrorAlert.svelte";
  import SuccessAlert from "$lib/component/SuccessAlert.svelte";

  let error;
  let message;
</script>

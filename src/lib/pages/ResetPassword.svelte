<div class="col-lg-4 col-md-6 m-auto">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Şifre Sıfırla</h3>
      <ErrorAlert error="{error}" />
      <SuccessAlert message="{message}" />
      <form>
        <div class="mb-3">
          <label for="newPassword">* Yeni Şifre</label>
          <input type="password" id="newPassword" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="newPasswordRepeat">* Yeni Şifre Tekrarı</label>
          <input type="password" id="newPasswordRepeat" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary w-100">
          Şifremi Değiştir
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

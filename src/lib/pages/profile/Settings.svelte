<!-- Settings -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Ayarlar</h5>
    <div class="row mb-3">
      <label class="col-md-4 col-form-label" for="resetPassword">
        Şifre Değiştir
      </label>
      <div class="col col-form-label">
        <a
          href="javascript:void(0);"
          on:click="{sendResetPasswordLink}"
          aria-describedby="resetPassword validationResetPassword"
          class:disabled="{resetPasswordLoading}"
          class:is-invalid="{resetPasswordError}"
          >Şifre sıfırlama bağlantısı gönder</a>

        <div id="validationResetPassword" class="invalid-feedback">
          {resetPasswordError}
        </div>
        {#if resetPasswordSuccess}
          <p class="text-dark mb-0">
            E-posta adresine şifreni değiştirme bağlantısı gönderildi.
          </p>
        {/if}
      </div>
    </div>

    <div class="row mb-3">
      <label class="col-md-4 col-form-label" for="userEmail">
        E-Posta Değiştir
      </label>
      <div class="col col-form-label">
        <form
          on:submit|preventDefault="{() =>
            changingEmail2ndStep
              ? sendChangeEmailLink()
              : startChangingEmail2ndStep()}">
          <div class="row">
            {#if !changingEmail}
              <div class="col-12">
                {#if changingEmailSuccess}
                  <p class="text-dark mb-0">
                    {newEmail} adresine e-postanı değiştirme bağlantısı gönderildi.
                  </p>
                {:else}
                  <a
                    href="javascript:void(0);"
                    aria-describedby="userEmail"
                    on:click="{startChangingEmail}">E-posta değiştir</a>
                {/if}
              </div>
            {:else if changingEmail2ndStep}
              <div class="col">
                <input
                  type="email"
                  id="newEmail"
                  placeholder="Yeni E-Posta"
                  class="form-control"
                  aria-describedby="validationChangingEmail"
                  bind:value="{newEmail}"
                  class:is-invalid="{changingEmailError}"
                  autofocus />
                <div id="validationChangingEmail" class="invalid-feedback">
                  {changingEmailError}
                </div>
              </div>
              <div class="col-auto">
                <button
                  type="reset"
                  class="btn btn-link link-primary"
                  on:click="{stopChangingEmail2ndStep}">
                  Geri
                </button>
                <button
                  type="submit"
                  class="btn btn-link link-secondary"
                  class:disabled="{changingEmailLoading}">
                  Onayla
                </button>
              </div>
            {:else}
              <div class="col">
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Mevcut Şifre"
                  class="form-control"
                  bind:value="{currentPassword}"
                  autofocus />
              </div>
              <div class="col-auto">
                <button
                  type="reset"
                  class="btn btn-link link-danger"
                  on:click="{stopChangingEmail}">
                  İptal
                </button>
                <button type="submit" class="btn btn-link">Devam Et</button>
              </div>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
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

    return { sidebar: ProfileSidebar };
  }
</script>

<script>
  import { sendChangeEmail, sendResetPassword } from "$lib/services/profile.js";
  import { NETWORK_ERROR } from "$lib/api.util.js";

  let resetPasswordError;
  let resetPasswordLoading;
  let resetPasswordSuccess;

  let currentPassword;
  let newEmail;

  let changingEmail;
  let changingEmail2ndStep;

  let changingEmailError;
  let changingEmailLoading;
  let changingEmailSuccess;

  async function sendResetPasswordLink() {
    resetPasswordError = null;
    resetPasswordLoading = true;
    resetPasswordSuccess = false;

    await sendResetPassword()
      .then((body) => {
        resetPasswordLoading = false;

        if (body.result === "ok") {
          resetPasswordSuccess = true;
        } else {
          resetPasswordError = body.error || NETWORK_ERROR;
        }
      })
      .catch(() => {
        resetPasswordLoading = false;
        resetPasswordError = NETWORK_ERROR;
      });
  }

  async function sendChangeEmailLink() {
    changingEmailError = null;
    changingEmailLoading = true;
    changingEmailSuccess = false;

    await sendChangeEmail(currentPassword, newEmail)
      .then((body) => {
        changingEmailLoading = false;

        if (body.result === "ok") {
          changingEmail = false;
          changingEmail2ndStep = false;

          changingEmailSuccess = true;
        } else {
          changingEmailError = body.error || NETWORK_ERROR;
        }
      })
      .catch(() => {
        changingEmailLoading = false;

        changingEmailError = NETWORK_ERROR;
      });
  }

  function startChangingEmail() {
    changingEmail = true;
  }

  function startChangingEmail2ndStep() {
    changingEmail2ndStep = true;
  }

  function stopChangingEmail() {
    currentPassword = "";
    newEmail = "";

    changingEmail = false;
  }

  function stopChangingEmail2ndStep() {
    changingEmail2ndStep = false;
  }
</script>

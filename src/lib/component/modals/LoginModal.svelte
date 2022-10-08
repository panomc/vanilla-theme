<!-- Login Modal -->
<div class="modal fade" id="{dialogID}" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Giriş Yap</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        ></button>
      </div>

      <form on:submit|preventDefault="{onSubmit}">
        <div class="modal-body">
          <div class="mb-3">
            <ErrorAlert error="{$error}" />
          </div>
          <div class="mb-3">
            <label for="usernameOrEmail">Oyuncu Adı / E-Posta</label>
            <input
              type="text"
              id="usernameOrEmail"
              class="form-control"
              bind:value="{$data.usernameOrEmail}" />
          </div>
          <div class="mb-3">
            <label for="password">Şifre</label>
            <input
              type="password"
              id="password"
              class="form-control"
              bind:value="{$data.password}" />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="rememberMe" />
              <label class="form-check-label" for="rememberMe">
                Beni hatırla
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-primary w-100"
            class:disabled="{loading}"
            disabled="{loading}">
            Giriş Yap
          </button>
          <a
            href="/reset-password"
            class="btn btn-link w-100"
            on:click="{hide}">
            Şifreni mi unuttun?
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

<script context="module">
  import { writable, get } from "svelte/store";

  const dataDefault = {
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
    recaptcha: "",
  };

  const dialogID = "loginModal";
  const data = writable(dataDefault);
  const error = writable();

  let callback = () => {};
  let hideCallback = () => {};
  let modal;

  export function show() {
    error.set(null);

    data.set({ ...dataDefault });

    modal = new window.bootstrap.Modal(document.getElementById(dialogID), {
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  }

  export function hide() {
    hideCallback();

    modal.hide();
  }

  export function setCallback(newCallback) {
    callback = newCallback;
  }

  export function onHide(newCallback) {
    hideCallback = newCallback;
  }
</script>

<script>
  import { NETWORK_ERROR } from "$lib/api.util";

  import ErrorAlert from "$lib/component/ErrorAlert.svelte";

  import { getCredentials, sendLogin } from "$lib/services/auth.js";

  import { session } from "$lib/Store.js";

  let loading = false;

  async function onSubmit() {
    error.set(null);

    loading = true;

    await sendLogin(get(data))
      .then(async (body) => {
        if (body.result === "ok") {
          const CSRFToken = body.CSRFToken;

          await getCredentials(CSRFToken).then((body) => {
            session.update((data) => {
              data.user = {
                ...Object.keys(body)
                  .filter((key) => !["result"].includes(key))
                  .reduce((object, key) => {
                    object[key] = body[key];

                    return object;
                  }, {}),
              };

              data.CSRFToken = CSRFToken;

              return data;
            });

            loading = false;

            hide();

            callback(get(data));
          });
        } else {
          loading = false;

          error.set(body.result === "error" ? body.error : NETWORK_ERROR);
        }
      })
      .catch((err) => {
        console.log(err);
        loading = false;

        error.set(NETWORK_ERROR);
      });
  }
</script>

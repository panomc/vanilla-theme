<div class="col-lg-4 col-md-6 m-auto">
  <div class="card bg-white">
    <div class="card-body">
      <h3 class="card-title">Verify your account</h3>
      <img
        alt="Allay"
        src="https://cdn3.emoji.gg/emojis/8182-allay-dancing.gif" />
      <div class="d-block py-3">recaptcha</div>
      <ErrorAlert error="{error}" />
      <SuccessAlert message="{successMessage}" />
      <button
        class="btn btn-secondary w-100"
        class:disabled="{loading ||
          error === 'INVALID_LINK' ||
          successMessage !== null}"
        on:click="{verifyEmail}">Activate E-mail</button>
    </div>
  </div>
</div>

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ parent, url: { searchParams } }) {
    await parent();

    const token = searchParams.get("token") || "";

    return { token };
  }
</script>

<script>
  import { sendVerifyEmail } from "$lib/services/auth.js";
  import { NETWORK_ERROR } from "$lib/api.util.js";
  import ErrorAlert from "$lib/component/ErrorAlert.svelte";
  import SuccessAlert from "$lib/component/SuccessAlert.svelte";

  export let data;

  let loading;
  let error;
  let successMessage = null;

  async function verifyEmail() {
    error = null;
    successMessage = null;

    loading = true;

    await sendVerifyEmail(data.token)
      .then((body) => {
        if (body.result === "ok") {
          successMessage = "VALIDATION_SUCCESSFUL";
        } else {
          error = body.error;
        }
      })
      .catch(() => {
        error = NETWORK_ERROR;
      });
  }
</script>

<!-- Modals End -->
<style lang="scss" global>
  @import "../styles/style.scss";
</style>

<Header />

<Navbar />

<!-- Slider -->
<!-- <section class="container d-md-block d-none">
    <div class="carousel slide mb-5" data-ride="carousel" id="carouselId">
      <ol class="carousel-indicators">
        <li class="active" data-slide-to="0" data-target="#carouselId"></li>
        <li data-slide-to="1" data-target="#carouselId"></li>
        <li data-slide-to="2" data-target="#carouselId"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <img alt="First slide" class="rounded" height="400" src="/assets/img/slider-img-1.jpeg" width="100%">
          <div class="carousel-caption text-left d-none d-md-block">
            <h1 class="text-neon">Slider başlığı</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure adipisci blanditiis nostrum
              pariatur ipsum eum esse.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img alt="Second slide" class="rounded" height="400" src="/assets/img/slider-img-2.jpeg" width="100%">
          <div class="carousel-caption text-left d-none d-md-block">
            <h1 class="text-neon">Slider başlığı</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure adipisci blanditiis nostrum
              pariatur ipsum eum esse.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img alt="Third slide" class="rounded" height="400" src="/assets/img/slider-img-3.jpeg" width="100%">
          <div class="carousel-caption text-left d-none d-md-block">
            <h1 class="text-neon">Slider başlığı</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure adipisci blanditiis nostrum
              pariatur ipsum eum esse.</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" data-slide="prev" href="#carouselId" role="button">
        <span aria-hidden="true" class="carousel-control-prev-icon"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" data-slide="next" href="#carouselId" role="button">
        <span aria-hidden="true" class="carousel-control-next-icon"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </section> -->
<!-- Slider End -->
<Main>
  <slot />
</Main>

<Footer />

<!-- Modals Start-->
<LoginModal />

<ResetPasswordModal />

<RegisterModal />

<ForgottenPasswordModal />

<script>
  import { browser } from "$app/env";

  if (browser) {
    import("$lib/init.libs");
  }

  import Header from "$lib/component/Header.svelte";
  import Navbar from "$lib/component/Navbar.svelte";
  import Main from "$lib/component/Main.svelte";
  import Footer from "$lib/component/Footer.svelte";

  import LoginModal from "$lib/component/modals/LoginModal.svelte";
  import ForgottenPasswordModal from "$lib/component/modals/ForgottenPasswordModal.svelte";
  import RegisterModal from "$lib/component/modals/RegisterModal.svelte";
  import ResetPasswordModal from "$lib/component/modals/ResetPasswordModal.svelte";
</script>

<style lang="scss" global>
  @import "styles/style";
</style>

<link
  crossorigin="anonymous"
  href="https://use.fontawesome.com/releases/v5.7.2/css/solid.css"
  integrity="sha384-r/k8YTFqmlOaqRkZuSiE9trsrDXkh07mRaoGBMoDcmA58OHILZPsk29i2BsFng1B"
  rel="stylesheet" />
<link
  crossorigin="anonymous"
  href="https://use.fontawesome.com/releases/v5.7.2/css/fontawesome.css"
  integrity="sha384-4aon80D8rXCGx9ayDt85LbyUHeMWd3UiBaWliBlJ53yzm9hqN21A+o1pqoyK04h+"
  rel="stylesheet" />

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

<Main />

<Footer />

<!-- Modals Start-->
<LoginModal />

<ResetPasswordModal />

<RegisterModal />

<ForgottenPasswordModal />
<!-- Modals End -->


<script>
  import LoginModal from "./components/modals/LoginModal.svelte";
  import ResetPasswordModal from "./components/modals/ResetPasswordModal.svelte";
  import RegisterModal from "./components/modals/RegisterModal.svelte";
  import ForgottenPasswordModal from "./components/modals/ForgottenPasswordModal.svelte";

  import Footer from "./components/Footer.svelte";
  import Main from "./components/Main.svelte";
  import Header from "./components/Header.svelte";
  import Navbar from "./components/Navbar.svelte";
</script>

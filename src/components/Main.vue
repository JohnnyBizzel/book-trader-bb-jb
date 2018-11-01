<template>
<div>
  <Nav/>    
  <div class="slider">
    <ul class="slides">
      <li>
        <img src="https://cdn.glitch.com/938fcd45-d269-4b18-910f-5437d8830408%2Fbooktraderhero.jpeg?1540499576598"> <!-- random image -->
        <div class="caption center-align">
          <h3 class="gray-text darken-4">Exchange Old Books</h3>
          <h5 class="gray-text darken-4">When you finish reading a book, don't just leave it on the shelf. Swap it for another.</h5>
        </div>
      </li>
      <li>
        <img src="https://cdn.glitch.com/938fcd45-d269-4b18-910f-5437d8830408%2Fimage.png?1541008312377"> <!-- random image -->
        <div class="caption left-align">
          <h3 class="gray-text darken-4">The More The Merrier</h3>
          <h5 class="gray-text darken-4">The more people there are in the book exchange, the better. Invite your friends to join.</h5>
        </div>
      </li>
      <li>
        <img src="https://cdn.glitch.com/938fcd45-d269-4b18-910f-5437d8830408%2Fbooks1.jpeg?1541044022070"> <!-- random image -->
        <div class="caption right-align">
          <h3 class="gray-text darken-4">Find Like Minded People</h3>
          <h5 class="gray-text darken-4">Leave comments and ratings about your books. Start a discussion.</h5>
        </div>
      </li>
    </ul>
  </div>
  <section class="callouts section section-icons grey lighten-4 center">
    <div class="container">
      <div class="row">
        <div class="col s12 m4">
          <div class="card-panel">
            <i class="material-icons large brown-text">
              import_contacts
            </i>
            <h4>How it works</h4>
            <p>Register to start trading your books with other users in your area.</p>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card-panel">
            <i class="material-icons large brown-text">
              swap_calls
            </i>
            <h4>Get involved</h4>
            <p>Be part of a growing community of avid readers. Start connecting.</p>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card-panel">
            <i class="material-icons large brown-text">
              library_books
            </i>
            <h4>Get reading</h4>
            <p>Improve your knowledge. Reduce stress. Stimulate your brain.</p>

          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="popular" class="section section-popular scrollspy">
    <div class="container">
      <div class="row">
        <h4 class="center"><span class="brown-text">Newest</span> additions</h4>
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="img/resort1.jpg" alt="">
              <span class="card-title white-text">Jamaica</span>
            </div>
            <div class="card-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, molestiae.
            </div>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="img/resort2.jpg" alt="">
            </div>
            <div class="card-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, molestiae.
            </div>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="img/resort3.jpg" alt="">
              <span class="card-title white-text">Florida</span>
            </div>
            <div class="card-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, molestiae.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="gallery" class="section section-gallery scrollspy">
    <div class="container">
      <h4 class="center">
        <span class="teal-text">Book </span> Gallery
      </h4>
      <div class="row">
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books, travel" alt="">
        </div>
      </div>

      <div class="row">
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books, travel" alt="">
        </div>
      </div>

      <div class="row">
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
        <div class="col s12 m3">
          <img class="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?books" alt="">
        </div>
      </div>
    </div>
  </section>

  <section class="section section-search brown lighten-3 white-text center scrollspy" id="search">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h3>Search (with autocomplete) Books</h3>
          <div class="input-field">
            <input type="text" class="white blue-grey-text autocomplete" id="autocomplete-input" placeholder="Aruba, Cancun, etc..">
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="about" class="section section-contact scrollspy">
    <div class="container">
      <div class="row">
        <div class="col s12 m6">
          <div class="card-panel grey lighten-3">
            <h5>About Us</h5>
            <p>We are a small team of developers learning the newest technologies through FCC(Free Code Camp). This project
              was build with VueJS on the front end and NodeJS on the backend.</p>
            <p>Our passion for technology and reading inspired us to create this project. If you have any questions about building
              apps for your business, please don't hesitate to get in touch.</p>
            <p>Fill out our form. We want to hear from you!</p>
          </div>
        </div>
        <div class="col s12 m6">
          <div class="card-panel grey lighten-3">
            <h5>Please fill out this form</h5>
            <div class="input-field">
              <input type="text" placeholder="Name">
            </div>
            <div class="input-field">
              <input type="text" placeholder="Email">
            </div>
            <div class="input-field">
              <textarea id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Message</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section section-follow brown lighten-3 white-text center">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h4 class="white-text text-lighten-3">Follow Us</h4>
          <p>Follow us on social media for special offers</p>
          <a href="#" class="white-text text-darken-1"><i class="fab fa-facebook fa-3x"></i></a>
          <a href="#" class="white-text text-darken-1"><i class="fab fa-twitter fa-3x"></i></a>
          <a href="#" class="white-text text-darken-1"><i class="fab fa-instagram fa-3x"></i></a>
          <a href="#" class="white-text text-darken-1"><i class="fab fa-linkedin fa-3x"></i></a>
        </div>
      </div>
    </div>
  </section>
</div>  
</template>

<script>
import Nav from './Nav';
export default {
  components: {
      Nav
  },
  mounted() {
    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {
      indicators: false,
      duration: 400
    });
  },
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .callouts {
    padding-top: 2rem;
  }
  
  .section-search input {
  padding: 5px !important;
  font-size: 18px !important;
  width: 90% !important;
  border: #f4f4f4 3px solid !important;
}

.fa-twitter, .fa-instagram, .fa-linkedin {
  margin-left: 1em !important;
}

.description {
  text-indent: 1em;
  text-align: justify;
  line-height: 1.5em;
}

.description::first-letter {
  font-size: 3.3em;
}

.book-detail, .left {
  padding: 30px;
  font-size: 0.8em;
}

</style>

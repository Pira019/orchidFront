<template> 
    <div class="bg-success">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul class="navbar-nav navbar-right">
      <li class="nav-item border-start border-end border-secondary px-2 py-2">
        <a class="nav-link" href="#">Études</a>
      </li>
      <li class="nav-item border-end border-secondary px-2 py-2">
        <a class="nav-link" href="#">Qui sommes-nous</a>
      </li>
      <li class="nav-item dropdown  border-end border-secondary px-2 py-2">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Information
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item border-end border-secondary px-2 py-2">
        <a class="nav-link" href="#">Faq</a>
      </li>

      <li class="nav-item px-2 py-2">
        <a class="nav-link" href="#">Contact</a>
      </li>

      <li class="nav-item py-2">
        <Button></Button>
      </li>
    </ul>
   
  </div>
</nav>
</div>
    </div>
</template>

<script>
import Button from './Button.vue';
 

export default {
    name: "Menu",
    components: { Button }
}
</script>

<style scoped>

.nav-link{
 position: relative;
} 
.nav-link::after{
  content: '';
  opacity: 0;
  transition: all 0.2s;
  height: 1.5px;
  width: 100%;
  position:absolute;
  background-color: white;
  bottom: 0;
  left: 0;
}
.nav-link:hover:after{
  opacity: 1;
}
</style>
 
<template> 
    <div class="bg-success">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark"> 
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul class="navbar-nav">
      <li class="nav-item px-2 py-2">
        <a class="nav-link" href="#">Études</a>
      </li>
      <li class="nav-item   px-2 py-2">
        <a class="nav-link" href="#">Qui sommes-nous</a>
      </li>
     <!-- <li class="nav-item dropdown px-2 py-2">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Information
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>-->
      <li class="nav-item   px-2 py-2">
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
 
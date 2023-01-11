<template>
<div class="accordion accordion-flush" id="accordionExample">
  <div class="accordion-item" v-for="(faq,index) in faqs" :key="index">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button text-success " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       <strong>{{faq.question}}</strong>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        {{faq.answer}}    </div>
    </div>
  </div> 
</div>
</template>

<script> 
export default{
    props :['faqs'],
  data () {
    return {
    }
  },
    name:'FaqComponent'
}

</script>
 
 
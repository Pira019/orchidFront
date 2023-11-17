<template>
<div class="accordion accordion-flush" id="accordionExample">
  <div class="accordion-item" v-for="(faq,index) in faqs" :key="index">
    <h2 class="accordion-header" :id="'heading'+index">
      <button class="accordion-button text-success" :class="index>0 ?'collapsed' : ''" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+index" :aria-expanded="index==0 ? true : false" :aria-controls="'collapse'+index">
       <strong>{{faq.question}}</strong>
      </button>
    </h2>
    <div :id="'collapse'+index" class="accordion-collapse collapse" :class="index==0 && 'show' "  :aria-labelledby="'heading'+index" data-bs-parent="#accordionExample" >
      <div class="accordion-body">
        {{replacePattern(faq.answer)}}    
      </div>
        
    </div>
  </div> 
</div>
</template>

<script> 
export default{
  methods: {
    //replace patern :country
    replacePattern(word){
      return word.replace(":country",this.value);
    }
  },
    props :['faqs'],
  data () {
    return {
      value:['RD CONGO',"Canada","Maroc"]
    }
  },
    name:'FaqComponent'
}

</script>
 
 
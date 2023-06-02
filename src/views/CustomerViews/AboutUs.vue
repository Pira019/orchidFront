<template>
 <div class="container">
  <div class="text-center">
    <h1 class="text-success">Qui sommes nous ?</h1>
    <p class="lead"><span class="fw-bolder">Orchid campus</span>, L'avenir en commun</p>
  </div>
    
  <section>
    <div class="row mt-5 mb-5">
      <div class="col-lg-5 mb-md-3 order-2 order-lg-1"> 
        <img :src="imgHistory_" alt="notre-histoire-img" class="img-fluid rounded img-thumbnail">
      </div>
     <div class="col-lg-7 md-mt-5 order-lg-2">
      <h3 class=" text-success mb-3">Notre histoire</h3>
      <p>
        Chez <mark>Orchid Campus</mark>, nous comprenons les défis auxquels sont confrontés les étudiants internationaux qui souhaitent étudier à l'étranger. C'est pourquoi nous nous sommes engagés à rendre cette expérience aussi fluide et accessible que possible. Nous sommes une équipe passionnée d'anciens étudiants étrangers, ayant traversé les mêmes épreuves et les mêmes incertitudes. Aujourd'hui, nous mettons nos connaissances et notre expertise à votre service, afin de vous aider à réaliser vos rêves d'études à l'étranger.
      </p>
     </div>
    </div> 
  </section>

  <section>
    <div class="row mt-5 mb-5">
      <div class="col-lg-7 mb-md-3 "> 
        <h3 class=" text-success mb-3">Notre objectif</h3>
      <p>
        Notre objectif principal est de vous offrir des tutoriels personnalisés, spécifiquement adaptés à votre université et à votre pays de destination. Nous comprenons que chaque établissement d'enseignement supérieur et chaque pays a ses propres exigences et procédures administratives. C'est pourquoi nous avons développé des ressources complètes et détaillées, qui vous guideront à chaque étape de votre parcours. Que vous ayez besoin d'aide pour remplir des formulaires, comprendre les procédures de demande de visa, choisir vos cours ou vous intégrer dans votre nouvel environnement, nous sommes là pour vous soutenir.
      </p>
      <p>Nous croyons en la personnalisation. Nous comprenons que chaque étudiant est unique et a des besoins différents. C'est pourquoi nous nous efforçons de fournir des tutoriels adaptés à votre niveau de compétence, à vos objectifs spécifiques et aux exigences de l'université et du pays où vous souhaitez étudier. Nous croyons en l'apprentissage interactif et en l'échange d'idées pour favoriser votre réussite académique.</p>
      </div>
     <div class="col-lg-5 md-mt-5">    
      <img :src="imgGoal_" alt="notre-objectif-img" class="img-fluid rounded img-thumbnail">
     </div>
    </div> 
  </section>

    <section>
      <div class="row mt-5 mb-5">
      <div class="col-lg-5 mb-md-3 order-2 order-lg-1"> 
        <img :src="imgOurTeam_" alt="notre-histoire-img" class="img-fluid rounded img-thumbnail">
      </div>
     <div class="col-lg-7 md-mt-5 order-lg-2">
      <h3 class=" text-success mb-3">Notre équipe</h3>
      <p>L'équipe d'<mark>Orchid Campus</mark> est composée des anciens étudiants et bien informés, qui ont une connaissance approfondie des différentes universités et pays populaires pour les étudiants internationaux. Nous sommes constamment à jour avec les dernières réglementations et politiques d'immigration pour études, ainsi qu'avec les meilleures pratiques académiques dans différentes institutions. Notre objectif est de vous fournir des informations précises et à jour, afin que vous puissiez prendre des décisions éclairées concernant vos études à l'étranger.</p>
     
     </div>
    </div> 
    </section>

    <!--Notre équipe-->
    <section>
      <div>
        <h3 class="text-success mb-3">La marque Orchid campus</h3>
        <p>Ce qui distingue Orchid Campus, c'est notre engagement envers des prix abordables. Nous savons que les frais liés aux études à l'étranger peuvent rapidement s'accumuler, et nous voulons vous offrir des services de haute qualité à un prix accessible. Nous croyons que chaque étudiant mérite d'avoir accès à un soutien et à des conseils de qualité, sans que cela ne soit un fardeau financier supplémentaire.</p>
        <p>Nous sommes ravis de faire partie de votre voyage éducatif et de vous accompagner vers la réussite. Laissez Orchid Campus être votre guide fiable et votre partenaire de confiance pour une expérience d'études à l'étranger sans souci. N'hésitez pas à nous contacter pour toute question ou demande d'information. Nous sommes là pour vous aider à réaliser vos rêves académiques internationaux</p>     
      </div>
       
    </section>
 </div>
</template>
<script>

import imgHistory from "@/assets/img/imgOurHistory.jpg";
import imgGoal from "@/assets/img/imgOurGoal.jpg";
import imgOurTeam from "@/assets/img/imgOurTeam.jpg";
export default{
  watch: {
  },
  data () {
    return {
      imgHistory_ : imgHistory,
      imgGoal_ : imgGoal,
      imgOurTeam_ : imgOurTeam,
    }
  },
    name:'AboutUs'
}
</script>
<template>
    <form :class="[v$.$error ? 'was-validated' : '']" novalidate v-on:submit.prevent="onsubmit">
    <div>  
        <div class="row mb-3 no-gutter">
            <div class="col">  
                <input type="text" class="form-control rounded-0" v-model.trim="state.user.firstName" required placeholder="Prénom*">
                <div class="invalid-feedback" v-if="v$.user.firstName.$error">
                    <span v-for="(error,index) of v$.user.firstName.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>                
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" v-model="state.user.name" placeholder="Nom*" required>
                <div class="invalid-feedback" v-if="v$.user.name.$error">
                    <span v-for="(error,index) of v$.user.name.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>  
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0" required v-model="state.user.sex">
                    <option selected disabled>Sexe ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
                <div class="invalid-feedback" v-if="v$.user.sex.$error">
                    <span v-for="(error,index) of v$.user.sex.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" placeholder="Date de naissance" onfocus="(this.type='date')" onblur="this.type='text'">
            </div>
        </div>     
        
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0" required v-model="state.user.residenceContry">
                    <option selected>Pays de résidence ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
                <div class="invalid-feedback" v-if="v$.user.residenceContry.$error">
                    <span v-for="(error,index) of v$.user.residenceContry.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>
            <div class="col">
                <select class="form-select form-control rounded-0" v-model="state.user.citezenship" required>
                    <option selected>Pays de la citoyenneté ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
                <div class="invalid-feedback" v-if="v$.user.citezenship.$error">
                    <span v-for="(error,index) of v$.user.citezenship.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  class="form-control rounded-0"  v-model="state.user.phone" placeholder="Télephone">
               <!-- <div class="invalid-feedback" v-if="v$.user.phone.$error">
                    <span v-for="(error,index) of v$.user.phone.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> -->
            </div>            
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="email" class="form-control rounded-0"  placeholder="Email" required v-model="state.user.email">
                <div class="invalid-feedback" v-if="v$.user.email.$error">
                    <span v-for="(error,index) of v$.user.email.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>            
        </div>

        <div class="row mb-3 no-gutter">
            <div class="col input-group">
                <input type="password" class="form-control rounded-0" placeholder="Mot de passe"> 
            </div>
            <div class="col">
                <input type="password" class="form-control rounded-0" placeholder="Confirmer le mot de passe">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <SubmitBtnComponent @click="submitForm" class="btn btn-success">Créer mon compte</SubmitBtnComponent>
            </div>
        </div>
    
    </div>
</form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import {required,email} from '@vuelidate/validators' 
import useVuelidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { useStore } from 'vuex'; 

export default{
    setup(){
    const state = reactive({
        user: computed(()=>useStore().state.user.User),
    }) 
    const rules = computed(()=> {
     return {         
           user:{ 
            name : {required,email},
            firstName : {required},
            sex : {required},
            residenceContry : {required},
            sex : {required},
            citezenship : {required}, 
            email : {required,email},
            
         }
     
    }})
    const v$ = useVuelidate(rules,state)
    return{
        state,
        v$
    }
}, 
 
    methods:{
        submitForm(){  
            this.v$.$validate()            
            console.log(this.v$.user.name.$error)     
             console.log(this.v$.user.name.$errors[0].$message)
        }
    },
    name: "RegisterForm",
    components: { SubmitBtnComponent }
}
</script>
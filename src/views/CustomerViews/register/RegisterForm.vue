<template>
    <form novalidate v-on:submit.prevent="onsubmit">
    <div>  
        <div class="row mb-3 no-gutter">
            <div class="col">  
                <input type="text" class="form-control rounded-0" autocomplete="family-name" name="firstName" :class="[v$.user.firstName.$error ? 'is-invalid' : '']" v-model.trim="state.user.firstName" placeholder="Prénom*" title="Prénom*" required>
                <div class="invalid-feedback" v-if="v$.user.firstName.$error">
                    <span v-for="(error,index) of v$.user.firstName.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>                
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" name="name" autocomplete="family-name" :class="[v$.user.name.$error ? 'is-invalid' : '']" v-model="state.user.name" placeholder="Nom*" title="Nom*"  required>
                <div class="invalid-feedback" v-if="v$.user.name.$error">
                    <span v-for="(error,index) of v$.user.name.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>  
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0" autocomplete="sex" name="sex" :class="[v$.user.sex.$error ? 'is-invalid' : '']" v-model="state.user.sex" title="Sexe" required>
                    <option selected value="">Sexe ...</option>
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
                <input type="text" class="form-control rounded-0" placeholder="Date de naissance" onfocus="(this.type='date')" onblur="this.type='text'" title="Date de naissance">
            </div>
        </div>     
        
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0" name="country" autocomplete="coutry"  :class="[v$.user.residenceContry.$error ? 'is-invalid' : '']"  v-model="state.user.residenceContry" title="Pays de résidence *" required>
                    <option selected value="">Pays de résidence ...</option>
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
                <select class="form-select form-control rounded-0"   name="citezenship" autocomplete="coutry" :class="[v$.user.citezenship.$error ? 'is-invalid' : '']" title="Pays de citoyenneté *" v-model="state.user.citezenship" required>
                    <option selected value="">Pays de la citoyenneté ...</option>
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
                <input type="tel" :class="[v$.user.phone.$error ? 'is-invalid' : '']" name="tel" autocomplete="tel" title="Numéro tél" class="form-control rounded-0"  v-model="state.user.phone" placeholder="Télephone">
               <!-- <div class="invalid-feedback" v-if="v$.user.phone.$error">
                    <span v-for="(error,index) of v$.user.phone.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> -->
            </div>            
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="email" class="form-control rounded-0"  autocomplete="email" name="email" placeholder="Email*"  title="Email*" :class="[v$.user.email.$error ? 'is-invalid' : '']" v-model="state.user.email" required>
                <div class="invalid-feedback" v-if="v$.user.email.$error">
                    <span v-for="(error,index) of v$.user.email.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>            
        </div>

        <div class="row mb-3">
            <div class="col input-group">
                <input type="password" class="form-control rounded-0" :class="[v$.user.password.password.$error ? 'is-invalid' : '']" v-model="state.user.password.password" placeholder="Mot de passe *" title="Mot de passe *" required> 
                <div class="invalid-feedback" v-if="v$.user.password.password.$error">
                    <span v-for="(error,index) of v$.user.password.password.$errors" :key="index" >
                    {{ error.$message}} 
                    </span>
                 </div> 
            </div>
            <div class="col">
                <input type="password" class="form-control rounded-0" required :class="[v$.user.password.confirm.$error ? 'is-invalid' : '']" v-model="state.user.password.confirm" placeholder="Confirmer le mot de passe *" title="Confirmer le mot de passe *">
                <div class="invalid-feedback" v-if="v$.user.password.confirm.$error">
                    <span v-for="(error,index) of v$.user.password.confirm.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
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
import {required,email,sameAs} from '@vuelidate/validators' 
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
            name : {required},
            firstName : {required},
            sex : {required},
            residenceContry : {required},
            sex : {required},
            citezenship : {required}, 
            email : {required,email},
            phone : {},
            password : {
                password:{required},
                confirm : {required,sameAs : sameAs(state.user.password.password)}
            }
            
         }
     
    }})
    const v$ = useVuelidate(rules,state)
    console.log(rules)
    return{
        state,
        v$
    }
}, 
 
    methods:{
        submitForm(){  
            this.v$.$validate()            
       //    console.log(this.v$.user.password.confirm.$errors[0].$message)     
           //  console.log(this.v$.user.firstName.$errors[0].$message)
        }
    },
    name: "RegisterForm",
    components: { SubmitBtnComponent }
}
</script>
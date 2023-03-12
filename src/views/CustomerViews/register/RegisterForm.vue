<template>
    <form novalidate v-on:submit.prevent="onsubmit">
    <div>  
        <div class="row mb-3 no-gutter">
            <div class="col">   
                <input type="text" class="form-control rounded-0" autocomplete="family-name" name="first_name" :class="[v$.user.first_name.$error ? 'is-invalid' : '']" v-model.trim="state.user.first_name" placeholder="Prénom*" title="Prénom*" required>
                <div class="invalid-feedback" v-if="v$.user.first_name.$error">
                    <span v-for="(error,index) of v$.user.first_name.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>                
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" name="name" autocomplete="family-name" :class="[v$.user.name.$error ? 'is-invalid' : '']" v-model.trim="state.user.name" placeholder="Nom*" title="Nom*"  required>
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
                <input type="date" class="form-control rounded-0" placeholder="Date de naissance" onfocus="(this.type='date')" onblur="this.type='text'" v-model="state.user.birth_date"  title="Date de naissance">
            </div>
        </div>     
        
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0" name="country" autocomplete="coutry"  :class="[v$.user.residenceContry.$error ? 'is-invalid' : '']"  v-model="state.user.residenceContry" title="Pays de résidence *" >
                    <option selected value="">Pays de résidence ...</option>
                    <option value="">Masculin</option>
                    <option value="">Féminin</option> 
                </select> 
                <div class="invalid-feedback" v-if="v$.user.residenceContry.$error">
                    <span v-for="(error,index) of v$.user.residenceContry.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>
            <div class="col">
                <select class="form-select form-control rounded-0"   name="citezenship" autocomplete="coutry" :class="[v$.user.citezenship.$error ? 'is-invalid' : '']" title="Pays de citoyenneté *" v-model="state.user.citezenship" >
                    <option selected value="">Pays de la citoyenneté ...</option>
                    <option value="">Masculin</option>
                    <option value="">Féminin</option> 
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
                <input type="tel" :class="[v$.user.phone.$error ? 'is-invalid' : '']" name="tel" autocomplete="tel" title="Numéro téléphone" class="form-control rounded-0"  v-model.trim="state.user.phone" placeholder="Téléphone">
                 <div class="invalid-feedback" v-if="v$.user.phone.$error">
                    <span v-for="(error,index) of v$.user.phone.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div>
            </div>            
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="email" class="form-control rounded-0"  autocomplete="email" name="email" placeholder="Email*"  title="Email*" :class="[v$.user.email.$error ? 'is-invalid' : '']" v-model.lazy="state.user.email" required>
                <div class="invalid-feedback" v-if="v$.user.email.$error">
                    <span v-for="(error,index) of v$.user.email.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>            
        </div>

        <div class="row mb-3 input-group">
            <div class="col ">
                <input type="password" class="form-control rounded-0" :class="[v$.user.password.$error ? 'is-invalid' : '']" v-model="state.user.password" placeholder="Mot de passe *" title="Mot de passe *" required> 
                <div class="invalid-feedback" v-if="v$.user.password.$error">
                    <span v-for="(error,index) of v$.user.password.$errors" :key="index" >
                    {{ error.$message}} 
                    </span>
                 </div> 
            </div>
            <div class="col">
                <input type="password" class="form-control rounded-0" required :class="[v$.user.password_confirmation.$error ? 'is-invalid' : '']" v-model="state.user.password_confirmation" placeholder="Confirmer le mot de passe *" title="Confirmer le mot de passe *">
                <div class="invalid-feedback" v-if="v$.user.password_confirmation.$error">
                    <span v-for="(error,index) of v$.user.password_confirmation.$errors" :key="index" >
                    {{ error.$message }}
                    </span>
                 </div> 
            </div>
        </div>
        <div class="row">
            <div class="col">
                <SubmitBtnComponent :loading="loading" @click="submitForm" data-toggle="modal" :data-target="'#' + modal" class="btn btn-success">Créer mon compte</SubmitBtnComponent> 
            </div>
        </div>
    <ModalComponent :modal="modal"></ModalComponent>
    </div>
</form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import {required,email,sameAs} from '@vuelidate/validators' 
import useVuelidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { mapActions, mapGetters, mapState, useStore } from 'vuex';  
import ModalComponent from '@/components/modal/ModalComponent.vue';
import { ModalTypeEnum } from '@/enums';

export default{
    setup(){
    const state = reactive({
        user: computed(()=>useStore().state.user.User),
    }) 
    const rules = computed(()=> {
     return {         
           user:{ 
            name : {required},
            first_name : {required},
            sex : {required},
            birth_date:{},
            residenceContry : {},
            sex : {required},
            citezenship : {}, 
            email : {required,email},
            phone : {}, 
            password:{required},
            password_confirmation : {required,sameAs : sameAs(state.user.password)}
            }
            
         }
     
    });

    const v$ = useVuelidate(rules,state) 
    return{
        state,
        v$
    }
}, 
    data(){
        return {
            loading : false,
            modal : ''
        }
    },
 
    computed:{  
 
        
    },
    methods:{
         submitForm(){  
            //this.loading =true;
            this.v$.$validate()
            if(!this.v$.$error){   
                this.modal = ModalTypeEnum.REGISTER             
               /* this.$store.dispatch('user/saveUser', this.state.user);
                this.loading = false;
                return true;
              //console.log(this.state.user)*/
            } 
        }
        
        },
    name: "RegisterForm",
    components: { SubmitBtnComponent, ModalComponent }
}
</script>
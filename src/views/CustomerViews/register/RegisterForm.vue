<template>
    <form novalidate v-on:submit.prevent="onsubmit" ref="form">
        <div>
            <div class="row mb-3 no-gutter">
                <div class="col">
                    <input type="text" class="form-control rounded-0" maxlength="255" autocomplete="family-name"
                        name="first_name" :class="[v$.user.first_name.$error ? 'is-invalid' : '']"
                        v-model.trim="state.user.first_name" placeholder="Prénom*" title="Prénom*" required>
                    <div class="invalid-feedback" v-if="v$.user.first_name.$error">
                        <span v-for="(error, index) of v$.user.first_name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col">
                    <input type="text" class="form-control rounded-0" name="name" maxlength="255" autocomplete="family-name"
                        :class="[v$.user.name.$error ? 'is-invalid' : '']" v-model.trim="state.user.name" placeholder="Nom*"
                        title="Nom*" required>
                    <div class="invalid-feedback" v-if="v$.user.name.$error">
                        <span v-for="(error, index) of v$.user.name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <select class="form-select form-control rounded-0" autocomplete="sex" name="sex"
                        :class="[v$.user.sex.$error ? 'is-invalid' : '']" v-model="state.user.sex" title="Sexe*" required>
                        <option selected value="">Sexe ...</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.sex.$error">
                        <span v-for="(error, index) of v$.user.sex.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col">
                    <input type="text" class="form-control rounded-0" placeholder="Date de naissance *" :class="[v$.user.birth_date.$error || invalidData?.birth_date ? 'is-invalid' : '']"
                        onfocus="(this.type='date')" onblur="this.type='text'" v-model="state.user.birth_date"
                        title="Date de naissance*">
                    <div class="invalid-feedback" v-if="v$.user.birth_date.$error">
                        <span v-for="(error, index) of v$.user.birth_date.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <select class="form-select form-control rounded-0" name="country" autocomplete="on"
                        :class="[v$.user.residence_contry.$error ? 'is-invalid' : '']" v-model="state.user.residence_contry"
                        title="Pays de résidence *">
                        <option selected value="">Pays de résidence *...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.residence_contry.$error">
                        <span v-for="(error, index) of v$.user.residence_contry.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col">
                    <select class="form-select form-control rounded-0" name="citizenship" autocomplete="on"
                        :class="[v$.user.citizenship.$error ? 'is-invalid' : '']" title="Pays de citoyenneté *"
                        v-model="state.user.citizenship">
                        <option selected value="">Pays de la citoyenneté *...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.citizenship.$error">
                        <span v-for="(error, index) of v$.user.citizenship.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <input type="tel" :class="[v$.user.phone.$error ? 'is-invalid' : '']" name="tel" autocomplete="tel" v-mask="'(###) ###-###-###'"
                        title="Numéro téléphone" class="form-control rounded-0" v-model.trim="state.user.phone"
                        placeholder="Téléphone">
                    <div class="invalid-feedback" v-if="v$.user.phone.$error">
                        <span v-for="(error, index) of v$.user.phone.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <input type="email" class="form-control rounded-0" autocomplete="email" name="email"
                        placeholder="Email*" title="Email*" :class="[v$.user.email.$error || invalidData?.email ? 'is-invalid' : '']"
                        v-model.lazy="state.user.email" required>
                    <div class="invalid-feedback" v-if="v$.user.email.$error">
                        <span v-for="(error, index) of v$.user.email.$errors" :key="index" class="d-block">
                            {{ error.$message}}
                        </span> 
                    </div>                    
                </div>
            </div>

            <div class="row mb-3 input-group">
                <div class="col ">
                    <input type="password" class="form-control rounded-0" autocomplete="off"
                        :class="[v$.user.password.$error ? 'is-invalid' : '']" v-model="state.user.password"
                        placeholder="Mot de passe *" title="Mot de passe *" required>
                    <div class="invalid-feedback" v-if="v$.user.password.$error">
                        <span v-for="(error, index) of v$.user.password.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col">
                    <input type="password" class="form-control rounded-0" required autocomplete="off"
                        :class="[v$.user.password_confirmation.$error ? 'is-invalid' : '']"
                        v-model="state.user.password_confirmation" placeholder="Confirmer le mot de passe *"
                        title="Confirmer le mot de passe *">
                    <div class="invalid-feedback" v-if="v$.user.password_confirmation.$error">
                        <span v-for="(error, index) of v$.user.password_confirmation.$errors" :key="index" class="d-block">
                            {{ error.$message }}
                        </span><br>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <SubmitBtnComponent :loading="loading" @click="submitForm" data-toggle="modal"
                        :data-target="'#' + modal" class="btn btn-success">Créer mon compte</SubmitBtnComponent>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { required, email, sameAs, maxLength} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { computed,reactive } from 'vue';
import { mapGetters, useStore } from 'vuex';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import { StatusCodeEnum } from '@/enums';
import {mask} from 'vue-the-mask'

export default {
    directives : {mask},
    setup() {
        const state = reactive({
            user: computed(() => useStore().state.user.User),
        })
        const rules = computed(() => {
            return {
                user: {
                    name: { required, maxLength: maxLength(255) },
                    first_name: { required, maxLength: maxLength(255) },
                    sex: { required, maxLength: maxLength(2) },
                    birth_date: { required },
                    residence_contry: { required },
                    sex: { required },
                    citizenship: { required },
                    email: { required, email },
                    phone: {},
                    password: { required },
                    password_confirmation: { required, sameAs: sameAs(state.user.password) }
                }

            }

        });

        const v$ = useVuelidate(rules, state)
        return {
            state,
            v$
        }
    },
    data() {
        return {
            loading: false,
            modal: '',
            invalidData: ''
        }
    },

    computed: {
        ...mapGetters('country', {
            countries: 'getCountries'
        }),
    },
    created() {
        this.getCountries();
    },
    methods: {
        getCountries() {
            this.$store.dispatch('country/getCoutries');
        },
        submitForm() {     
            this.v$.$validate()
            if (!this.v$.$error) {
                this.loading = true;
                // call fonction save user
                this.$store.dispatch('user/saveUser', this.state.user).then(()=> {   
                this.$refs.form.reset();
                this.$router.push('/login');
                }).catch((error) => { 
                   this.handleFormErrors(error.response.status,error.response.data.errors) 
                    this.loading = false;
                }); 
            }
        },
        
        handleFormErrors(codesStatus,responseData=''){
            if(codesStatus === StatusCodeEnum.INVALIDATA){
                this.invalidData = responseData;
                this.$emit('handleFormErrors',responseData);
            }
        }



    },
    name: "RegisterForm",
    components: { SubmitBtnComponent, ModalComponent }
}
</script>
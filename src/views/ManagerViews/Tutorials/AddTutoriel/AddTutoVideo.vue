<template>
    <form novalidate v-on:submit.prevent="submit" enctype="multipart/form-data">
       
       <SuccessAlert :show="isRequestSucced">La vidéo tutorielle a été ajoutée avec succès.</SuccessAlert>
       <error-alert :show="errors?.length" :response="errors"></error-alert>

        <div class="row mb-3">
            <div class="col-12 col-md">
                <div class="form-check">
                    <input v-model="state.isPrivate" :class="[v$.isPrivate.$error && 'is-invalid']" class="form-check-input" type="checkbox" id="isPrivate">
                    <label class="form-check-label" :class="[v$.isPrivate.$error && 'text-danger']" for="isPrivate">
                        Est privé *
                    </label>

                    <div class="invalid-feedback" v-if="v$.isPrivate.$error"> 
                        <span v-for="(error, index) of v$.isPrivate.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-md">
                <label :class="[v$.video.$error && 'text-danger']" for="video" class="my-2  fw-bold  fw-bold">Uploader la vidéo</label>
                <input type="file" :class="[v$.video.$error && 'is-invalid']" class="form-control" id="video" accept="video/*" @change="handleFileUpload($event)">  
                
                <div class="invalid-feedback" v-if="v$.video.$error"> 
                        <span v-for="(error, index) of v$.video.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                 </div>             
            </div>
            
        </div>
        <div class="row mb-3">
            <div class="col-12 col-md">
                <label for="comment" class="my-2  fw-bold  fw-bold">Comment</label>
                <textarea v-model.trim="state.comment" id="comment" class="form-control"></textarea>
            </div>
            
        </div>
        <div class="row mb-3" v-show="file != ''"> 
            <div class="col-12 col-md">
                <video id="video-preview" class="col-12" controls ref="videoPlayer">
                    <source  type="video/mp4">
                    Votre navigateur ne prend pas en charge la balise vidéo.
                </video>
            </div>
        </div>

        <div class="row">
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" @click="cancel">Annuler </button>
                <SubmitBtnComponent :loading="isLoading" @click="submit" class="btn btn-success">Enregistrer</SubmitBtnComponent>
            </div>

        </div>
    </form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { computed, reactive } from 'vue';
import { ExtraTuto } from '@/model/ExtraTuto';
import useVuelidate from '@vuelidate/core';
import customeMessage from '@/Utils/validationMessages';
import SuccessAlert from '@/components/shared/Alert/SuccessAlert.vue';
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue';

export default {

    setup(){
        const state = reactive({
            ...ExtraTuto
        });

        const rules = computed(()=> {
            return {
                video : {required:customeMessage('video','required')},
                tutorial_id : {required:customeMessage('tutorial_id','required')},
                isPrivate : {required:customeMessage('isPrivate','required')},
            }
        });

        const v$ = useVuelidate(rules,state);
        return {state,v$};
    },
    data() {
        return {
            file: '',
            isLoading : false,
            errors : [],
            isRequestSucced:false
        }
    },
    methods: {

        submit(){
            this.state.tutorial_id =139;
            this.v$.$reset();
            this.v$.$validate();

           if(this.v$.$error){
            return;
           }

           this.isLoading = true;

           this.$store.dispatch('tutorial/addVideoTuto',this.state).then((response) => {
                this.isRequestSucced=true;
                Object.assign(this.state, { ...ExtraTuto}); //reset state   
                this.v$.$reset();
                this.errors = []; 
                this.file = '';

            }).catch((error)=>{

                this.isRequestSucced=false;

                 if (!error.response) {
                        this.errors = [["Erreur lors de la requête"]]
                        return false
                    }
                    this.errors= error?.response?.data?.errors

            }).finally(()=> {
                this.isLoading = false;
            });
        },

        cancel() {
            this.$emit('isConfirm', false);
        },

        previewVideo() {
            let video = document.getElementById('video-preview');
            let reader = new FileReader();

            reader.readAsDataURL(this.file);
            reader.addEventListener('load', function () {
                video.src = reader.result; 
            }); 
        },

        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.state.video = this.file;
            this.previewVideo(); 
        },

    },
    props: {},
    components: { SubmitBtnComponent, SuccessAlert, ErrorAlert }
}
</script>
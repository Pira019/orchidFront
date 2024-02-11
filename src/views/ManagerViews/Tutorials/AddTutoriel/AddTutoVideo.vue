<template>
    <form novalidate v-on:submit.prevent="submit">
        <div class="row mb-3">
            <div class="col-12 col-md">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="isPrivate">
                    <label class="form-check-label" for="isPrivate">
                        Est privé
                    </label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-md">
                <label for="video" class="my-2  fw-bold  fw-bold">Uploader la vidéo</label>
                <input type="file" class="form-control" id="video" accept="video/*" @change="handleFileUpload($event)">  
            </div>
            
        </div>
        <div class="row mb-3" v-show="file != ''"> 
            <div class="col-12 col-md">
                <video id="video-preview" class="col-12" controls ref="videoPlayer">
                    <source  type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <div class="row">
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" @click="cancel">Annuler </button>
                <SubmitBtnComponent class="btn btn-success">Enregistrer</SubmitBtnComponent>
            </div>

        </div>
    </form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';

export default {
    data() {
        return {
            file: ''
        }
    },
    methods: {
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
            this.previewVideo();
        },

    },
    props: {},
    components: { SubmitBtnComponent }
}
</script>
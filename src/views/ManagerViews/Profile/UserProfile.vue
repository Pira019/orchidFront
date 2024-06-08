<template>
    <div>
        <page-title :isLoading="isRequestLoading" :requestResponseMessage="requestMessage">
            Mon profil
        </page-title>

        <!--Début content-->
        <section class="my-5" v-if="userProfile">
            <div>
                <div>
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Prénom :</span> {{
                            userProfile.first_name }}</li>
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Nom : </span> {{
                            userProfile.name }}</li>
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Sexe : </span> {{
                            userProfile.sex }}</li>
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Indentifiant  :
                            </span>{{ userProfile.user_name }}</li> 
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Date de naissance  :
                            </span>{{ userProfile?.birth_date }}</li> 
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Pays de résidence  :
                            </span>{{ userProfile?.residence_country }}</li> 
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Statut  :
                            </span>{{ userProfile.profile }}</li> 
                    </ul> 
                </div>

                <div class="mt-5">
                    <h5 class="my-3">Contact :</h5>
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Institutionnelle  :</span> {{
                            userProfile.email }}</li> 
                        <li class="list-group-item list-group-item-action p-3"><span class="fw-bold">Téléphone  :
                            </span>{{ userProfile.phone }}</li> 
                    </ul> 
                </div>


            </div>
        </section>
        <!--fin content-->
    </div>

</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue'
import errorMessage from '@/Utils/ErrorMessage';
export default {
    data() {
        return {
            isRequestLoading: false,
            requestMessage: null,
            userProfile: null
        }
    },
    methods: {
        getUserProfile() {
            this.isRequestLoading = true;
            this.$store.dispatch('profileManager/userProfile').then((response) => {
                this.userProfile = response.data
            }).catch((error) => {
                this.requestMessage = errorMessage(error, true)
            }).finally(() => {
                this.isRequestLoading = false;
            })
        }
    },
    components: { PageTitle },

    mounted() {
        this.getUserProfile();
    }

}
</script>
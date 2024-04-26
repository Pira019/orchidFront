<template>
    <div >
    <StaticbackdropModal :title="modalTitle" @isConfirm="handleModal" :is-confirm-modal="false"
        :close-modal="!isModalHidden" :modalSize="'modal-lg'" v-show="isModalHidden != null">
        <service-form-persistance @closeModal="isModalHidden = !true"
            :is-close-modal="isModalHidden"></service-form-persistance>
    </StaticbackdropModal> 

    <div class="container-fluid" v-show="!requestResponse">
        <button class="btn btn-success" @click="handlePersistanceBtn" title="Ajouter un service">Ajouter</button>
        <section class="mt-5">
            <table-component>
                <template #TableHeader>
                    <th scope="col">Pays</th>
                    <th scope="col">Année</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Création</th>
                    <th scope="col">Status</th>
                </template>

                <template #TableBody> 
                    <tr   v-for="(item, index) in data?.data" :key="index">
                        <th scope="row">
                            <p>
                                <router-link :to="{name:'ManagerServiceDetail', params:{id:item.id  }}" class="text-decoration-none link-success">{{ item.country.name }}</router-link> 
                            </p>
                           
                            <img :src="item.country.flag_url" alt="" width="45"  >
                        </th>
                        <td>{{ item.year }}</td>
                        <td>{{ item.price }} $</td>
                        <td>{{ formateDate(item.created_at) }}</td>
                        <td>{{ item.status }}</td>
                    </tr>
                </template>

            </table-component>
        </section>
    </div>
        
</div>
</template>
<script>
import StaticbackdropModal from '@/components/modal/StaticbackdropModal.vue';
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import ServiceFormPersistance from './ServiceFormPersistance.vue';
import TextModal from '@/Utils/json/TextModal'
import TableComponent from '@/components/shared/TableComponent.vue'; 
import formattedDate from '@/Utils/formattedDate';
import errorMessage from '@/Utils/ErrorMessage';

export default {
  props: ['requestResponse'],
     
    methods: {

        formateDate(date) {
                return formattedDate(date);
            },

        handleModal() {
            this.isModalHidden = false;
        },
        // when click in "Ajouter btn show modal"
        handlePersistanceBtn(isNew = true) {
            if (isNew) {
                this.modalTitle = TextModal.service.ajout;
                this.isModalHidden = true;
                return
            }
        }
    },
    data() {
        return {
            isModalHidden: null,
            modalTitle: null, 
            data: []
        }
    },

    mounted() {

        this.$store.dispatch('serviceManager/getServices')
            .then((response) => {
                this.data = response.data
            }).catch((error)=>{
                this.$store.commit('serviceManager/responseMessage', errorMessage(error,true));
            })
            .finally(() => {
                this.$store.commit('serviceManager/finishDataLoading');
            })
    },

    unmounted() { 
    this.$store.commit('serviceManager/resetResponseMessage');
  },
    components: { PageTitle, StaticbackdropModal, ServiceFormPersistance, TableComponent },
}
</script>
<template>
    <div>
        <StaticbackdropModal :title="modalTitle" @isConfirm="handleModal" :is-confirm-modal="false"
            :close-modal="!isModalHidden" :modalSize="'modal-lg'" v-show="isModalHidden != null">
            <service-form-persistance @closeModal="isModalHidden = !true" @newService="addNewServiceToArray"
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
                      
                        <tr class="text-center" v-show="isPaginateLoading || !services?.data">
                            <th colspan="5">
                                <p v-if="!services?.data">Aucun service !</p>
                                <Spinner v-show="isPaginateLoading"></Spinner>
                            </th>
                        </tr>
                        <tr  v-for="(item, index) in services?.data" :key="index" v-show="services?.data">
                            <th scope="row">
                                <p>
                                    <router-link :to="{name:'ManagerServiceDetail', params:{id:item.id  }}"
                                        class="text-decoration-none link-success">{{ item.country.name }}</router-link>
                                </p>

                                <img :src="item.country.flag_url" alt="" width="45">
                            </th>
                            <td>{{ item.year }}</td>
                            <td>{{ item.price }} $</td>
                            <td>{{ formateDate(item.created_at) }}</td>
                            <td><span class="text-white p-2 m- rounded" :class="statusBg(item.status)">{{ statusName(item.status) }}</span></td>
                        </tr>
                    </template>

                </table-component>

             <pagination-component v-if="services" @clickOnPagination="handlePaginationClick"
             :current_page="services?.current_page"           
             :links="services.links"/>
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
import PaginationComponent from '@/components/shared/PaginationComponent.vue';
import { getStatusName,getColorForStatus } from '@/Utils/statusEnum';
import Spinner from '@/components/shared/Spinner.vue';
import lang from '@/lang/fr.json'

export default {
  props: ['requestResponse'],
     
    methods: {
        addNewServiceToArray(newService) { 
            this.services?.data.unshift(newService)
        },
        handlePaginationClick(pageNumber){
          this.getServivices(pageNumber);
        },
        statusName(status){
            return getStatusName(status)
        },
        statusBg(status){
            return getColorForStatus(status)
        },
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
        },

        getServivices(pageNumber=0){
            this.$store.dispatch('serviceManager/getServices',pageNumber)
            .then((response) => {
                this.isPaginateLoading = pageNumber ? true : this.isPaginateLoading; 
                this.services = response.data
            }).catch((error)=>{
                this.$store.commit('serviceManager/responseMessage', errorMessage(error,true));
            })
            .finally(() => {
               this.isPaginateLoading = pageNumber ? false : this.isPaginateLoading; 
               !pageNumber && this.$store.commit('serviceManager/finishDataLoading');
            })
        }
    },
    data() {
        return {
            isModalHidden: null,
            modalTitle: null,  
            services : null,
            isPaginateLoading : false
        }
    },

    mounted() {
       this.getServivices();
       const pageTitle= lang.page.servives.ourServices
       this.$store.commit('serviceManager/setPageTitle',pageTitle);
    },

    unmounted() { 
    this.$store.commit('serviceManager/resetResponseMessage');
  },
    components: { PageTitle, StaticbackdropModal, ServiceFormPersistance, TableComponent, PaginationComponent,Spinner },
}
</script>
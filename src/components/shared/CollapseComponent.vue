<template>
    <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne">
                        <span class="text-uppercase">{{ data?.title }}</span>
                    </button>
                </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <p class="text-justify"> {{ data?.description ? data?.description : 'Aucune description ' }} </p>

                    <section v-if="detail">
                        <p class="h5"><u>Detail :</u></p>

                        <div class="mt-2">
                            <ul>
                                <li>Visibilité : {{ data?.visibility ? 'Visible' : 'Non visible' }}</li>
                                <li>Dérniere modification : {{ data?.updated_at ? formatDate(data?.updated_at) :
                                    formatDate(data?.created_at) }}</li>
                            </ul>
                        </div>
                    </section>
                </div>
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
export default {
    methods: {

        formatDate(date) {
            date = new Date();
            return format(date, 'yyyy-MM-dd HH:mm:ss');
        }
    },
    props: {
        data: {},
        detail: {
            default: false
        }
    }
}
</script>
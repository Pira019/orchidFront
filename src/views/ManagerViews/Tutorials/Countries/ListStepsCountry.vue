<template>
    <div> 
        <div class="container-fluid">
            <div class="row  col-gap justify-content-between">
            <div class="col-md-3">
                <VerticalMenuComponent></VerticalMenuComponent>
            </div>

            <div class="col-md-8 border-dark">
                <CollapseComponent>
                    <CollapseComponent></CollapseComponent>                
                </CollapseComponent>
            </div>       

        </div>
        </div>
    </div>
</template>

<script>
import CollapseComponent from '@/components/shared/CollapseComponent.vue';
import VerticalMenuComponent from '@/components/shared/VerticalMenuComponent.vue';

export default{
    components: { VerticalMenuComponent, CollapseComponent }
}
</script>
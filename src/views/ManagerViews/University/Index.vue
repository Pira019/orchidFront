<template>
    <div class="container-fluid">
        <section>
            <header class="text-center mb-3">
                <div class="mb-5">
                    <h1 class="text-success">Université</h1>
                    <router-link :to="{ name: 'ManagerUniversiteAdd' }" class="btn btn-success"> <font-awesome-icon
                            icon="fa-plus" size="1x" />Ajouter </router-link>
                </div> 
                <div class="input-group">
                    <select class="form-select" id="inputGroupSelect04">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button"><font-awesome-icon icon="fa-magnifying-glass" size="1x" /></button>
                    </div>
                </div>
            </header>

            <body class="m-5">
                <router-view class="border rounded container"></router-view>
            </body>
        </section>
    </div>
</template>

export default{

}
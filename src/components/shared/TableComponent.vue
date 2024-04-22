<template>
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                 <slot name="TableHeader">
                    <!-- <th scope="col">#</th> -->
                 </slot>
            </tr>
        </thead>
        <tbody>
              <!--use this exmple to create liste of date-->
            <slot name="TableBody">              
         
           <!--  <th scope="row">1</th>
                <td>Exemple1</td> 
            </tr> -->
        </slot>
        </tbody>
    </table>
</template>

<script>
export default {

}
name: 'TableComponent'
</script>
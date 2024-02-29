<template>
    <ul class="nav nav-tabs mb-3" :id="prefix+'myTab'" role="tablist">
        <li class="nav-item" role="presentation" v-for="(item, index) in tabNames" :key="index">
            <button :class="['nav-link', { 'active': index === 0 }]"
             :id="removeSpaces(item) + '-tab'" data-bs-toggle="tab" 
             :data-bs-target="'#' + removeSpaces(item) " type="button"
             role="tab" :aria-controls="removeSpaces(item)" 
             :aria-selected="index === 0">{{ item }}</button>
        </li> 
    </ul>
    <div class="tab-content" :id="prefix+'myTabContent'">
        <div :class="['tab-pane', 'fade', { 'show active': index === activeTabIndex }]"
             :id="removeSpaces(item)"  v-for="(item, index) in tabNames" :key="index" role="tabpanel" :aria-labelledby="removeSpaces(item) + '-tab'"
             :aria-selected="index === activeTabIndex">
            <slot :name="item" ></slot>  
        </div>
        
    </div>
</template>

<script>
export default {
    methods: { 
        removeSpaces(str) {
            // Remove spaces using regex and replace function 
            return `${this.prefix}${str.replace(/[^a-zA-Z0-9]/g, '')}`;
        },
    },
    props: {
        tabNames: {
            type: Array,
            required : true
        },
        prefix:{}
    },

    computed: {
    activeTabIndex() {
      // Assuming the first tab is active by default
      return 0;
    }
  },

}
</script>
<script setup>
import { onMounted, ref } from 'vue';
import ThumbLandscapeFull from '@/components/thumbs/ThumbLandscapeFull.vue';

const layoutThumbs = {
    ThumbLandscapeFull
};
const selLayoutName = ref('ThumbLandscapeFull');
const emit = defineEmits(['layoutClicked']);
function onThumbClick(layoutName){
    alert(layoutName);
    selLayoutName.value = layoutName;
    emit('layoutClicked', layoutName);
}

onMounted(()=>{
    emit('layoutClicked', selLayoutName.value);
});
</script>

<template>
    <div class="thumb-list-outer disp-flex-vertical">
        <div class="thumb-list-caption">
            Choose the Layout
        </div>
        <div class="thumb-list disp-flex-horizontal flex-space-between">
            <div v-for="(layout, layoutName) in layoutThumbs" :key="layoutName"
                    @click="onThumbClick(layoutName)">
                <component :is="layout" @click="onThumbClick(layoutName)"
                    class="thumb" :class="{'thumb-sel': selLayoutName==layoutName}">
                </component>
            </div>
        </div>
    </div>
</template>

<style>
/* Thumb list */
.thumb-list-outer{
    width: 100%;
    padding: 10px 20px;
}
.thumb-list-caption{
    font-weight: bold;
}
.thumb-list {
    margin: 0px -10px;
}
.thumb.thumb-sel{
    border: 1px solid mediumblue;
}
.thumb-item {
    margin:10px;

    border:1px solid lightgray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
                0 1px 3px rgba(0, 0, 0, 0.05); 
                /* Soft shadow */
    padding: 20px;
}
.thumb-item-landscape {
    width: 180px;
    aspect-ratio: 297 / 210; /* A4 landscape ratio */
}
</style>
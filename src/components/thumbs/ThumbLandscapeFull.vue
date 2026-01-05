<script setup>
import IconImage from '@/components/icons/IconImage.vue';

const emit = defineEmits(['click']);
function onThumbClick(){
    emit('click');
}
</script>

<template>
    <div class="thumb-item thumb-item-landscape" @click="onThumbClick">
        <div class="thumb-content-1">
            <IconImage class="image-in-thumb"></IconImage>
        </div>
    </div>
</template>
<style scoped>
.thumb-content-1{
    padding: 5px;
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;

    font-size: 30pt;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;    
}
</style>
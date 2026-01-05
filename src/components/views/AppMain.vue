<script setup>
    import { ref } from 'vue';
    import PreviewArea from '@/components/views/PreviewArea.vue'
    import ConfigArea from '@/components/views/ConfigArea.vue'

    const cachedConfig = ref(null);

    function onApply(inConfig){
        cachedConfig.value = inConfig;
    }
</script>
<template>
    <div class="app-main-outer">
        <PreviewArea :config="cachedConfig"></PreviewArea>
        <ConfigArea @applyClicked="onApply"></ConfigArea>
        
    </div>
</template>
<style>
    .app-main-outer {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
    }
</style>
<script setup>
    import { ref } from 'vue';
    import PreviewArea from '@/components/views/PreviewArea.vue'
    import ConfigArea from '@/components/views/ConfigArea.vue'

    const cachedConfig = ref(null);

    function onApply(inConfig){
        cachedConfig.value = inConfig;
    }
    function onPrint(){
        window.print();
    }
</script>
<template>
    <div class="app-main-outer">
        <PreviewArea :config="cachedConfig"></PreviewArea>
        <ConfigArea @applyClicked="onApply" @printClicked="onPrint"></ConfigArea>
        
    </div>
</template>
<style>
    .app-main-outer {
        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: stretch;
    }

    @media print {
        body * {
            visibility: hidden;
        }

        .preview-page,
        .preview-page * {
            visibility: visible;
        }

        .preview-page {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            border: 0px;
        }
    }
</style>
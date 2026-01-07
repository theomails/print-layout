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

    @page {
        size: A4 portrait;
        margin: 0;
    }

    @media print {
        html, body {
            min-height: none;
            margin: 0;
            padding: 0;
            height: 0px;
            width: 0px;
        }

        html, body * {
            height: 0px;
            width: 0px;
            visibility: hidden;
        }
        

        .preview-page,
        .preview-page * {
            visibility: visible;
        }

        .preview-area-outer {
            position: absolute;
            top: 0px;
            left: 0px;
            margin: 0px;
            padding: 0px;
            overflow: visible;
        }
        .preview-page {
            width: 210mm;
            height: 297mm;
            overflow: visible;
            margin: 0;
            border: 0px;
            padding: 0px;
            box-shadow: none;
        }
        .preview-image {
            border: 0px;
        }
    }
</style>
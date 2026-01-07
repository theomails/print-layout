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
            border: 1px solid white;
            height: 99%;
            page-break-after: avoid;
            page-break-before: avoid;
        }
        footer {page-break-after: avoid;}
        html, body * {
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
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            margin: 0;
            border: 0px;
            padding: 0px;
            box-shadow: none;
        }
        .preview-page {
            break-after: page;
        }
        .preview-page:first-child {
            break-before: avoid;
        }
        .preview-page:last-child {
            break-after: avoid;
        }
    }
</style>
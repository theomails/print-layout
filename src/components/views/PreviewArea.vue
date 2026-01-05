<script setup>
    defineProps({
        config: Object
    });
</script>
<template>
    <div class="preview-area-outer">
        {{ config }}
    </div>
</template>
<style>
    .preview-area-outer {
        flex-grow: 1;
        min-height: 70vh;

        overflow: auto;        
        padding: 10px;
        background-color: gray;
        border: 1px solid #333;

    }
</style>
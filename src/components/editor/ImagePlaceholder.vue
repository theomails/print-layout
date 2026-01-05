<script setup>
import IconImage from '@/components/icons/IconImage.vue';

const props = defineProps({
    caption: String
})
</script>
<template>
    <div style="display: flex; flex-direction: row; align-items: center;">
        <span style="font-size: 12pt; margin-right: 10px; font-weight: bold;">{{ caption }}</span>
        <IconImage class="image-in-thumb"></IconImage>
    </div>
</template>
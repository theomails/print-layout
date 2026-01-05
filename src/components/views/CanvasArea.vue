<script setup>
import EditLandscapeFull from '@/components/editor/EditLandscapeFull.vue';

defineProps({
  selLayoutProps: Object
});

const layoutEditors = {
    EditLandscapeFull
};
</script>
<template>
    <div class="canvas-area-outer">
        <div class="canvas-area-title">
          {{ selLayoutProps.caption }} - Configure
        </div>
        <p>Customize the images and the fit in the collage layout</p>
        <div class="canvas-area">
          <component :is="layoutEditors[selLayoutProps.editorComponentName]" class="editor" >
                </component>
        </div>
    </div>
</template>
<style>
</style>
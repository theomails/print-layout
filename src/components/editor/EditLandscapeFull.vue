<script setup>
import IconImage from '@/components/icons/IconImage.vue';
import { ref } from 'vue';
import ImageProps from './ImageProps.vue';
import { printPage } from '@/services/PrintService.js'
import ImagePlaceholder from './ImagePlaceholder.vue';

//Target for final download
const downloadTargetRef = ref(null);
//Hardcoded item refs
const elImg1Ref = ref(null);

//All Config holder
const contentProps = ref({
    img1: {
        caption: 'Image',
        fileURL: '',
        fit: 'contain' //contain cover fill none scale-down
    }
});
//All DOM refs holder
const contentRefs = {
    img1: elImg1Ref
};

//Current config in progress
const selContentName = ref('img1');

//Callbacks from ImageProps component
const onUpdateImageProps = (itemKey, newImageProps)=>{
    contentProps.value[itemKey] = { ...newImageProps };
    if(contentRefs[itemKey].value){
        contentRefs[itemKey].value.style.objectFit = newImageProps.fit; //Apply fit
        contentRefs[itemKey].value.src = newImageProps.fileURL; //Apply URL
    }
};
const onPrintClick = ()=>{
    printPage(downloadTargetRef.value);
};
</script>
<template>
    <div class="ls-full disp-flex-horizontal">

        <!--Everything in element's style only-->
        <div class="ls-full-outer" ref="downloadTargetRef"
            style="width: 100%;
                    aspect-ratio: 297 / 210; /* A4 landscape ratio */
                    border:1px solid white;
                    margin: 10px 0px;
                    background: white; ">
            <div class="ls-full-img1" :class="{'ls-full-img1-empty': !contentProps.img1.fileURL,
                                                'ls-full-img1-selected': selContentName=='img1'
                                            }"
                style= "margin: 10px;
                        height: calc(100% - 20px);    
                        /* Content */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                        font-size: 30pt;"
                :style="{'background-color': contentProps.img1.fileURL?'white':'#eee'}"
            >
                <img ref="elImg1Ref" v-show="contentProps.img1.fileURL"
                    style="width: 100%;
                            height: 100%;
                            object-fit: contain;" />
                <ImagePlaceholder v-show="!contentProps.img1.fileURL" 
                    :caption="contentProps.img1.caption"></ImagePlaceholder>
            </div>
        </div>

        <!-- Config section -->
        <ImageProps :imageProps="contentProps[selContentName]" 
            @update:imageProps="onUpdateImageProps(selContentName, $event)" @printClick="onPrintClick"></ImageProps>
    </div>
</template>
<style>
.ls-full .ls-full-outer{ /* Styles to be avoided in print window */
    max-width: 842px;
    border:1px solid lightgray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
                0 1px 3px rgba(0, 0, 0, 0.05);
}
.ls-full .ls-full-img1{ /* Styles to be avoided in print window */
    border:1px dashed lightgray;
}
.ls-full-img1.ls-full-img1-selected{
    border:1px solid mediumblue;
}
</style>
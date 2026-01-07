<script setup>
    const props = defineProps({
        config: Object
    });

    const v_margins_mm = {
        NONE: 0,
        THIN: 10,
        MEDIUM: 30,
        LARGE: 50,
        EXTRA_LARGE: 80
    };
    const h_margins_mm = {
        NONE: 0,
        THIN: 10,
        MEDIUM: 30,
        LARGE: 50,
        EXTRA_LARGE: 80
    };
    const spacing_mm = {
        NONE: 0,
        THIN: 10,
        MEDIUM: 30,
        LARGE: 50,
        EXTRA_LARGE: 80
    };

    function calcPageBounds(){
        let config = props.config;
        let pageHeight = config.pageLayout=='PORTRAIT'?297:210;
        let pageWidth = config.pageLayout=='PORTRAIT'?210:297;
        return {
            width: pageWidth,
            height: pageHeight
        };
    }

    function calcBounds(row, col){
        let config = props.config;
        let rows = config.pageGrid?.rows;
        let cols = config.pageGrid?.cols;
        if(!rows || !cols) return {};
        let marginV = v_margins_mm[config.pageMargins]; //Change based on layout?
        let marginH = h_margins_mm[config.pageMargins]; //Change based on layout?
        let spacing = spacing_mm[config.pageGrid.spacing];
        let pageHeight = config.pageLayout=='PORTRAIT'?297:210;
        let pageWidth = config.pageLayout=='PORTRAIT'?210:297;
        let imgHeight = (pageHeight - 2*marginV - (rows-1)*spacing)/rows;
        let imgWidth = (pageWidth - 2*marginH - (cols-1)*spacing)/cols;
        return {
            top: marginV + (row-1)*(spacing+imgHeight),
            left: marginH + (col-1)*(spacing+imgWidth),
            width: imgWidth,
            height: imgHeight
        };
    }
    function calcImage(row, col){
        let config = props.config;
        let cols = config.pageGrid?.cols;
        let avlImages = config.imageList.length;
        let index = (row-1)*cols + col;

        let image = index<=avlImages?config.imageList[index-1]:{};
        return image;
    }
</script>
<template>
    <div class="preview-area-outer" v-if="config?.pageGrid?.rows && config?.pageGrid?.cols">
        <div class="preview-page"
            :style="{
                width: calcPageBounds().width+'mm',
                height: calcPageBounds().height+'mm'
            }"
        >
            <div class="preview-image-row" v-for="row in config.pageGrid?.rows||1" :key="'r-'+row"> 
                <div class="preview-image"  v-for="col in config.pageGrid?.cols||1" :key="'c-'+col"
                        :style="{
                            top: calcBounds(row, col).top+'mm',
                            left: calcBounds(row, col).left+'mm',
                            width: calcBounds(row, col).width+'mm',
                            height: calcBounds(row, col).height+'mm'
                        }"
                    >
                        <el-image v-if="calcImage(row,col).url"
                            :fit="config.images.fit"
                            :key="calcImage(row,col).uuid"
                            :src="calcImage(row,col).url"
                            style="width: 100%; height: 100%;"
                        />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .preview-area-outer {
        flex-grow: 1;
        min-height: 70vh;
        max-width: 220mm;
        padding: 10px;

        overflow: auto;        
        background-color: #3A3F47;
        border: 1px solid #666;

    }
    .preview-page{
        position: relative;
        margin: 10px auto;
        width: 210mm;
        height: 282mm;
        background-color: #F7FAFC;
        border: 1px solid #333;
        box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1), 
                0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .preview-image-row {
        border: 0px dashed cornflowerblue;
    }
    .preview-image {
        position: absolute;
        display: inline-block;
        border: 1px dashed sandybrown;
    }
</style>
<script setup>
    import { reactive, onMounted, watch, computed } from 'vue'
    import { UploadFilled } from '@element-plus/icons-vue'

    const emit = defineEmits(['applyClicked', 'applyClicked']);

    const margins_mm = {
        NONE: 0,
        THIN: 5,
        MEDIUM: 10,
        LARGE: 20,
        EXTRA_LARGE: 40
    };
    const spacing_mm = {
        NONE: 0,
        THIN: 5,
        MEDIUM: 10,
        LARGE: 20,
        EXTRA_LARGE: 40
    };

    // layout state
    const state = reactive({
        pageLayout: 'PORTRAIT',
        pageMargins: 10, 
        pageGrid: {
            rows: 2,
            cols: 1,
            spacing: 10 
        },
        images: {
            fit: 'contain', //fill,contain,cover,none,scale-down
            autoRotate: true,
            zoom: 100
        },
        imageList: [],
    })
   
    function onApply(){
        emit('applyClicked', JSON.parse(JSON.stringify(state)));
    }
    function onPrint(){
        emit('printClicked');
    }
    function onPageMarginsHintChange(newVal){
        state.pageMargins = margins_mm[newVal];
        state.pageGrid.spacing = spacing_mm[newVal];
    }
    function onPageGridSpacingHintChange(newVal){
        state.pageGrid.spacing = spacing_mm[newVal];
    }
    function onImageListClearClick(){
        state.imageList = [];
    }
    function reload() {
        window.location.reload();
    }

    onMounted(() => {
        onApply();
    });

    watch(
        state,
        () => {
            emit('applyClicked', JSON.parse(JSON.stringify(state)));
        },
        { deep: true }
    );

    const totalPages = computed(() =>
        Math.ceil(
            Math.max(state.imageList.length, 1) /
            (state.pageGrid?.rows * state.pageGrid?.cols)
        )
    );
    const imagesPerPage = computed(() =>
        (state.pageGrid?.rows * state.pageGrid?.cols)
    );
</script>
<template>
    <div class="config-area-outer disp-flex-vertical">
        <p><b>Page</b></p>
        <div class="disp-font-sm disp-flex-vertical">
            <div class="">Orientation</div>
            <div class="disp-marginl-20 disp-font-xs">
                <el-radio-group class="" v-model="state.pageLayout" size="small" >
                    <el-radio-button label="Portrait" value="PORTRAIT" />
                    <el-radio-button label="Landscape" value="LANDSCAPE" />
                </el-radio-group>  
            </div>
            <div class="">Page Margins</div>
            <div class="disp-marginl-20 disp-font-xs">
                <div class="disp-flex-vertical">
                    <el-radio-group @change="onPageMarginsHintChange" size="small" >
                        <el-radio-button label="None" value="NONE" />
                        <el-radio-button label="Thin" value="THIN" />
                        <el-radio-button label="Medium" value="MEDIUM" />
                        <el-radio-button label="Large" value="LARGE" />
                        <el-radio-button label="Extra Large" value="EXTRA_LARGE" />
                    </el-radio-group>    
                    <el-slider v-model="state.pageMargins" :min="0" :max="150"/>
                </div>
            </div>                 
            <div class="">Images</div>
            <div class=" disp-marginl-20 disp-font-xs func-image-config-grid">
                <span class="">Rows</span> 
                <el-input-number v-model="state.pageGrid.rows" :min="1" :max="10" size="small"/>    
                <span class="">Columns</span> 
                <el-input-number v-model="state.pageGrid.cols" :min="1" :max="10" size="small"/>  
                <span class="">Spacing</span>
                <div class="disp-flex-vertical">
                    <el-radio-group @change="onPageGridSpacingHintChange" size="small" >
                        <el-radio-button label="None" value="NONE" />
                        <el-radio-button label="Thin" value="THIN" />
                        <el-radio-button label="Medium" value="MEDIUM" />
                        <el-radio-button label="Large" value="LARGE" />
                        <el-radio-button label="Extra Large" value="EXTRA_LARGE" />
                    </el-radio-group>
                    <el-slider v-model="state.pageGrid.spacing" :min="0" :max="150"/>
                </div>
            </div>
        </div>
        <p><b>Image Fill</b></p>
        <div class="disp-marginl-20 disp-marginv-10 disp-font-sm func-image-config-grid">
            <span class="">Fit</span>
            <!-- fill,contain,cover,none,scale-down -->
            <el-radio-group v-model="state.images.fit" size="small" >
                <el-radio-button label="None" value="none" />
                <el-radio-button label="Cover" value="cover" />
                <el-radio-button label="Contain" value="contain" />
                <el-radio-button label="Scale down" value="scale-down" />
                <el-radio-button label="Fill" value="fill" />
            </el-radio-group>                 
            <!-- TODO
            <span class="">Auto-rotate</span> 
            <el-switch v-model="state.images.autoRotate" size="small"/>    
            <span class="">Zoom</span> 
            <el-input-number v-model="state.images.zoom" :min="1" :max="1000" size="small"/>  
            -->
        </div>
        <p><b>Images</b></p>
        <div class="disp-marginb-10">
            <el-upload
                action=""
                :auto-upload="false"
                list-type="picture"
                class=""
                drag
                v-model:file-list="state.imageList"
                multiple
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        <span v-if="state.imageList.length>0">{{state.imageList.length}} images are selected for print.
                            The print will have {{ totalPages }} page(s) - {{ imagesPerPage }} image(s) per page.
                            <a style="cursor: pointer;" @click.stop="onImageListClearClick">Clear</a>
                        </span>
                        <span v-else>Select the image files to print.</span>
                    </div>
                </template>
            </el-upload>
        </div>        
        <div class="func-config-controls" 
            style="display:flex; flex-direction: row-reverse; gap:10px; margin-top:20px; margin-bottom:10px;">
            <el-button @click.stop="reload">Reset</el-button>
            <el-button type="primary" @click="onPrint">Print</el-button>
            <!-- <el-button @click="onApply">Apply</el-button> -->
        </div>
    </div>
</template>
<style>
    .config-area-outer {
        min-width: 30vw;
        max-width: 30vw;
      
        padding: 20px;
        border: 1px solid #ddd;
    }
    .config-area-outer .el-upload-dragger {
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .config-area-outer .el-upload-list {
        max-height: 30vh;
        overflow: auto;
    }
    .config-area-outer .el-upload-list__item {
        margin-top: 3px;
        margin-bottom: 3px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
    .config-area-outer .el-upload-list__item-thumbnail {
        height: 50px;
    }
    .config-area-outer .el-upload-list__item-info {
        overflow: hidden;
    }
    .func-image-config-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 12px;
    }
    .func-config-controls .el-button {
        margin: 0px;
    }
</style>
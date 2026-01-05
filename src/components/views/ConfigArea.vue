<script setup>
    import { reactive, onMounted, watch } from 'vue'
    import { UploadFilled } from '@element-plus/icons-vue'

    const emit = defineEmits(['applyClicked']);

    // layout state
    const state = reactive({
        pageLayout: 'PORTRAIT',
        pageMargins: 'MEDIUM', //NONE,THIN,MEDIUM,LARGE,EXTRA_LARGE
        pageGrid: {
            rows: 1,
            cols: 1,
            spacing: 'MEDIUM' //NONE,THIN,MEDIUM,LARGE,EXTRA_LARGE
        },
        images: {
            fit: 'cover', //fill,contain,cover,none,scale-down
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
</script>
<template>
    <div class="config-area-outer disp-flex-vertical">
        <p><b>Images</b></p>
        <div>
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
                        Select the image files to print.
                    </div>
                </template>
            </el-upload>
        </div>
        <p><b>Page Layout</b></p>
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
                <el-radio-group v-model="state.pageMargins" size="small" >
                    <el-radio-button label="None" value="NONE" />
                    <el-radio-button label="Thin" value="THIN" />
                    <el-radio-button label="Medium" value="MEDIUM" />
                    <el-radio-button label="Large" value="LARGE" />
                    <el-radio-button label="Extra Large" value="EXTRA_LARGE" />
                </el-radio-group>    
            </div>                 
            <div class="">Images</div>
            <div class=" disp-marginl-20 disp-font-xs func-image-config-grid">
                <span class="">Rows</span> 
                <el-input-number v-model="state.pageGrid.rows" :min="1" :max="10" size="small"/>    
                <span class="">Columns</span> 
                <el-input-number v-model="state.pageGrid.cols" :min="1" :max="10" size="small"/>  
                <span class="">Spacing</span>
                <el-radio-group v-model="state.pageGrid.spacing" size="small" >
                    <el-radio-button label="None" value="NONE" />
                    <el-radio-button label="Thin" value="THIN" />
                    <el-radio-button label="Medium" value="MEDIUM" />
                    <el-radio-button label="Large" value="LARGE" />
                </el-radio-group>          
            </div>
        </div>
        <p><b>Images</b></p>
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
            <span class="">Auto-rotate</span> 
            <el-switch v-model="state.images.autoRotate" size="small"/>    
            <span class="">Zoom</span> 
            <el-input-number v-model="state.images.zoom" :min="1" :max="1000" size="small"/>  
        </div>
        <div class="func-config-controls" 
            style="display:flex; flex-direction: row-reverse; gap:10px; margin-top:20px; margin-bottom:10px;">
            <el-button>Reset</el-button>
            &nbsp;
            <el-button type="primary" @click="onPrint">Print</el-button>
            <el-button @click="onApply">Apply</el-button>
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
    .func-image-config-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 12px;
    }
    .func-config-controls .el-button {
        margin: 0px;
    }
</style>
<script setup>
import { ref, onMounted, watch } from 'vue';

//Common options
const fitOptions = {
  contain: 'Contain - Fit inside',
  cover: 'Cover - Fill',
  fill: 'Fill - Stretch to fit',
  none: 'None - Original size'
};

/** PROPS OBJ */
//In-out
const props = defineProps({ imageProps: Object }); 
const emit = defineEmits(['update:imageProps', 'printClick']);  
//Local
const localImageProps = ref({}); 
//Initial
onMounted(() => {
    localImageProps.value = props.imageProps; // Copy prop to ref
});
//Continue to watch
watch(() => props.imageProps, (newVal) => {
  if (newVal !== localImageProps.value) {
    localImageProps.value = newVal;
  }
});

/** PROPS INNER */
//One fit handler
function onFitClick(fitCode){
    localImageProps.value.fit = fitCode;
    emit('update:imageProps', localImageProps.value);
}
//One file handler
function onFileChange(event){
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localImageProps.value.fileURL = e.target.result;
            emit('update:imageProps', localImageProps.value);
        }
        reader.readAsDataURL(file);
    }    
}
function onPrintClick(){
    emit('printClick');
}
</script>
<template>
    <div class="ip-full-config">
        <div class="ip-full-config-title ">Configure <span class="disp-font-bold">{{ localImageProps.caption }}</span></div>
        <div class="ip-full-config-props ">Properties:</div>
        <div class="ip-full-config-details">
            <table><tbody>
                <tr>
                    <td class="prop-caption">File</td>
                    <td><input type="file" @change="onFileChange" /></td>
                </tr>
                <tr>
                    <td class="prop-caption">Fit</td>
                    <td>
                        <button v-for="(fitCaption, fitCode) in fitOptions" :key="fitCode"
                            :class="{'disp-font-bold': (localImageProps.fit == fitCode)}"
                            @click="onFitClick(fitCode)">{{ fitCaption }}</button>
                    </td>
                </tr>
            </tbody></table>
            <button class="disp-pad-10 disp-margint-20" @click="onPrintClick">Print Collage</button>
        </div>
    </div>        
</template>
<style scoped>
.ip-full-config{
    margin: 20px;
    padding: 20px;
    border:1px solid lightgray;
    border-radius: 5px;
    max-width: 800px;
    background: white;
}
.ip-full-config-props{
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.9em;
    text-decoration: underline;
}
.ip-full-config-details table {
  border-collapse: collapse;
  width: 100%;
}

.ip-full-config-details td, .ip-full-config-details th {
  border: 1px solid lightgray;
  padding: 8px;
}
.prop-caption{
    background-color: #eee;
}
button{
    padding: 5px;
    margin: 2px;
    font-size: 0.8em;
}
</style>
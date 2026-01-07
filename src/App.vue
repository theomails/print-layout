<script setup>
import AppMain from '@/components/views/AppMain.vue';

</script>

<template>
  <header class="app-header">
    <div class="logo-outer">
      <div class="logo-icon"></div>
      <div class="logo-text">NANO<br/>APPS</div>      
    </div>
    <h4>Print Grid</h4>
  </header>
  <main class="app-content">
    <AppMain></AppMain>
  </main>
  <footer class="app-footer">
    <div data-v-45d367c0="" class="mb-2 text-gray-800">
      <a data-v-45d367c0="" class="cursor-pointer">Privacy Policy</a> &nbsp; <a data-v-45d367c0="" class="cursor-pointer">Terms of Service</a></div> 
      Copyright © Nano Apps Net. All rights reserved.
  </footer>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
  /*background: linear-gradient(white, #d9f3fa);*/
  /*background: linear-gradient(160deg, white 0%, #d9f3fa 85%);*/
  background-color: #f5fdff;
}
.app-header{
    display: flex;
    align-items: flex-start;

    padding: 15px;
    padding-bottom: 10px;
    /*box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.2);*/
    background-color: #24324A;
    border-bottom: 1px solid #ddd;
}
.logo-outer {
  display: flex;
  margin-left: 10px;
  background-color: white;
  padding: 5px;
  padding-left: 0px;
  padding-right: 10px;
  border-radius: 10px;
}
.app-header .logo-icon{
  margin-left: 10px;
  width: 2em;
  height: 2em;
  background-image: url('./assets/nano-apps-logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain; /* or cover */
}
.app-header .logo-text{
  margin-left: 10px;
  font-size: 0.9em;
  line-height: 1.1;
  font-weight: bold;
}
.app-header h1,h2,h3,h4{
    margin-left: 30px;
    line-height: 2.8;
    color: #F4F7FB;
}
.app-content{
    flex-grow: 1;
    width: 100%;
    margin: 20px auto;
    background-color: #F7FAFC;
}
.app-footer{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  background: #3A3F47;
  color: #B7BDC8;
  padding: 16px 24px;
  font-size: 0.875rem;
}
.app-footer a {
  color: #C9D8EE;
  text-decoration: none;
}

.app-footer a:hover {
  color: #E3ECFA;
  text-decoration: underline;
}
</style>

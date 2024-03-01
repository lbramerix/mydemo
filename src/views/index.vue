<template>
    <div id="container">
      <header class="header_top">
        <Navbar />
      </header>
      <main>
      <router-view></router-view> 
    </main>
    </div>
   </template>
   
   <script>
   import Navbar from '@/components/Navbar'
   export default {
     name: 'app',
     components: {
       Navbar,
     }
   }
   </script>
   
   <style>
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
     }
     body {
       font-family: 'Avenir', Helvetica, Arial, sans-serif;
     }
     .header_top {
       background: rgb(255, 255, 255);
       width: auto;
       /* height: 80px; */
     }
   </style>
   
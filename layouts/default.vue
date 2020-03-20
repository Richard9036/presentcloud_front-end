<template>
  <div>
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
import Header from "@/components/header.vue"
export default {
  components:{
    Header
  }
  
}
</script>
<style>
*{
    margin:0;
    padding:0;

}
ul,li,ol{
    list-style: none;
}
a{
    color: #333;
    text-decoration: none;
}

em,i{
    font-display: normal;
}
</style>

<template>
  <div id="app">
    <header
      style="height:60px;line-height:60px;backgroundColor:#A30000;color:#fff;fontSize:18px;"
    >
      <span style="margin-left:200px;">中国联通在线审计平台</span>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

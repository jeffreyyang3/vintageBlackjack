<template>
  <div class="entry">

    <div class="bjwindow" v-if="false">
      <WindowContainer>
        <BJScreen></BJScreen>
      </WindowContainer>
    </div>

    <div class="createJoinWindow">
      <WindowContainer>
        <CreateOrJoin></CreateOrJoin>
      </WindowContainer>
    </div>

  </div>
</template>

<script>
  import CreateOrJoin from '@/components/CreateOrJoin.vue';
  import WindowContainer from "@/components/WindowContainer.vue";
  import BJScreen from "@/components/casino/BJScreen.vue";
  export default {
    components: {
      CreateOrJoin,
      WindowContainer,
      BJScreen
    },
    name: "Entry"
  }
</script>

<style lang="scss">
  .bjwindow, .createJoinWindow {
    width: 700px;
    height: 500px;
  }


</style>

<template>
  <div class="window window98container">
    <div class="title-bar">
      <div class="title-bar-text">asdf</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="contentContainer">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "WindowContainer"
  }
</script>

<style lang="scss">
  .contentContainer {
    padding: 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .window98container {
  }
</style>

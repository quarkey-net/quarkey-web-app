<template>
  <div class="overlay">
    <div class="popup" />
  </div>
</template>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    visibility: visible;
    opacity: 1;
  }

  .popup {
    margin: 70px auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    width: 574px;
    height: 381px;
    border-radius: 8px;
    border: 1px solid #353648;
    box-sizing: border-box;
    position: relative;
    transition: all 5s ease-in-out;
  }
</style>

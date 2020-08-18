<template>
  <span class="svgIcon">
    <component :is="iconType" :fill="iconColor"></component>
  </span>
</template>

<style lang="scss">@import "./SvgIcon";</style>
<script src="./SvgIcon.js"></script>
<template>
  <div :class="['loader', `colorMode-is-${theColorMode}`]">
  	<div class="loader__icon">
	    <svg class="loader__icon__circle" viewBox="25 25 50 50" >
	      <circle class="loader__icon__path" cx="51" cy="51" r="18" fill="none" stroke-width="12" />
	    </svg>
    </div>

    <div class="loader__label">
			<span class="loader__theLabel">Laden</span>
		</div>
  </div>
</template>

<style lang="scss" scoped>@import "./Loader";</style>
<script src="./Loader.js"></script>
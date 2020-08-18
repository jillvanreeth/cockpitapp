<template>
	<div class="weather">
		<span class="weather__symbol">
			<SvgIcon :iconType="weather.icon"></SvgIcon>
		</span>
		<span class="weather__label">
			{{weather.temperature}}° &bullet; {{weather.state}}
		</span>	
	</div>
</template>

<style lang="scss">@import "./Weather";</style>
<script src="./Weather.js"></script>
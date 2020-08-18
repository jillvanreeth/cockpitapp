<template>
	<div class="whoops">
		
		<header class="whoops__header">
			<span class="whoops__symbol">
				<SvgIcon :iconType="theContent.icon"></SvgIcon>	
			</span>

			<span class="whoops__header__subtitle">{{theContent.subtitle}}</span>
			<h3 class="heading heading--3 whoops__header__title">{{theContent.title}}</h3>
		</header>

		<div class="whoops__content">
			<p>{{theContent.body}}</p>
		</div>

		<div class="whoops__submit">
			<button @click="handleClick()" class="button button--pairing-neutrals-5 whoops__theSubmit">
				<span class="button__label">Sluiten</span>
			</button>
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./Whoops";</style>
<script src="./Whoops.js"></script>
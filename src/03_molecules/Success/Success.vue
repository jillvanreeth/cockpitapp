<template>
	<div class="success">
		
		<header class="success__header">
			<span class="success__symbol">
				<SvgIcon :iconType="theContent.icon"></SvgIcon>	
			</span>

			<span class="success__header__subtitle">{{theContent.title}}</span>
			<h3 class="heading heading--3 success__header__title">{{theContent.subtitle}}</h3>
		</header>

		<div class="success__content">
			<p>{{theContent.body}}</p>
		</div>

		<div class="success__submit">
			<button @click="handleClick()" class="button button--pairing-neutrals-5 success__theSubmit">
				<span class="button__label">{{theContent.button}}</span>
			</button>
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./Success";</style>
<script src="./Success.js"></script>
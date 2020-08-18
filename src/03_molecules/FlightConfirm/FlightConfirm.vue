<template>
	<div class="flightConfirm">
		
		<div class="flightConfirm__inner">
			<header class="flightConfirm__header">
				<span class="flightConfirm__header__subtitle">Bevestigen</span>
				<h3 class="heading heading--3 flightConfirm__header__title">Ben je zeker?</h3>
			</header>

			<div class="flightConfirm__content">
				<p>Je vaartschema wordt onherroepelijk ingediend proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
			</div>

			<div class="flightConfirm__submit">
				<button @click="handleSubmit" class="button button--positive">
					<span class="button__label">Dienst beëindigen</span>
				</button>
			</div>
		</div>

	</div>
</template>


<style lang="scss" scoped>@import "./FlightConfirm";</style>
<script src="./FlightConfirm.js"></script>
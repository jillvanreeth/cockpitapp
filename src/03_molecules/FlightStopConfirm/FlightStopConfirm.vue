<template>
	<div class="flightStopConfirm">
		
		<transition name="fade-in">
			<div v-show="isLoading" class="flightStopConfirm__loader">
				<Loader colorMode="dark"></Loader>
			</div>			
		</transition>

		<div :class="['flightStopConfirm__inner', {'is-loading': isLoading}]">
			<header class="flightStopConfirm__header">
				<span class="flightStopConfirm__header__subtitle">Vaart onvoltooid</span>
				<h3 class="heading heading--3 flightStopConfirm__header__title">Ben je zeker?</h3>
			</header>

			<div class="flightStopConfirm__content">
				<p>Het blijkt dat de huidige vaart nog niet voltooid proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
			</div>
			
			<div class="flightStopConfirm__actions">
				<div class="flightStopConfirm__actions__item">
					<button @click="handleSubmit" class="button button--pairing-neutrals-4">
						<span class="button__label">Vaart beëindigen</span>
					</button>
				</div>

				<div class="flightStopConfirm__actions__item">
					<router-link to="/flight" class="button button--brand-2">
						<span class="button__symbol">
							<SvgIcon iconType="shipFront"></SvgIcon>
						</span>
						<span class="button__label">Naar huidige vaart</span>
					</router-link>
				</div>
			</div>

		</div>

	</div>
</template>


<style lang="scss" scoped>@import "./FlightStopConfirm";</style>
<script src="./FlightStopConfirm.js"></script>
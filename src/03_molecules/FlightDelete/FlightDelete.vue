<template>
	<div class="flightDelete">
		<div class="flightDelete__inner">
			<header class="flightDelete__header">
				<span class="flightDelete__header__subtitle">Halte verwijderen</span>
				<h3 class="heading heading--3 flightDelete__header__title">Ben je zeker?</h3>
			</header>

			<div class="flightDelete__content">
				<p>Deze halte wordt onherroepelijk verwijdert proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
			</div>

			<div class="flightDelete__submit">
				<div @click="handleDeleteClick" class="button button--brand-2 flightDelete__theSubmit">
					<span class="button__symbol">
						<SvgIcon iconType="trash"></SvgIcon>
					</span>
					<span class="button__label">Verwijder halte</span>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>@import "./FlightDelete";</style>
<script src="./FlightDelete.js"></script>
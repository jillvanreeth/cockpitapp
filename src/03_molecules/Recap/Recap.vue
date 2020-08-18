<template>
	<div class="recap">

		<div class="recap__row">
			<span class="recap__row__item__title">Huidige dienst</span>
			
			<div class="recap__row__inner">
				<div class="recap__row__item">
					<div class="recap__track">
						<span class="recap__track__symbol">
							<SvgIcon iconType="anchorCircle"></SvgIcon>
						</span>
						<span v-if="$store.state.flightSettings.track" class="recap__track__label">{{viewData.flightInfo.track.name}}</span>
					</div>
				</div>

				<div class="recap__row__item">
					<span v-if="$store.state.flightSettings.shift" class="recap__row__item__label">{{viewData.flightInfo.current_shift.name}}</span>
				</div>
			</div>
		</div>

		<div class="recap__row">
			<div class="recap__row__inner">

				<div v-if="theStop" class="recap__row__item">
					<span class="recap__row__item__symbol">
						<SvgIcon iconType="nextStop"></SvgIcon>
					</span>

					<span class="recap__row__item__title">{{ this.viewData.nextStop ? 'Volgende' : 'Einde'}}</span>
					<span class="recap__row__item__label">{{ theStop }}</span>
				</div>

				<div :class="['recap__row__item', {'is-invalid' : this.viewData.nextStop && viewData.flightInfo.current_people > viewData.flightInfo.max_people}]">
					<span class="recap__row__item__symbol">
						<SvgIcon iconType="passengersFlat"></SvgIcon>
					</span>

					<span class="recap__row__item__title">Personen</span>
					<span class="recap__row__item__label">{{this.viewData.nextStop ? viewData.flightInfo.current_people : '0'}}</span>
				</div>

				<div :class="['recap__row__item', {'is-invalid' : this.viewData.nextStop && viewData.flightInfo.current_bikes > viewData.flightInfo.max_bikes}]">
					<span class="recap__row__item__symbol">
						<SvgIcon iconType="bike"></SvgIcon>
					</span>

					<span class="recap__row__item__title">Fietsen</span>
					<span class="recap__row__item__label">{{this.viewData.nextStop ? viewData.flightInfo.current_people : '0'}}</span>
				</div>
			
			</div>
		</div>
		
	</div>
</template>


<style lang="scss" scoped>@import "./Recap";</style>
<script src="./Recap.js"></script>
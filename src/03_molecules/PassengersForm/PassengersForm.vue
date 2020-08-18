<template>
	<div class="passengersForm">

		<transition name="fade-in">
			<div v-if="isLoading" class="passengersForm__loader">
				<Loader></Loader>
			</div>
		</transition>

		<div :class="['passengersForm__inner', {'is-loading': isLoading}]">
			<header class="passengersForm__header">
				<div class="passengersForm__header__group">
					<span class="passengersForm__header__symbol">
						<SvgIcon iconType="anchorCircle"></SvgIcon>	
					</span>

					<span class="passengersForm__header__subtitle">{{nextStop.stop.name}} &bullet; {{timeStamp(theTimeStamp)}}</span>
				</div>
				
				<h3 class="heading heading--3 passengersForm__header__title">Passagiers</h3>
			</header>
			
			<form @submit.stop.prevent="handleSubmit" action="" method="post" :class="['passengersForm__theForm', {'is-loading' : isLoading}]" novalidate>
				<div class="passengersForm__theForm__inner">
					<fieldset class="passengersForm__theForm__fieldset">
						<label class="passengersForm__theForm__label">Passagiers</label>

						<div class="passengersForm__theForm__field">
							<input :disabled="!inputs.people.current_people" v-model.number="inputs.people.min" class="input__field passengersForm__theForm__input" name="passengersMin" placeholder="- 0" type="number" min="0">
							
							<span @click="inputs.people.current_people && inputs.people.min++" class="passengersForm__theForm__helper">
								<SvgIcon iconType="minCircle"></SvgIcon>
							</span>
						</div>

						<div class="passengersForm__theForm__field">
							<input :disabled="!secondStop" v-model.number="inputs.people.plus" class="input__field passengersForm__theForm__input" name="passengersPlus" placeholder="+ 0" type="number" min="0">
							
							<span @click="inputs.people.plus++" class="passengersForm__theForm__helper">
								<SvgIcon iconType="plusCircle"></SvgIcon>
							</span>
						</div>
							
						<div :class="['passengersForm__theForm__total', {'is-invalid' : inputs.people.current_people > flightInfo.max_people}]">	
							<span class="passengersForm__theForm__total__symbol">
								<SvgIcon iconType="passengers"></SvgIcon>
							</span>

							<span class="passengersForm__theForm__total__label">{{inputs.people.current_people}}</span>
						</div>
					</fieldset>

					<fieldset class="passengersForm__theForm__fieldset">
						<label class="passengersForm__theForm__label" for="bikesMin">Fietsen</label>

						<div class="passengersForm__theForm__field">
							<input :disabled="!inputs.bikes.current_bikes" v-model.number="inputs.bikes.min" class="input__field passengersForm__theForm__input" name="bikesMin" placeholder="- 0" type="number" min="0">
							
							<span @click="inputs.bikes.current_bikes && inputs.bikes.min++" class="passengersForm__theForm__helper">
								<SvgIcon iconType="minCircle"></SvgIcon>
							</span>
						</div>

						<div class="passengersForm__theForm__field">
							<input :disabled="!secondStop" v-model.number="inputs.bikes.plus" class="input__field passengersForm__theForm__input" name="bikesPlus" placeholder="+ 0" type="number" min="0">
							
							<span @click="inputs.bikes.plus++" class="passengersForm__theForm__helper">
								<SvgIcon iconType="plusCircle"></SvgIcon>
							</span>
						</div>
							
						<div :class="['passengersForm__theForm__total', {'is-invalid' : inputs.bikes.current_bikes > flightInfo.max_bikes}]">	
							<span class="passengersForm__theForm__total__symbol">
								<SvgIcon iconType="bike"></SvgIcon>
							</span>

							<span class="passengersForm__theForm__total__label">{{inputs.bikes.current_bikes}}</span>
						</div>
					</fieldset>		
				</div>
				
				<div class="passengersForm__theForm__actions">
					<div class="passengersForm__theForm__actions__item">
						<button :disabled="!flightInfo.current_people && !flightInfo.current_bikes && !inputs.bikes.current_bikes && !inputs.bikes.current_people" @click.stop.prevent="handlePassengersClick" class="button button--pairing-neutrals-9" type="sumbit">
							<span class="button__symbol">
								<SvgIcon iconType="groupRemove"></SvgIcon>
							</span>
							<span class="button__label">Alle passagiers van boord</span>
						</button>
					</div>

					<div class="passengersForm__theForm__actions__item">
						<button :disabled="isDisabled" class="button button--pairing-brand-1" type="sumbit">
							<span class="button__label">Bevestigen</span>
						</button>
					</div>
				</div>
			</form>	
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./PassengersForm";</style>
<script src="./PassengersForm.js"></script>
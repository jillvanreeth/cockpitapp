<template>
	<div class="flightInsertForm">
		<transition name="fade-in">
			<div v-if="isLoading" class="flightInsertForm__loader">
				<Loader></Loader>
			</div>			
		</transition>
		
		<div class="flightInsertForm__actions">
			<div class="flightInsertForm__theCloser" @click="handleCloseClick">
				<div class="flightInsertForm__theCloser__symbol">
					<SvgIcon iconType="close"></SvgIcon>
				</div>
			</div>
		</div>

		<!-- <transition name="fade" mode="out-in"> -->
			
			
			<div :class="['flightInsertForm__inner', {'is-loading': isLoading}, {'is-success': isSuccess}]">
				
				<h3 class="heading heading--4 flightInsertForm__title">Halte invoegen</h3>	

				<form class="flightInsertForm__form" novalidate>			
					<div class="flightInsertForm__form__field" ref="stop">
						<label class="input__label">Kies halte</label>

						<div class="flightInsertForm__input__select input__select">
							<span class="flightInsertForm__input__select__symbol">
					    	<SvgIcon iconType="anchorCircle"></SvgIcon>
					    </span>

					    <select v-model="inputFields.stop">
					    	<option disabled value="">Maak uw keuze</option>
					      <option v-for="stop in theStops" :value="stop.id">{{stop.name}}</option>
					    </select>

					    <span class="input__select__symbol">
					    	<SvgIcon iconType="triangle"></SvgIcon>
					    </span>
					  </div>

					  <span class="input__error">
							<span class="input__error__symbol">
								<SvgIcon iconType="warning"></SvgIcon>
							</span>
							<span class="input__error__label">Dit veld is verplicht</span>
						</span>
					</div>
					
					<div class="flightInsertForm__form__fieldset">
						<label class="input__label">Hoelang bedraagt de vertraging?</label>

						<div class="flightInsertForm__form__field" ref="hours">
							<div class="flightInsertForm__input__wrap">
								<span class="flightInsertForm__input__helper">Uur</span>
			 					<input @input="handleKeyevent" v-model="inputFields.hours" class="input__field flightInsertForm__input__field" type="number">
							</div>
						</div>

						<div class="flightInsertForm__form__field" ref="mins">
							<div class="flightInsertForm__input__wrap">
								<span class="flightInsertForm__input__helper">Min</span>
			 					<input @input="handleKeyevent" v-model="inputFields.mins" class="input__field flightInsertForm__input__field" type="number">
							</div>

							<span class="input__error">
								<span class="input__error__symbol">
									<SvgIcon iconType="warning"></SvgIcon>
								</span>
								<span class="input__error__label">Dit veld is verplicht</span>
							</span>
						</div>

							
					</div>

					<div class="flightInsertForm__form__submit">
						<button @click.stop.prevent="handleSubmit" :disabled="isInvalid" class="button button--brand-2" type="sumbit">
							<span class="button__label">Bevestigen</span>
						</button>		
					</div>
				</form>
			</div>
		<!-- </transition> -->


		<transition name="fade-in">
			<div v-if="isSuccess" class="flightInsertForm__success">
				<Success @emitToggleOffcanvas="emitToggleOffcanvas" :viewData="theMessage"></Success>
			</div>
		</transition>
	</div>
</template>


<style lang="scss" scoped>@import "./FlightInsertForm";</style>
<script src="./FlightInsertForm.js"></script>
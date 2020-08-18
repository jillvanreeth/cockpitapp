<template>
	<div class="flightSkipForm">
		
		<transition name="fade-in">
			<div v-if="isLoading" class="flightSkipForm__loader">
				<Loader colorMode="dark"></Loader>
			</div>
		</transition>

		<div :class="['flightSkipForm__inner', {'is-loading': isLoading}, {'is-success': isSuccess}]">
			<header class="flightSkipForm__header">
				<div class="flightSkipForm__header__group">
					<span class="flightSkipForm__header__symbol">
						<SvgIcon iconType="anchorCircle"></SvgIcon>	
					</span>

					<span class="flightSkipForm__header__subtitle">{{theNextStop.stop.name}} &bullet; <Time @emitLoaded="TimeIsLoaded"></Time></span>
				</div>
				
				<h3 class="heading heading--3 flightSkipForm__header__title">Halte overslaan</h3>
			</header>

			<form class="flightSkipForm__form" novalidate>			
				<div class="flightSkipForm__form__field" ref="reason">
					<label class="input__label">Reden</label>

					<div class="input__select">
				    <select v-model="inputFields.reason">
				    	<option disabled value="">Maak uw keuze</option>
				      <option>Probleem op steiger</option>
				      <option>Boot is gezonken</option>
				      <option>Anker is vermist</option>
				      <option>Kapitein overboord gevallen</option>
				      <option>WC papier is op</option>
				      <option value="other">Andere...</option>
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

				<div class="flightSkipForm__form__field" ref="remarks">
					<textarea @input="handleKeyevent" v-model="inputFields.remarks" class="input__textarea" name="remarks" rows="6" placeholder="Deel hier bijkomstige opmerkingen of notities"></textarea> 
					
					<span class="input__error">
						<span class="input__error__symbol">
							<SvgIcon iconType="warning"></SvgIcon>
						</span>
						<span class="input__error__label">Vul een reden in</span>
					</span>
				</div>

				<div class="flightSkipForm__form__submit">
					<button @click.stop.prevent="handleSubmit" class="button button--brand-2" type="sumbit" :disabled="isInvalid">
						<span class="button__label">Bevestigen</span>
					</button>		
				</div>	
			</form>
		</div>
		
		<transition name="fade-in">
			<div v-if="isSuccess" class="flightSkipForm__success">
				<Success :viewData="theMessage"></Success>
			</div>
		</transition>

	</div>
</template>


<style lang="scss" scoped>@import "./FlightSkipForm";</style>
<script src="./FlightSkipForm.js"></script>
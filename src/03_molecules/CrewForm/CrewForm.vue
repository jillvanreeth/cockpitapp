<template>
	<div class="crewForm">
		
		<h3 class="heading heading--3 crewForm__title">Stewards toevoegen</h3>
		
		<div class="crewForm__inner">
			<form @submit="handleSubmit" action="" method="post" class="crewForm__theForm" novalidate>
				
				<div class="crewForm__theForm__field" ref="firstname">
					<label class="input__label" for="firstname">Voornaam Steward</label>
					<input @input="handleKeyevent" v-model="inputs.firstname" class="input__field" placeholder="Voornaam" name="firstname" type="text">

					<span class="input__error">
						<span class="input__error__symbol">
							<SvgIcon iconType="warning"></SvgIcon>
						</span>
						<span class="input__error__label">Dit veld is verplicht</span>
					</span>
				</div>

				<div class="crewForm__theForm__field" ref="lastname">
					<label class="input__label" for="lastname">Achternaam Steward</label>
					<input @input="handleKeyevent" v-model="inputs.lastname" class="input__field" placeholder="Achternaam" name="lastname" type="text">
				
					<span class="input__error">
						<span class="input__error__symbol">
							<SvgIcon iconType="warning"></SvgIcon>
						</span>
						<span class="input__error__label">Dit veld is verplicht</span>
					</span>
				</div>
			
				<div class="crewForm__theForm__submit">
					<button class="button button--pairing-brand-1" type="sumbit" ref="submit">
						<span class="button__label">Bevestigen</span>
					</button>
				</div>
			</form>	
		</div>

		<div class="crewForm__outer">
			<button @click="handleBackClick()" class="button button--pairing-neutrals-10">
				<span class="button__symbol">
					<SvgIcon iconType="arrowLeft"/>
				</span>
				<span class="button__label">Terug naar stewards</span>
			</button>
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./CrewForm.scss";</style>
<script src="./CrewForm.js"></script>
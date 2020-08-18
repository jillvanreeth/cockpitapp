<template>
	<div class="pincodeForm">
		
		<transition name="fade-in">
			<div v-if="isLoading" class="pincodeForm__loader">
				<Loader></Loader>
			</div>
		
			<div v-if="!isLoading" class="pincodeForm__inner">
				<header class="pincodeForm__header">
					<span class="pincodeForm__header__subtitle">Even bijsturen</span>
					<h2 class="heading heading--3 pincodeForm__header__title">Pincode vergeten?</h2>
				</header>
				
				<div class="pincodeForm__content">
					<p>Hou je inbox in de gaten. We sturen je een nieuwe pincode. Proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
				</div>

				<form @submit="handleSubmit" class="pincodeForm__theForm" novalidate>		
					<div class="pincodeForm__theForm__field" ref="email">
						<label class="input__label" for="email">E-mailadres</label>
						<input @input="handleKeyevent" v-model="inputs.email" class="input__field" name="email" type="email">
						
						<transition name="fade">
							<div class="input__error">
								<span class="input__error__symbol">
									<SvgIcon iconType="warning"></SvgIcon>
								</span>
								<span class="input__error__label">Dit veld is verplicht</span>
							</div>
						</transition>
					</div>
						
					<div class="pincodeForm__theForm__submit">
						<button class="button pincodeForm__theForm__theSubmit">
							<span class="button__label">Verzenden</span>
						</button>
					</div>
				</form>	
			</div>
		</transition>

	</div>
</template>

<style lang="scss" scoped>@import "./PincodeForm";</style>
<script src="./PincodeForm.js"></script>
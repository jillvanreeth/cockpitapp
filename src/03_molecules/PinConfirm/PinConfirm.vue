<template>
	<div class="pinConfirm">

		<div class="pinConfirm__inner">
			<header class="pinConfirm__header">
				<span class="pinConfirm__header__subtitle">Klaar om te verzenden</span>
				<h3 class="heading heading--3 pinConfirm__header__title">Bevestig met je pincode</h3>
			</header>

			<form @submit="handleSubmit" class="pinConfirm__form" novalidate>
						
				<div :class="['pinConfirm__form__field', {'is-invalid' : isInvalid}]">
					<label class="input__label">Pincode</label>

	 				<input v-model="pin" disabled class="input__field pinConfirm__input__field" type="password">
					<transition name="fade">
						<span class="input__error pinConfirm__form__error">
							<span class="input__error__symbol">
								<SvgIcon iconType="warning"></SvgIcon>
							</span>
							<span class="input__error__label">Foutive code</span>
						</span>
					</transition>
				</div>

				<div class="pinConfirm__form__field" ref="keyboard">
					<div class="pinConfirm__keyboard">
						<div v-for="(n, i) in 12" :key="i" @click="handleKeyClick(i)"  :class="['pinConfirm__keyboard__key', {'is-symbol' : i >= 10 }]">
							<span v-if="i == 10" class="pinConfirm__keyboard__key__symbol">
								<SvgIcon iconType="clearMobile"></SvgIcon>
							</span>
							<span v-else-if="i == 11" class="pinConfirm__keyboard__key__symbol">
								<SvgIcon iconType="deleteMobile"></SvgIcon>
							</span>
							<span v-else class="pinConfirm__keyboard__key__label">{{i}}</span>
						</div>
					</div>
				</div>

				<div class="pinConfirm__action">
					<button :disabled="isDisabled" class="button button--positive">
						<span class="button__label">Bevestigen</span>
					</button>
				</div>

			</form>
					
		</div>

	</div>
</template>


<style lang="scss" scoped>@import "./PinConfirm";</style>
<script src="./PinConfirm.js"></script>
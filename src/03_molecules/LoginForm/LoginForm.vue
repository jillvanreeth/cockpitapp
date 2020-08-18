<template>
	
	<section class="loginForm">
		
		<header class="loginForm__header">
			<span class="loginForm__header__subtitle">Welkom aan boord</span>
			<h2 class="heading heading--1 loginForm__header__title">Login</h2>
		</header>
		
		<transition name="fade-in" mode="out-in">
			<div v-if="isLoading" class="loginForm__loader">
				<Loader></Loader>
			</div>
		
			<div v-if="!isLoading" class="loginForm__inner">	
				<form @submit="handleSubmit" class="loginForm__theForm" novalidate>
					<div class="loginForm__theForm__inner" :class="noMatchingCredentials && 'is-invalid'">
						
						<div class="loginForm__theForm__field" ref="email">
							<label class="input__label" for="email">E-mail</label>
							<input @input="handleKeyevent" v-model="inputs.email" class="input__field" name="email" type="email" >
							
							<transition name="fade">
								<span class="input__error">
									<span class="input__error__symbol">
										<SvgIcon iconType="warning"></SvgIcon>
									</span>
									<span class="input__error__label">Dit veld is verplicht</span>
								</span>
							</transition>
						</div>
						
						<div class="loginForm__theForm__field" ref="pin">
							<label class="input__label" for="pin">Pincode</label>
							<input @input="handleKeyevent" v-model="inputs.pin" class="input__field" name="pin" type="password">
							
							<transition name="fade">
								<span class="input__error">
									<span class="input__error__symbol">
										<SvgIcon iconType="warning"></SvgIcon>
									</span>
									<span class="input__error__label">Dit veld is verplicht</span>
								</span>
							</transition>
						</div>

						<transition name="fade">
							<span class="input__error">
								<span class="input__error__symbol">
									<SvgIcon iconType="warning"></SvgIcon>
								</span>
								<span class="input__error__label">Deze combinatie van e-mailadres en wachtwoord is niet geldig</span>
							</span>
						</transition>
					</div>		

					<div class="loginForm__theForm__submit">
						<button class="button button--pairing-brand-2" type="sumbit" :disabled="isLoading || isDisabled">
							<span class="button__label">Login</span>

							<span class="button__symbol">
								<SvgIcon iconType="arrowRight" />
							</span>
						</button>
					</div>
				</form>	
			</div>
		</transition>

	</section>

</template>

<style lang="scss" scoped>@import "./LoginForm";</style>
<script src="./LoginForm.js"></script>
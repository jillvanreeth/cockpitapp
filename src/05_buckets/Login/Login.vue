<template>

	<div class="login">

		<transition name="fade" mode="out-in">	
			<div v-if="isLoading" class="login__preloader">	
				<header class="login__preloader__header">
					<div class="login__preloader__brand">
						<Brand></Brand>
					</div>

					<span class="login__preloader__header__subtitle">Een vlotte vaart regel je hier.</span>
					<h2 class="heading heading--0 login__preloader__header__title">Cockpit<br/> app</h2>
				</header>

				<div class="login__preloader__loader">
					<Loader></Loader>
				</div>	
			</div>

			<div v-if="!isLoading" class="login__theLogin">
				<div class="login__inner">
					<LoginForm></LoginForm>
				</div>

				<div class="login__outer">
					<span @click="handleClick('PincodeForm')" class="login__help">Pincode vergeten?</span>
				</div>
			</div>
		</transition>
	
	</div>
</template>

<style lang="scss">@import "./Login";</style>
<script src="./Login.js"></script>
<template>
	<div class="logoutConfirm">
		
		<header class="logoutConfirm__header">
			<span class="logoutConfirm__header__subtitle">Logout</span>
			<h2 class="heading heading--3 logoutConfirm__header__title">{{theContent.title}}</h2>
		</header>
		
		<div class="logoutConfirm__content">
			<p>{{theContent.body}}</p>
		</div>
		
		<div class="logoutConfirm__actions">
			<div class="logoutConfirm__action__item">
				<router-link @click.native="handleLogoutClick" to="/" :class="['button', {'button--pairing-neutrals-4' : !checklistIsCompleted || !flightIsCompleted}, {'button--brand-2' : checklistIsCompleted && flightIsCompleted}]">
					<span class="button__symbol">
						<SvgIcon iconType="logout"></SvgIcon>
					</span>
					<span class="button__label">Uitloggen</span>
				</router-link>
			</div>

			<div v-if="!flightIsCompleted && checklistIsCompleted" class="logoutConfirm__actions__item">
				<router-link @click.native="handleClick" to="/flight" class="button button--brand-2">
					<span class="button__symbol">
						<SvgIcon iconType="shipFront"></SvgIcon>
					</span>
					<span class="button__label">Naar huidige vaart</span>
				</router-link>
			</div>

			<div v-if="!checklistIsCompleted" class="logoutConfirm__actions__item">
				<router-link @click.native="handleClick" to="/checklist" class="button button--brand-2">
					<span class="button__symbol">
						<SvgIcon iconType="checklistFlat"></SvgIcon>
					</span>
					<span class="button__label">Naar checklist</span>
				</router-link>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./LogoutConfirm";</style>
<script src="./LogoutConfirm.js"></script>
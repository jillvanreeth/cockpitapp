<template>
	<div class="checklistConfirm">
		
		<transition name="fade" mode="out-in">
			<div v-if="!isSubmitted" :class="['checklistConfirm__inner', {'is-loading': isLoading}]">
			
				<header class="checklistConfirm__header">
					<span class="checklistConfirm__header__subtitle">Bevestigen</span>
					<h3 class="heading heading--3 checklistConfirm__header__title">Ben je zeker?</h3>
				</header>

				<div class="checklistConfirm__content">
					<p>Je checklist wordt onherroepelijk ingediend proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
				</div>

				<div class="checklistConfirm__submit">
					<button @click="handleSubmitClick" class="button button--positive checklistConfirm__theSubmit">
						<span class="button__label">Checklist indienen</span>
					</button>
				</div>
			</div>

			<div v-if="isSubmitted" class="checklistConfirm__inner">
				<header class="checklistConfirm__header">
					<span class="checklistConfirm__header__subtitle">Checklist ingediend</span>
					<h3 class="heading heading--3 checklistConfirm__header__title">Je bent klaar voor vertrek</h3>
				</header>

				<div class="checklistConfirm__content">
					<p>Je checklist wordt onherroepelijk ingediend proident consequat ut sint ullamco est officia officia nisi laboris aliquip.</p>
				</div>

				<div class="checklistConfirm__submit">
					<router-link @click.native="handleClick" to="/dashboard" class="button button--brand-2 checklistConfirm__theSubmit">
						<span class="button__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="button__label">Naar dashboard</span>
					</router-link>
				</div>
			</div>
		</transition>

		<transition name="fade">
			<div v-if="isLoading" class="checklistConfirm__loader">
				<Loader></Loader>
			</div>
		</transition>
	
	</div>
</template>

<style lang="scss" scoped>@import "./ChecklistConfirm";</style>
<script src="./ChecklistConfirm.js"></script>
<template>
	<section class="malfunctionsPanel">
		
		<transition name="fade" mode="out-in">

			<div v-if="isLoading" class="malfunctionsPanel__loader">
				<Loader></Loader>
			</div>

			<div v-if="!isLoading" class="malfunctionsPanel__inner">
				
				<Tracker :viewData="tracker"></Tracker>
				
				<div class="malfunctionsPanel__theSteps">
					<div class="malfunctionsPanel__theSteps__inner">
						<transition name="fade" mode="out-in">
							<router-view :viewData="viewData"></router-view>
						</transition>
					</div>
				</div>

				<div v-if="$route.params.id == 1" class="malfunctionsPanel__callout">
					<span class="malfunctionsPanel__callout__symbol">
						<SvgIcon iconType="lifebuoyFlat"></SvgIcon>
					</span>
					<span class="malfunctionsPanel__callout__label">Urgente storing? Bel steeds eerst het noodnummer</span>
				</div>
			</div>
		</transition>

		<div class="malfunctionsPanel__outer">
			<div class="malfunctionsPanel__nextBtn">
				<button v-if="$route.params.id != 3" :disabled="isDisabled" @click="handleNextClick" class="button button--bottom button--pairing-brand-1">
					<span class="button__label">Volgende</span>
					<span class="button__symbol">
						<SvgIcon iconType="arrowRight"></SvgIcon>
					</span>
				</button>

				<button v-if="$route.params.id == 3" @click="handleSubmit" class="button button--bottom button--pairing-positive">
					<span class="button__label">Versturen</span>
					<span class="button__symbol">
						<SvgIcon iconType="arrowRight"></SvgIcon>
					</span>
				</button>
			</div>
		</div>
	
	</section>
</template>


<style lang="scss" scoped>@import "./MalfunctionsPanel";</style>
<script src="./MalfunctionsPanel.js"></script>
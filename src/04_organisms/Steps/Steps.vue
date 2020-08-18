<template>
	<section class="steps">
		
		<div class="steps__inner">
			
			<Tracker :viewData="tracker"></Tracker>
			
			<div class="steps__theSteps">
				<transition name="fade" mode="out-in">
					<router-view 
						@emitIncompleteShift="emitIncompleteShift" 
						@emitNewShift="emitNewShift" 
						@emitResumedShift="emitResumedShift" :resumedFlightInfo="resumedFlightInfo">
						</router-view>
				</transition>
			</div>

		</div>

		<div class="steps__outer">

			<div v-if="tracker.activeStep > 1" class="steps__prevBtn">
				<button class="specialButton button--pairing-dark" @click="handlePrevClick()">
					<span class="specialButton__symbol">
						<SvgIcon iconType="arrowLeft"></SvgIcon>
					</span>
					<span class="specialButton__label">Vorige</span>
				</button>
			</div>
			
			<div :class="['steps__nextBtn', {'is-hidden' : isDisabled }]">
				<button :disabled="isDisabled" @click="tracker.activeStep == 4 ? handleSubmit() : handleNextClick()" class="button button--bottom button--pairing-brand-2">
					<span v-if="!resumedFlightInfo" class="button__label">{{ tracker.activeStep == 4 ? 'Naar checklist' : 'Volgende' }}</span>
					<span v-if="resumedFlightInfo" class="button__label">{{ tracker.activeStep == 4 ? 'Naar vaart' : 'Volgende' }}</span>
					<span class="button__symbol">
						<SvgIcon iconType="arrowRight"></SvgIcon>
					</span>
				</button>
			</div>
			
		</div>

	</section>
</template>

<style lang="scss" scoped>@import "./Steps";</style>
<script src="./Steps.js"></script>
<template>
	<section class="checklistPanel">

		<aside class="checklistPanel__aside">
			<div class="checklistPanel__aside__inner">
				
				<Loader v-if="isLoading"></Loader>

				<div v-show="!isLoading" class="checklistPanel__aside__item">
					<span class="checklistPanel__date__nameOfDay">
						<Date @loaded="isLoaded('nameOfDay')" dateType="nameOfDay"></Date>
					</span>	
					
					<span class="checklistPanel__date__theDate">
						<Date @loaded="isLoaded('date')" dateType="DD/MM/YYYY"></Date>
					</span>
				</div>
		
				<div class="checklistPanel__aside__item">
					<ChecklistNav v-if="activeChecklist" 
						:activeChecklist="activeChecklist" 
						:theChecklist="theChecklist[0]" 
						:currentStep="currentStep" 
						:currentSubStep="currentSubStep">							
					</ChecklistNav>
				</div>

			</div>
		</aside>
		
		<article class="checklistPanel__steps">
			<div class="checklistPanel__steps__inner">

				<transition name="fade" mode="out-in">
					<ChecklistContent v-if="activeChecklist && !checklistIsCompleted" 
						:emitChecklistOverview="emitChecklistOverview" 
						:emitChecklistProgress="emitChecklistProgress"  
						:checklistId="checklistId" 
						:activeChecklist="activeChecklist" 
						:currentStep="currentStep" 
						:currentSubStep="currentSubStep">	
					</ChecklistContent>
					
					<ChecklistOverview v-if="checklistIsCompleted"></ChecklistOverview>
				</transition>
				
				<transition name="fade" mode="out-in">
					<div v-if="!checklistIsCompleted" class="checklistPanel__steps__nextBtn">
						<button @click="handleNextClick" class="button button--pairing-brand-2" :disabled="nextIsDisabled">
							<span class="button__label">Volgende</span>
							<span class="button__symbol">
								<SvgIcon iconType="arrowRight"></SvgIcon>
							</span>
						</button>
					</div>

					<div v-if="checklistIsCompleted" class="checklistPanel__steps__readyBtn">
						<button @click="handleSubmit" class="button button--bottom button--pairing-positive" :disabled="activeChecklist && nextIsDisabled">
							<span class="button__label">Klaar voor vertrek</span>
							<span class="button__symbol">
								<SvgIcon iconType="arrowRight"></SvgIcon>
							</span>
						</button>
					</div>
				</transition>

			</div>
		</article>
		
	</section>
</template>

<style lang="scss" scoped>@import "./ChecklistPanel";</style>
<script src="./ChecklistPanel.js"></script>
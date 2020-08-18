<template>
	
	<div class="checklist">
		<div class="checklist__outer">
			
			<transition name="fade">
				<div v-if="currentTrack > 0" class="checklist__prevBtn">
					<button class="specialButton" @click="handlePrevClick">
						<span class="specialButton__symbol">
							<SvgIcon iconType="arrowLeft"></SvgIcon>
						</span>
						<span class="button__label">Vorige</span>
					</button>
				</div>
			</transition>
			
			<h2 class="heading heading--3 checklist__title">Checklist</h2>
	
			<div class="checklist__logout">
				<Logout></Logout>
			</div>
		</div>
		
		<div class="checklist__inner">
			<ChecklistPanel ref="ChecklistPanel" @emitChecklistTracker="checklistTracker" @stepIsSet="stepIsSet"></ChecklistPanel>	
		</div>

	</div>

</template>

<style lang="scss" scoped>@import "./Checklist";</style>
<script src="./Checklist.js"></script>
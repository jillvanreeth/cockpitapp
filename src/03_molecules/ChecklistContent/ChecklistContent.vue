<template>

	<Tree v-if="theChecklistId && activeSubChecklist"  
		@emitChecklistProgress="emitChecklistProgress"
		@emitChecklistOverview="emitChecklistOverview"
		:checklistId="theChecklistId" 
		:activeChecklistTitle="activeChecklistTitle" 
		:activeChecklistSubTitle="activeChecklistSubTitle" 
		:currentStep="currentStep" 
		:currentSubStep="currentSubStep"
		:nodes="activeSubChecklist" 
		:depth="0">
	</Tree>

</template>

<style lang="scss" scoped>@import "./ChecklistContent";</style>
<script src="./ChecklistContent.js"></script>

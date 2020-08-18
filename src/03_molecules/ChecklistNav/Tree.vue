<template>
	
	<div class="">tree</div>
	<!-- <div :class="stepOrSubStep">
		<div class="checklistNav__labelWrap">
			<div class="checklistNav__item__symbol">
				<span :class="['checklistNav__item__theSymbol', {'is-completed' : isCompleted}]">
					<SvgIcon iconType="anchor"></SvgIcon>
				</span>
			</div>
			<span class="checklistNav__item__label">{{ label }}</span> 

			<div v-if="nodes.length > 1 && depth == 1" class="checklistNav__checker">
				<span class="checklistNav__checker__label">{{nodes.length}}</span> 
				<span class="checklistNav__checker__symbol">
					<SvgIcon iconType="triangle"></SvgIcon>
				</span>
			</div>
		</div> -->

		<!-- <Tree :key="index" v-for="(node,index) in nodes" 
			:currentStep="currentStep" 
			:currentSubStep="currentSubStep" 
			:nodes="node.nodes"
			:label="node.label"
			:isCompleted="node.isCompleted" 
			:depth="depth + 1">
		</Tree>	 -->
	<!-- </div> -->

</template>	

<style lang="scss" scoped>@import "./ChecklistNav";</style>
<script src="./Tree.js"></script>

<template>

	<div :class="isRoot">

		<div v-if="activeChecklistTitle" class="checklistContent__header">
			<span class="checklistContent__header__title" >{{activeChecklistSubTitle}}</span>
		</div>
			
		<form v-if="theForms.length" v-for="(item, index) in theForms" class="checklistContent__form" novalidate>
		
			<div class="checklistContent__desc">		
 				<span class="checklistContent__desc__title">{{index + 1}}. {{item.title}}</span>
 				<p class="checklistContent__desc__body">{{item.desc}}</p>
 			</div>

 			<div class="checklistContent__fieldset">
 				<div v-show="item.unit !== 'N.v.t'" class="checklistContent__field">
 					<span class="checklistContent__input__helper">{{item.unit}}</span>
 					<input :disabled="item.unit == 'N.v.t'" v-model="theForms[index].entry.theValue" @input="handleInputChange(theForms[index])" class="checklistContent__input__field" type="number">
 				</div>
 			
	 			<div class="checklistContent__checkset">
	 				<div v-if="item.remarks != undefined" class="checklistContent__checkfield">
	 					<button @click.prevent="handleCommentsClick(item)" :class="['checklistContent__button', {'has-content' : item.remarks}]">
	 						<span class="checklistContent__button__symbol">
	 							<SvgIcon v-if="!item.remarks" iconType="pencil"></SvgIcon>
	 							<SvgIcon v-if="item.remarks" iconType="warning"></SvgIcon>
	 						</span>
	 					</button>
	 				</div>

	 				<div v-if="item.required" class="checklistContent__checkfield">
	 					<input v-model="theForms[index].checked" 
	 						@change="handleCheckChange(theForms[index])" 
	 						:id="`check-${item.id}`" 
	 						:value="`check-${item.id}`" 
	 						:class="[{'is-valid': theForms[index].checked && theForms[index].entry.theValue}, 'checklistContent__checkbox']" 
	 						type="checkbox">
					
	 					<label :for="`check-${item.id}`" class="checklistContent__checkFaker">
	 		  			<div class="checklistContent__check__symbol">
	 							<span class="checklistContent__check__theSymbol">
	 								<SvgIcon iconType="check"></SvgIcon>
	 							</span>
	 						</div>
	 					</label>
	 				</div>
	 			</div>
			</div> 

		</form>

	</div>
	
</template>


<style lang="scss" scoped>@import "./ChecklistContent";</style>
<script src="./Tree.js"></script>

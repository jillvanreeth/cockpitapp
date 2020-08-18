<template>

	<nav class="checklistNav">
	
		<ul v-for="(node, index) in theChecklist.nodes" class="checklistNav__list">
			
			<li :class="['checklistNav__list__item', {'is-open' : node.isActive}]">
				<div :class="['checklistNav__list__item__inner', {'is-active' : node.isActive}, {'is-completed' : node.isCompleted}]">
					<div class="checklistNav__item__symbol">
						<span :class="['checklistNav__item__theSymbol', {'is-completed' : node.isCompleted}]">
							<SvgIcon v-if="node.isCompleted" iconType="check"></SvgIcon>
							<SvgIcon v-if="!node.isCompleted" iconType="anchor"></SvgIcon>
						</span>
					</div>
					<span class="checklistNav__item__label">{{ node.label }}</span> 

					<!-- <div v-if="node.nodes.length > 1" class="checklistNav__checker">
						<span class="checklistNav__checker__label">0/{{node.nodes.length}}</span> 
						<span class="checklistNav__checker__symbol">
							<SvgIcon iconType="triangle"></SvgIcon>
						</span>
					</div> -->
				</div>
				
				<ul v-for="subnode in node.nodes" class="checklistNav__list--sub">
					<li class="checklistNav__list__item">
						<div :class="['checklistNav__list__item__inner', {'is-active' : subnode.isActive}, {'is-completed' : subnode.isCompleted}]">
							<div class="checklistNav__item__symbol">
								<span :class="['checklistNav__item__theSymbol', {'is-completed' : subnode.isCompleted}]">
									<SvgIcon v-if="subnode.isCompleted" iconType="check"></SvgIcon>
									<SvgIcon v-if="!subnode.isCompleted" iconType="anchor"></SvgIcon>
								</span>
							</div>
							<span class="checklistNav__item__label">{{ subnode.label }}</span> 
						</div>
					</li>
				</ul>
			</li>

		</ul>

	</nav>	
	
</template>

<style lang="scss" scoped>@import "./ChecklistNav";</style>
<script src="./ChecklistNav.js"></script>

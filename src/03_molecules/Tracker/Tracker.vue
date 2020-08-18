<template>
	
	<div class="tracker">
		<ul class="tracker__list">
			<li v-for="(step,index) in theSteps" class="tracker__list__item" :class="$route.params.id >= index+1 && 'is-active'">
				<div class="tracker__item__inner">
					<div class="tracker__item__box">
						<span class="tracker__item__box__label">{{index+1}}</span>
					</div>

					<span class="tracker__item__label">{{step}}</span>
				</div>
			</li>
		</ul>
	</div>

</template>

<style lang="scss">@import "./Tracker";</style>
<script src="./Tracker.js"></script>
<template>
	<div class="checklistOverview">
		
		<div v-if="isLoading" class="checklistOverview__loader">
			<Loader></Loader>
		</div>

		<div v-if="!isLoading" class="checklistOverview__inner">
			
			<article class="checklistOverview__item">
				
				<header class="checklistOverview__item__header">
					<span class="checklistOverview__item__header__symbol">
						<SvgIcon iconType="calendarFlat"></SvgIcon>
					</span>

					<h3 class="heading heading--6 checklistOverview__item__title">Dienst</h3>
				</header>

				<div class="checklistOverview__item__content">
					<ul class="checklistOverview__content__list">
						<li class="checklistOverview__content__listItem">
							<span class="checklistOverview__content__listItem__title">Traject</span>
										
							<div class="checklistOverview__content__listItem__data">
								<span class="checklistOverview__content__listItem__symbol">
									<SvgIcon iconType="anchorCircle"></SvgIcon>
								</span>
								
								<span class="checklistOverview__content__listItem__theContent">{{checklist.track.name}}</span>
							</div>
						</li>

						<li class="checklistOverview__content__listItem">
							<span class="checklistOverview__content__listItem__title">Dienstregeling</span>
										
							<div class="checklistOverview__content__listItem__data">
								<span class="checklistOverview__content__listItem__symbol">
									<SvgIcon iconType="calendarFlat"></SvgIcon>
								</span>
								
								<span class="checklistOverview__content__listItem__theContent">{{checklist.shift.name}}</span>
							</div>
						</li>

						<li class="checklistOverview__content__listItem">
							<span class="checklistOverview__content__listItem__title">Schip</span>
										
							<div class="checklistOverview__content__listItem__data">
								<span class="checklistOverview__content__listItem__symbol">
									<SvgIcon iconType="shipFront"></SvgIcon>
								</span>
								
								<span class="checklistOverview__content__listItem__theContent">{{checklist.ship.name}}</span>
							</div>
						</li>

						<li class="checklistOverview__content__listItem">
							<span class="checklistOverview__content__listItem__title">Kapitein</span>
										
							<div class="checklistOverview__content__listItem__data">
								<span class="checklistOverview__content__listItem__symbol">
									<SvgIcon iconType="wheel"></SvgIcon>
								</span>
								
								<span class="checklistOverview__content__listItem__theContent">{{checklist.captain.full_name}}</span>
							</div>
						</li>

						<li class="checklistOverview__content__listItem">
							<span class="checklistOverview__content__listItem__title">Steward(s)</span>
										
							<div class="checklistOverview__content__listItem__data">
								<span class="checklistOverview__content__listItem__symbol">
									<SvgIcon iconType="lifebuoyFlat"></SvgIcon>
								</span>
								
								<span class="checklistOverview__content__listItem__theContent">
									<template v-for="(steward,index) in stewards">{{index >= 1 ? ', ' : ''}}{{steward.full_name}}</template>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</article>

			<article v-for="node in checklistFromStorage.nodes" class="checklistOverview__item">
				
				<header class="checklistOverview__item__header">
					<span class="checklistOverview__item__header__symbol">
						<SvgIcon iconType="calendarFlat"></SvgIcon>
					</span>

					<h3 class="heading heading--6 checklistOverview__item__title">{{node.label}}</h3>
				</header>

				<div class="checklistOverview__item__details">
					<div v-for="subNode in node.nodes" class="checklistOverview__item__details__item">
						<span class="checklistOverview__details__title">{{subNode.label}}</span>
						
						<ul class="checklistOverview__details__list">
							<li v-for="subSubNode in subNode.nodes" class="checklistOverview__details__listItem">
								<span class="checklistOverview__details__listItem__title">{{subSubNode.details.name}}</span>
											
								<div class="checklistOverview__details__listItem__data">
									<span v-if="checklist" class="checklistOverview__details__listItem__theContent">
										{{subSubNode.details.unit !== 'n.v.t' ? getValue(subSubNode) : ''}} {{subSubNode.details.unit}}
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</article>
		</div>
	
	</div>
</template>


<style lang="scss" scoped>@import "./ChecklistOverview";</style>
<script src="./ChecklistOverview.js"></script>
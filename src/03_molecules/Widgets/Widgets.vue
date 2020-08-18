<template>
	<div class="widgets">
		<div class="widgets__inner">

			<router-link :to="`/flight`" 
				:disabled="viewData.flightInfo.complete == 1 && viewData.checklist.complete == 1 || !viewData.checklist" 
				:class="['widgets__item', {'is-completed' : viewData.flightInfo.complete == 1 && viewData.checklist.complete == 1}]">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">

							<div v-if="viewData.checklist.complete == 1 && viewData.flightInfo.complete == 1" class="widgets__item__symbol">
								<span class="widgets__item__theSymbol">
									<SvgIcon iconType="check"></SvgIcon>
								</span>
							</div>

							<div class="widgets__content">
								<span class="widgets__content__symbol">
									<svgIcon iconType="ship"></svgIcon>
								</span>	

								<span class="widgets__content__title">
									Start vaart
								</span>
							</div>
						</div>
					</div>
				</div>
			</router-link>

			<router-link :to="`/malfunctions`" class="widgets__item">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">
							<div class="widgets__content">
								
								<div v-if="viewData.malfunctions" :class="['widgets__item__symbol', {'is-active' : viewData.malfunctions}]">
									<span class="widgets__item__count">
										{{viewData.malfunctions}}
									</span>
								</div>

								<span class="widgets__content__symbol">
									<svgIcon iconType="megaphone"></svgIcon>
								</span>	

								<span class="widgets__content__title">
									Huidige storingen
								</span>

							</div>
						</div>
					</div>
				</div>
			</router-link>

			<router-link @click.native="handleChecklistClick" :to="`/start`" 
				:disabled="viewData.flightInfo.complete == 0 && viewData.checklist.complete == 0 && viewData.checklist.start_stop == 0" 
				:class="['widgets__item', {'is-completed' : viewData.checklist.complete == 1 && viewData.checklist.start_stop == 0}]">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">

							<div v-if="viewData.checklist.start_stop == 0 && viewData.checklist.complete == 1" class="widgets__item__symbol">
								<span class="widgets__item__theSymbol">
									<SvgIcon iconType="check"></SvgIcon>
								</span>
							</div>

							<div class="widgets__content">	
								<span class="widgets__content__symbol">
									<svgIcon iconType="checklist"></svgIcon>
								</span>	

								<span class="widgets__content__title">
									Checklist
								</span>
							</div>
						</div>
					</div>
				</div>
			</router-link>

			<div class="widgets__item">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">
							
						</div>
					</div>
				</div>
			</div>

			<router-link :to="`/notifications`" class="widgets__item">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">

							<div v-if="viewData.notifications" :class="['widgets__item__symbol', {'is-active' : viewData.notifications}]">
								<span class="widgets__item__count">
									{{viewData.notifications}}
								</span>
							</div>

							<div class="widgets__content">
									
								<span class="widgets__content__symbol">
									<svgIcon iconType="notifications"></svgIcon>
								</span>	

								<span class="widgets__content__title">
									Meldingen
								</span>

							</div>
						</div>
					</div>
				</div>
			</router-link>

			<router-link :to="`/help`" class="widgets__item">
				<div class="widgets__item__inner">
					<div class="widgets__item__sizer">
						<div class="widgets__item__sizerBox">
							<div class="widgets__content">
									
								<span class="widgets__content__symbol">
									<svgIcon iconType="lifebuoy"></svgIcon>
								</span>	

								<span class="widgets__content__title">
									Help &amp; Contact
								</span>

							</div>
						</div>
					</div>
				</div>
			</router-link>

		</div>
	</div>
</template>

<style lang="scss" scoped>@import "./Widgets";</style>
<script src="./Widgets.js"></script>
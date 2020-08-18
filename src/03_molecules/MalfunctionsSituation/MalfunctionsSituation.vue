<template>
	
	<div class="malfunctionsSituation">
		
		<h3 class="heading heading--3 malfunctionsSituation__title">Situeer de storing</h3>

		<div class="malfunctionsSituation__inner">
			
			<div class="malfunctionsSituation__loader">
				<Loader v-if="isLoading"></Loader>
			</div>
			
			<div class="malfunctionsSituation__slider">

				<div v-if="slider.visibleSlides.length" class="malfunctionsSituation__actions">
					<div class="malfunctionsSituation__actions__prev" @click="handleClick('prev')">
						<button class="directionalButton" :class="!slider.goToPrevSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowLeft"></SvgIcon>
							</span>
						</button>
					</div>
				
					<div class="malfunctionsSituation__actions__next" @click="handleClick('next')">
						<button class="directionalButton" :class="!slider.goToNextSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowRight"></SvgIcon>
							</span>
						</button>
					</div>
				</div>
				
				<div class="malfunctionsSituation__slider__inner">
					<div class="malfunctionsSituation__sliderTrack" ref="sliderTrack">
					
						<div v-for="(item, index) in slider.items" class="malfunctionsSituation__item" ref="item">
							<div class="malfunctionsSituation__item__inner">
								<div class="malfunctionsSituation__item__sizer">
									<div class="malfunctionsSituation__item__sizerWrap">
										<div class="malfunctionsSituation__item__content">
										
											<input @change="handleChange()" v-model="chosenMalfunction" :id="item.id" :value="item.title" class="malfunctionsSituation__radio" type="radio">
											<label :for="item.id" class="malfunctionsSituation__radioFaker">
												<div class="malfunctionsSituation__checked__symbol">
													<span class="malfunctionsSituation__checked__theSymbol">
														<SvgIcon iconType="check"></SvgIcon>
													</span>
												</div>

												<span class="malfunctionsSituation__item__symbol">
													<SvgIcon :iconType="item.icon"></SvgIcon>
												</span>

												<span class="malfunctionsSituation__item__label">{{item.title}}</span>
											</label>
										
										</div>
									</div>
								</div>
							</div>
						</div>
				
					</div>
				</div>

			</div>
		</div>
		
	</div>

</template>


<style lang="scss" scoped>@import "./MalfunctionsSituation";</style>
<script src="./MalfunctionsSituation.js"></script>

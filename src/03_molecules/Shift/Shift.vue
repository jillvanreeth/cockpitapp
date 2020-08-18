<template>
	<div class="shift">
		
		<div v-show="isLoading" class="shift__loader">
			<Loader colorMode="dark"></Loader>
		</div>

		<div v-if="!isLoading" class="shift__inner">
			
			<h3 class="heading heading--3 shift__title">Kies een dienst</h3>

			<div class="shift__slider">
				
				<div v-if="slider.visibleSlides.length" class="shift__actions">
					<div class="shift__actions__prev" @click="handleClick('prev')">
						<button class="directionalButton" :class="!slider.goToPrevSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowLeft"></SvgIcon>
							</span>
						</button>
					</div>
				
					<div class="shift__actions__next" @click="handleClick('next')">
						<button class="directionalButton" :class="!slider.goToNextSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowRight"></SvgIcon>
							</span>
						</button>
					</div>
				</div>
				
				<div class="shift__slider__inner">
					<div class="shift__sliderTrack" ref="shift__sliderTrack">
					
						<div v-for="(item, index) in slider.items" class="shift__item" ref="shift__item">
							<div class="shift__item__inner">
								<div class="shift__item__sizer">
									<div class="shift__item__sizerWrap">
										<div class="shift__item__content">
										
											<input @change="handleChange()" v-model="chosenShiftId" :id="item.id" :value="item.id" class="shift__radio" type="radio">
											<label :for="item.id" class="shift__radioFaker">
												<div class="shift__checked__symbol">
													<span class="shift__checked__theSymbol">
														<SvgIcon iconType="check"></SvgIcon>
													</span>
												</div>

												<span class="shift__item__symbol">
													<SvgIcon iconType="calendar"></SvgIcon>
												</span>

												<div class="shift__item__label">
													<span class="shift__item__label__name">{{item.name}}</span>
													<span class="shift__item__label__count">{{item.id}}</span>
													<span v-if="item.isIncomplete" class="shift__item__label__status">Onvoltooid</span>
												</div>
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

<style lang="scss" scoped>@import "./Shift";</style>
<script src="./Shift.js"></script>
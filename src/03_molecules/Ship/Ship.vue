<template>
	<div class="ship">
		
		<div v-if="isLoading" class="ship__loader">
			<Loader colorMode="dark"></Loader>
		</div>

		<div v-if="!isLoading" class="ship__inner">
			
			<h3 class="heading heading--3 ship__title">Kies een schip</h3>
			
			<div class="ship__slider">

				<div v-if="slider.visibleSlides.length" class="ship__actions">
					<div class="ship__actions__prev" @click="handleClick('prev')">
						<button class="directionalButton" :class="!slider.goToPrevSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowLeft"></SvgIcon>
							</span>
						</button>
					</div>
				
					<div class="ship__actions__next" @click="handleClick('next')">
						<button class="directionalButton" :class="!slider.goToNextSlide && 'is-disabled'">
							<span class="directionalButton__symbol">
								<SvgIcon iconType="arrowRight"></SvgIcon>
							</span>
						</button>
					</div>
				</div>
				
				<div class="ship__slider__inner">
					<div class="ship__sliderTrack" ref="ship__sliderTrack">
					
						<div v-for="(item, index) in slider.items" class="ship__item" ref="ship__item">
							<div class="ship__item__inner">
								<div class="ship__item__sizer">
									<div class="ship__item__sizerWrap">
										<div class="ship__item__content">
										
											<input @change="handleChange()" v-model="chosenShip" :id="item.id" :value="item.id" class="ship__radio" type="radio">
											<label :for="item.id" class="ship__radioFaker">
												<div class="ship__checked__symbol">
													<span class="ship__checked__theSymbol">
														<SvgIcon iconType="check"></SvgIcon>
													</span>
												</div>

												<span class="ship__item__symbol">
													<SvgIcon iconType="ship"></SvgIcon>
												</span>

												<span class="ship__item__label">{{item.name}}</span>
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

<style lang="scss" scoped>@import "./Ship";</style>
<script src="./Ship.js"></script>
<template>
	
	<transition name="fade" mode="out-in">

		<div v-if="!showCrewForm" @getStewards="getStewards" class="crew">
			
			<div v-if="isLoading" class="crew__loader">
				<Loader colorMode="dark"></Loader>
			</div>

			<div v-if="!isLoading" class="crew__inner">
				
				<h3 class="heading heading--3 crew__title">Selecteer stewards</h3>
			
				<div v-if="slider.crewMembers.length" class="crew__slider__outer">
					<div class="crew__slider__info">
						<span class="crew__slider__info__label">{{slider.crewMembers.length > 1 ? slider.crewMembers.length + ' resultaten' : slider.crewMembers.length + ' resultaat'}}</span>
					</div>
					
					<div class="crew__slider__actions">
						<div class="crew__slider__actions__item">
							<button @click="toggleCrewForm" class="button button--small button--pairing-brand-1">
								<span class="button__symbol">
									<SvgIcon iconType="groupAdd"></SvgIcon>
								</span>
								<span class="button__label">Toevoegen</span>
							</button>
						</div>

						<div class="crew__slider__actions__item">
							<label class="input__select crew__slider__actions__select">
								<select v-model="selectedFilter">
									<option default>A-Z</option>
									<option v-for="letter in crewFilters" :value="letter">{{letter}}</option>
								</select>

								 <span class="input__select__symbol crew__slider__actions__select__symbol">
								 		<SvgIcon iconType="triangle"></SvgIcon>
								 </span>
							</label>
						</div>
					</div>
				</div>

				<div class="crew__slider">
					<div v-if="slider.crewMembers.length > 9" class="crew__slider__btns">
						<div class="crew__slider__btns__prev">
							<button @click="handleSliderClick('prev')" class="directionalButton" :class="!slider.goToPrevSlide && 'is-disabled'">
								<span class="directionalButton__symbol">
									<SvgIcon iconType="arrowLeft"></SvgIcon>
								</span>
							</button>
						</div>
					
						<div class="crew__slider__btns__next">
							<button @click="handleSliderClick('next')" class="directionalButton" :class="!slider.goToNextSlide && 'is-disabled'">
								<span class="directionalButton__symbol">
									<SvgIcon iconType="arrowRight"></SvgIcon>
								</span>
							</button>
						</div>
					</div>
					
					<div class="crew__slider__wrap">
						<div class="crew__sliderTrack" ref="crew__sliderTrack">

							<div v-for="n in Math.ceil(slider.crewMembers.length / 9)" class="crew__slide" ref="crew__slide">
							  <div v-for="(item,index) in slider.crewMembers.slice((n - 1) * 9, n * 9)" class="crew__slide__item">
							  	
							  	<div class="crew__slide__item__inner">
							  		<input @change="handleChange()" v-model="chosenCrew" :value="item.id" :id="item.id" class="crew__radio" type="checkbox">
							  		
							  		<label :for="item.id" class="crew__radioFaker">
							  			<div class="crew__checked__symbol">
												<span class="crew__checked__theSymbol">
													<SvgIcon iconType="check"></SvgIcon>
												</span>
											</div>
											
							  			<div class="crew__slide__mugshot">
							  				<div class="crew__slide__mugshot__sizer">
							  					<div class="crew__slide__mugshot__inner">
							  						<img v-if="item.picture" class="crew__slide__mugshot__visual" :src="item.picture"/>
							  						<span v-else class="crew__slide__mugshot__symbol">
							  							<SvgIcon iconType="personFlat"></SvgIcon>
							  						</span>
							  					</div>
							  				</div>
							  			</div>

							  			<div class="crew__slide__name">
							  				<span class="crew__slide__firstName">{{item.id}} {{item.firstname}}</span>
							  				<span class="crew__slide__lastName">{{item.lastname}}</span>
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
	
		<CrewForm v-if="showCrewForm" @getStewards="getStewards" @showCrewForm="toggleCrewForm"></CrewForm>
	</transition>
	
</template>

<style lang="scss" scoped>@import "./Crew";</style>

<script src="./Crew.js"></script>

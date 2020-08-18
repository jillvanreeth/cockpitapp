<template>
	<div class="flightNext">

		<div class="flightNext__inner">
			
			<div class="flightNext__timeManager">
				<transition name="fade">	
					<div v-if="isLoading && !timeIsloaded" class="flightNext__timeManager__loader">
						<Loader></Loader>
					</div>
				</transition>

				<div :class="['flightNext__timeManager__inner',{'is-loaded' : !isLoading && timeIsloaded} ]">
					<span class="flightNext__timeManger__label">
						<!-- CURRENT TIME -->
						<Time @emitLoaded="isLoaded(true)"></Time>
					</span>

					<span class="flightNext__timeManger__label"><strong>{{timeOfDeparture(theNextStop.departure)}}</strong></span>

					<div class="flightNext__timeManger__estimatedTime">
						<span class="flightNext__timeManger__symbol">
							<SvgIcon iconType="goal"></SvgIcon>
						</span>
						<!-- TIME LEFT TO ARRIVE AT CURRENT STOP -->
						<span class="flightNext__timeManger__estimatedTime__label">{{timeRemaining}}</span>
					</div>
				</div>
			</div>
			
			<transition name="fade">	
				<div :class="['flightNext__theStop', {'is-last' : !theSecondStop}]">
					<div class="flightNext__theStop__inner">
						<header class="flightNext__theStop__inner__header">
							<span class="flightNext__theStop__inner__label">{{theSecondStop ? 'Huidige halte' : 'Volgende halte'}}</span>
							<h3 class="heading heading--1 flightNext__theStop__title">{{theNextStop.stop.name}}</h3>
						</header>
						
						<div class="flightNext__actions">
							<transition name="fade">
								<div v-if="theSecondStop" @click="handleSkipClick" class="flightNext__actions__item">
									<button class="button button--pairing-theme-1">
										<span class="button__label">Halte overslaan</span>
									</button>
								</div>
							</transition>

							<div class="flightNext__actions__item">
								<button @click="handleArrivedClick" class="button button--pairing-brand-2">
									<span class="button__symbol">
										<SvgIcon iconType="anchorFlat"></SvgIcon>
									</span>
									<span class="button__label">Aangekomen aan halte</span>
								</button>
							</div>

						</div>	
					</div>

					<div v-if="theSecondStop" class="flightNext__theStop__outer">
						<div class="flightNext__theStop__outer__content">
							<span class="flightNext__theStop__outer__symbol">
								<SvgIcon iconType="anchorCircle"></SvgIcon>
							</span>
							<span class="flightNext__theStop__outer__label">{{theSecondStop.stop.name}}</span>
							<span class="flightNext__theStop__outer__time">{{timeOfDeparture(theSecondStop.departure)}}</span>
						</div>
					</div>
				</div>
		</transition>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>@import "./FlightNext";</style>
<script src="./FlightNext.js"></script>
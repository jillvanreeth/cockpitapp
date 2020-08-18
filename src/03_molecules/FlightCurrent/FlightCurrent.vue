<template>
	<div class="flightCurrent">
			
		<div class="flightCurrent__inner">

			<div class="flightCurrent__timeManager">
				<transition name="fade">	
					<div v-if="isLoading && !timeIsloaded" class="flightCurrent__timeManager__loader">
						<Loader></Loader>
					</div>
				</transition>

				<div :class="['flightCurrent__timeManager__inner',{'is-loaded' : !isLoading && timeIsloaded} ]">
					<span class="flightCurrent__timeManager__symbol">
						<SvgIcon iconType="goal"></SvgIcon>
					</span>
					
					<!-- CURRENT TIME -->
					<div class="flightCurrent__timeManager__currentTime">
						<Time @emitLoaded="isLoaded(true)"></Time>
					</div>

					<div class="flightCurrent__timeManager__departTime">
						<span v-if="secondStop" class="flightCurrent__timeManager__departTime__symbol">
							<SvgIcon iconType="nextStop"></SvgIcon>
						</span>
						<!-- TIME TO DEPART TO SECOND STOP -->
						<span class="flightCurrent__timeManager__departTime__label">{{theSecondStop ? timeOfDeparture(theSecondStop.departure) : getTimeDiff(this.theTimeStamp)}}</span>
					</div>
				</div>
			</div>
			
			<transition name="fade">	
				<div :class="['flightCurrent__theStop', {'is-last' : !theSecondStop}]">
					<div class="flightCurrent__theStop__inner">
						<header class="flightCurrent__theStop__header">
							<span class="flightCurrent__theStop__header__label">{{theSecondStop ? 'Huidige halte' : 'Eind halte'}}</span>
							<h3 class="heading heading--1 flightCurrent__theStop__title">{{$store.state.nextStop.stop.name}}</h3>
						</header>
						
						<div class="flightCurrent__actions">
							<div v-if="theSecondStop" class="flightCurrent__actions__item">
								<button @click="handleGoToNextStop" class="button button--positive">
									<span class="button__symbol flightCurrent__actions__button__symbol">
										<SvgIcon iconType="nextStop"></SvgIcon>
									</span>
									<span class="button__label">Naar volgende halte binnen <span v-if="theTimeRemaining" class="flightCurrent__actions__timeLabel">{{theTimeRemaining}}</span></span>
								</button>
							</div>

							<div v-if="theSecondStop" class="flightCurrent__actions__item">
								<button @click="handlePassengersClick" class="button button--theme-1">
									<span class="button__symbol">
										<SvgIcon iconType="plusMinCircle"></SvgIcon>
									</span>
									<span class="button__label">Passagiers</span>
								</button>
							</div>

							<div v-if="!theSecondStop" class="flightCurrent__actions__item">
								<button @click="handleShiftClick" class="button button--pairing-theme-1">
									<span class="button__label">Extra dienstregeling varen</span>
								</button>
							</div>

							<div v-if="!theSecondStop" class="flightCurrent__actions__item">
								<button @click="handleFinishClick" class="button button--positive">
									<span class="button__symbol">
										<SvgIcon iconType="checkCircle"></SvgIcon>
									</span>
									<span class="button__label">Dienst beëindigen</span>
								</button>
							</div>
						</div>
					</div>
					
					<div v-if="secondStop" class="flightCurrent__theStop__outer">
						<div class="flightCurrent__theStop__outer__content">
							<span class="flightCurrent__theStop__outer__symbol">
								<SvgIcon iconType="anchorCircle"></SvgIcon>
							</span>
							<span class="flightCurrent__theStop__outer__label">{{theSecondStop.stop.name}}</span>
							<span class="flightCurrent__theStop__outer__time">{{timeOfDeparture(theSecondStop.departure)}}</span>
						</div>
					</div>
				</div>
			</transition>
		</div>
	
	</div>
</template>


<style lang="scss" scoped>@import "./FlightCurrent";</style>
<script src="./FlightCurrent.js"></script>
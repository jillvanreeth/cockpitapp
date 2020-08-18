<template>
	<section class="flightPanel">
			
		<div class="flightPanel__stops">

			<div class="flightPanel__stops__bg">
				<SvgIcon iconType="anchorCircle"></SvgIcon>
			</div>

			<transition key="parent" name="fade" mode="out-in">
				
				<div v-if="isLoading" class="flightPanel__loader">
					<Loader></Loader>
				</div>

				<div v-if="!isLoading" class="flightPanel__stops__inner">
					<div class="flightPanel__actions">
						<div class="flightPanel__actions__item">
							<button @click="handleStopClick" class="specialButton button--theme-1 flightPanel__actions__item__button">
								<span class="specialButton__symbol flightPanel__actions__item__symbol">
									<SvgIcon iconType="powerOff"></SvgIcon>
								</span>
							</button>
						</div>

						<div class="flightPanel__actions__item">
							<button @click="handleNotificationsClick" class="specialButton flightPanel__actions__item__button">
								<span class="specialButton__symbol flightPanel__actions__item__symbol">
									<SvgIcon iconType="notificationsFlat"></SvgIcon>
								</span>
								<span v-if="newNotification" :class="{'flightPanel__actions__alert' : newNotification}">{{notifications.length}}</span>
							</button>
						</div>	

						<div class="flightPanel__actions__item">	
							<router-link to="/flight/edit" class="specialButton flightPanel__actions__item__button">
								<span class="specialButton__symbol flightPanel__actions__item__symbol">
									<SvgIcon iconType="settingsFlat"></SvgIcon>
								</span>
							</router-link>
						</div>	
					</div>


					<!-- FLIGHTNEXT & FLIGHTCURRENT GETS RENDERED HERE -->
					<router-view :flightInfo="flightInfo" :nextStop="nextStop" :secondStop="secondStop" :timeRemaining="timeRemaining"></router-view>
		
					<div class="flightPanel__boardingData">
						<div class="flightPanel__boardingData__item">
							<span class="flightPanel__boardingData__capacity"><strong :class="{'is-invalid' : passengers.people.current_people > flightInfo.max_people}">{{passengers.people.current_people}}</strong>/{{flightInfo.max_people}}</span>
						</div>

						<div :class="['flightPanel__boardingData__item', {'is-invalid' : passengers.people.current_people > flightInfo.max_people}]">
							<span class="flightPanel__boardingData__item__symbol">
								<SvgIcon iconType="passengersFlat"></SvgIcon>
							</span>	

							<span class="flightPanel__boardingData__item__label">{{passengers.people.current_people}}</span>
						</div>

						<div :class="['flightPanel__boardingData__item', {'is-invalid' : passengers.bikes.current_bikes > flightInfo.max_bikes}]">
							<span class="flightPanel__boardingData__item__symbol">
								<SvgIcon iconType="bikeFlat"></SvgIcon>
							</span>	

							<span class="flightPanel__boardingData__item__label">{{passengers.bikes.current_bikes}}</span>
						</div>
					</div>
				</div>			
			</transition>
		
		</div>
	</section>
</template>


<style lang="scss" scoped>@import "./FlightPanel";</style>
<script src="./FlightPanel.js"></script>
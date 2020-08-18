<template>
	<section class="flightOverview">
		
		<transition name="fade" mode="out-in">
			<div v-if="isLoading" class="flightOverview__loader">
				<Loader></Loader>	
			</div>

			<div v-if="!isLoading" class="flightOverview__content">
				<div class="flightOverview__inner">
					<div class="flightOverview__summary">
						<div class="flightOverview__summary__inner">
							
							<div class="flightOverview__flightInfo">
								<span class="flightOverview__flightInfo__dateDay"><Date dateType="nameOfDay"></Date></span>
								<span class="flightOverview__flightInfo__date"><Date dateType="DD/MM/YYYY"></Date></span>
								
								<div class="flightOverview__flightInfo__trackInfo">
									<div class="flightOverview__flightInfo__theTrack">
										<span class="flightOverview__flightInfo__theTrack__symbol">
											<SvgIcon iconType="anchorCircle"></SvgIcon>
										</span>
										<span class="flightOverview__flightInfo__theTrack__label">{{flightInfo.track.name}}</span>
									</div>
									
									<div class="flightOverview__flightInfo__theShift">
										<span class="flightOverview__flightInfo__theShift__label">{{flightInfo.current_shift.name}}</span>
									</div>
								</div>
							</div>
								
							<div class="flightOverview__passengersInfo">
								<span class="flightOverview__subtitle">Vervoerde passagiers deze vaart</span>
								
								<div class="flightOverview__passengersInfo__total">
									<div class="flightOverview__passengersInfo__total__item">	
										<span class="flightOverview__passengersInfo__total__symbol">
											<SvgIcon iconType="passengers"></SvgIcon>
										</span>

										<span class="flightOverview__passengersInfo__total__label">{{flightInfo.total_people}}</span>
									</div>

									<div class="flightOverview__passengersInfo__total__item">	
										<span class="flightOverview__passengersInfo__total__symbol">
											<SvgIcon iconType="bike"></SvgIcon>
										</span>

										<span class="flightOverview__passengersInfo__total__label">{{flightInfo.total_bikes}}</span>
									</div>
								</div>
							</div>

							<div class="flightOverview__notifications">
								<span class="flightOverview__subtitle">Meldingen</span>

								<div class="flightOverview__notifications__inner">
									<ul class="flightOverview__notifications__list">
										<li @click="handleNotificationsClick(notification)" v-for="(notification,index) in theNotifications" :key="index" class="flightOverview__notifications__list__item">
											<div class="flightOverview__notifications__item__content">
												<span class="flightOverview__notifications__content__time">{{formatTimeOfNotification(notification)}}</span>

												<span class="flightOverview__notifications__content__label">{{notification.message}}</span>
												
												<span class="flightOverview__notifications__content__symbol">
													<SvgIcon iconType="spyglass"></SvgIcon>
												</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div class="flightOverview__overview">
						<ul class="flightOverview__list">
							<li v-for="(item,index) in theItems" :key="index" ref="theItems" class="flightOverview__list__item">
								<div class="flightOverview__item__content">
									<span class="flightOverview__content__symbol">
										<SvgIcon iconType="anchorCircle"></SvgIcon>
									</span>

									<span class="flightOverview__content__label">{{item.stop.name}}</span>
									
									<span v-if="item.departured" class="flightOverview__content__timeDiff">{{getTimeDiff(item)}}</span>
									<span v-if="item.departured" class="flightOverview__content__time">{{departured(item.departured)}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="flightOverview__actions">
					<router-link to="/dashboard" class="button button--bottom button--pairing-brand-2 flightOverview__actions__button">
						<span class="button__symbol flightOverview__actions__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="button__label">Naar dashboard</span>
					</router-link>
				</div>	
			</div>
		</transition>
	</section>
</template>

<style lang="scss" scoped>@import "./FlightOverview";</style>
<script src="./FlightOverview.js"></script>
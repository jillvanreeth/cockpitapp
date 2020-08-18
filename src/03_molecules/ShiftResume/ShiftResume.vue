<template>
	<div class="shiftResume">
		
		<div v-if="isLoading" class="shiftResume__loader">
			<Loader colorMode="dark"></Loader>
		</div>

		<div v-if="!isLoading" class="shiftResume__inner">
			<header class="shiftResume__header">
				<h3 class="heading heading--3 shiftResume__header__title">Vaart onvoltooid</h3>
				
				<p class="shiftResume__header__desc">Er is een vaart onvoltooid op uw gekozen dienstregeling.</p>
			</header>
		
			<div class="shiftResume__content">
				<header class="shiftResume__content__header">
					<span class="shiftResume__content__header__symbol">
						<SvgIcon iconType="anchorCircle"></SvgIcon>
					</span>

					<h4 class="heading heading--4 shiftResume__content__title">{{nextStop.stop.name}} &bullet; {{timeOfDeparture(nextStop.hour.departure)}}</h4>
				</header>

				<ul class="shiftResume__content__list">
					
					<li class="shiftResume__content__listItem">
						<span class="shiftResume__content__listItem__title">Dienstregeling</span>
									
						<div class="shiftResume__content__listItem__data">
							<span class="shiftResume__content__listItem__symbol">
								<SvgIcon iconType="calendarFlat"></SvgIcon>
							</span>
							
							<span class="shiftResume__content__listItem__theContent">{{shift}}</span>
						</div>
					</li>

					<li class="shiftResume__content__listItem">
						<span class="shiftResume__content__listItem__title">Schip</span>
									
						<div class="shiftResume__content__listItem__data">
							<span class="shiftResume__content__listItem__symbol">
								<SvgIcon iconType="shipFront"></SvgIcon>
							</span>
							
							<span class="shiftResume__content__listItem__theContent">{{flightInfo.current_ship.name}}</span>
						</div>
					</li>

					<li class="shiftResume__content__listItem">
						<span class="shiftResume__content__listItem__title">Kapitein</span>
									
						<div class="shiftResume__content__listItem__data">
							<span class="shiftResume__content__listItem__symbol">
								<SvgIcon iconType="wheel"></SvgIcon>
							</span>
							
							<span class="shiftResume__content__listItem__theContent">{{flightInfo.captain.full_name}}</span>
						</div>
					</li>

					<li v-if="flightInfo.stewards.length" class="shiftResume__content__listItem">
						<span class="shiftResume__content__listItem__title">Steward(s)</span>
									
						<div class="shiftResume__content__listItem__data">
							<span class="shiftResume__content__listItem__symbol">
								<SvgIcon iconType="lifebuoyFlat"></SvgIcon>
							</span>
							
							<span class="shiftResume__content__listItem__theContent">{{flightInfo.stewards}}</span>
						</div>
					</li>
				</ul>
			</div>
		
			<div class="shiftResume__actions">
				<div class="shiftResume__actions__item">
					<button @click="handleResumeShiftClick" class="button button--brand-2">
						<span class="button__label">Vaart verderzetten</span>
					</button>
				</div>
		
				<div class="shiftResume__actions__item">
					<button @click="handleNewShiftClick" class="button button--pairing-neutrals-4">
						<span class="button__label">Nieuwe vaart starten</span>
					</button>
				</div>
			</div>
		</div>
	
	</div>
</template>


<style lang="scss" scoped>@import "./ShiftResume";</style>
<script src="./ShiftResume.js"></script>
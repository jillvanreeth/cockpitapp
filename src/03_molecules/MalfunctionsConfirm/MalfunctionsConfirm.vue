<template>
	<div class="malfunctionsConfirm">
		
		<transition name="fade" mode="in-out">
			<div v-if="isLoading" class="malfunctionsDetail__loader">
				<Loader></Loader>
			</div>
		
			<div v-if="!isLoading" class="malfunctionsConfirm__inner">
				<h3 class="heading heading--3 malfunctionsConfirm__title">Storing op traject</h3>
				
				<div class="malfunctionsConfirm__content">
					
					<div class="malfunctionsConfirm__flightInfo">
						<div class="malfunctionsConfirm__flightInfo__item">
							<span class="malfunctionsConfirm__flightInfo__item__symbol">
								<SvgIcon iconType="calendarFlat"></SvgIcon>
							</span>

							<span class="malfunctionsConfirm__flightInfo__item__label">{{theFlightInfo.created_at}}</span>
						</div>

						<div class="malfunctionsConfirm__flightInfo__item">
							<span class="malfunctionsConfirm__flightInfo__item__symbol">
								<SvgIcon iconType="anchorCircle"></SvgIcon>
							</span>

							<span class="malfunctionsConfirm__flightInfo__item__label">{{theFlightInfo.current_shift.name}}</span>
						</div>

						<div class="malfunctionsConfirm__flightInfo__item">
							<span class="malfunctionsConfirm__flightInfo__item__symbol">
								<SvgIcon iconType="shipFront"></SvgIcon>
							</span>

							<span class="malfunctionsConfirm__flightInfo__item__label">{{theFlightInfo._ship}}</span>
						</div>
					</div>

					<div class="malfunctionsConfirm__remark">
						<span class="malfunctionsConfirm__remark__label">{{theFlightInfo._situation}}</span>

						<div class="malfunctionsConfirm__remark__box">
							<span class="malfunctionsConfirm__remark__box__content">{{theFlightInfo._remark}}</span>
						</div>
					</div>	

				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>@import "./MalfunctionsConfirm";</style>
<script src="./MalfunctionsConfirm.js"></script>
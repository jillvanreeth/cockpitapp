<template>
	<div :class="['malfunctionsDetail', {'is-urgent' : theMalfunction.urgent}]">
		
		<transition name="fade" mode="in-out">
			<div v-if="isLoading" class="malfunctionsDetail__loader">
				<Loader></Loader>
			</div>
		</transition>
		
		<div :class="['malfunctionsDetail__inner', {'is-loading' : isLoading}]">
			<header class="malfunctionsDetail__header">
				<div class="malfunctionsDetail__header__group">
					<span class="malfunctionsDetail__header__symbol">
						<SvgIcon iconType="warning"></SvgIcon>	
					</span>

					<span class="malfunctionsDetail__header__subtitle">Storing</span>
				</div>
				
				<h3 class="heading heading--3 malfunctionsDetail__header__title">{{theMalfunction.category}}</h3>
			</header>

			<div class="malfunctionsDetail__content" >
				
				<div class="malfunctionsDetail__content__item">
					<div class="malfunctionsDetail__desc">
						<p>{{theMalfunction.remarks}}</p>
					</div>

					<div class="malfunctionsDetail__visual">
						<button @click="handlePhotoClick" class="button button--brand-1">
							<span class="button__symbol">
								<SvgIcon iconType="camera"></SvgIcon>
							</span>
							<span class="button__label">Bekijk foto</span>
						</button>
					</div>
				</div>
						
				<div class="malfunctionsDetail__content__item">
					<div class="malfunctionsDetail__info">
						<ul class="malfunctionsDetail__info__list">
							<li class="malfunctionsDetail__info__listItem">
								<span class="malfunctionsDetail__info__title">Datum &amp; tijd</span>
								
								<div class="malfunctionsDetail__info__data">
									<span class="malfunctionsDetail__info__data__symbol">
										<SvgIcon iconType="calendarFlat"></SvgIcon>
									</span>
									
									<span class="malfunctionsDetail__info__data__theContent ff--bold">
										 {{formatDateOfMalfunction(theMalfunction)}} <span>&bullet;</span> {{formatTimeOfMalfunction(theMalfunction)}}
									</span>
								</div>
							</li>

							<li class="malfunctionsDetail__info__listItem">
								<span class="malfunctionsDetail__info__title">Dienstregeling</span>
								
								<div class="malfunctionsDetail__info__data">
									<span class="malfunctionsDetail__info__data__symbol">
										<SvgIcon iconType="anchorCircle"></SvgIcon>
									</span>
									
									<span class="malfunctionsDetail__info__data__theContent">{{theFlightInfo.current_shift.name}}</span>
								</div>
							</li>

							<li class="malfunctionsDetail__info__listItem">
								<span class="malfunctionsDetail__info__title">Kapitein</span>
								
								<div class="malfunctionsDetail__info__data">
									<span class="malfunctionsDetail__info__data__symbol">
										<SvgIcon iconType="wheel"></SvgIcon>
									</span>
									
									<span class="malfunctionsDetail__info__data__theContent">{{theMalfunction.captain.full_name}}</span>
								</div>
							</li>

							<li v-if="theMalfunction.urgent" :class="['malfunctionsDetail__info__listItem', {'is-urgent' : theMalfunction.urgent}]">
								<span class="malfunctionsDetail__info__title">Urgentie</span>
								
								<div class="malfunctionsDetail__info__data">
									<span class="malfunctionsDetail__info__data__symbol">
									</span>
									
									<span class="malfunctionsDetail__info__data__theContent">Dringend</span>
								</div>
							</li>
						</ul>

						<!-- <div class="malfunctionsDetail__actions">
							<router-link to="/help" :class="['button', theMalfunction.urgent ? 'button--theme-1' : 'button--brand-1']">
								<span class="button__label">Help &amp; contact</span>
							</router-link>
						</div> -->
					</div>

					
				</div>

			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>@import "./MalfunctionsDetail";</style>
<script src="./MalfunctionsDetail.js"></script>
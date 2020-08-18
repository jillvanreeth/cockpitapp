<template>
	<div class="sideInfo">

		<div class="sideInfo__inner">
			
			<transition name="fade">
				<div class="sideInfo__info">
					
					<Loader v-if="!isLoading"></Loader>

					<div v-show="isLoading" class="sideInfo__info__inner">
						<div class="sideInfo__date">
							<Date dateType="fullname" @loaded="isLoaded('date')"></Date>
						</div>

						<div class="sideInfo__time">
							<Time @emitLoaded="isLoaded('time')"></Time>
						</div>
						
						<div class="sideInfo__weather">
							<Weather @loaded="isLoaded('weather')"></Weather>
						</div>
					</div>

				</div>
			</transition>

			<div class="sideInfo__recap">
				<Recap v-if="viewData" :viewData="viewData"></Recap>
			</div>

		</div>
		
	</div>
</template>

<style lang="scss" scoped>@import "./SideInfo";</style>
<script src="./SideInfo.js"></script>
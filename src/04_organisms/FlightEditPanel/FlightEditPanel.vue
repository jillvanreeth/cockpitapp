<template>
	<section class="flightEditPanel">
	
		<transition name="fade" mode="out-in">
			<div v-if="isLoading" class="flightEditPanel__loader">
				<Loader></Loader>	
			</div>

			<div v-if="!isLoading" class="flightEditPanel__inner">
				
				<div :class="['flightEditPanel__overview', {'is-open' : showOffcanvas}]">
					<ul class="flightEditPanel__list">
						<li v-for="(item,index) in theItems" :key="index" ref="theItems" :class="['flightEditPanel__list__item', {'is-passed' : item.passed == 1 }]">
							<div class="flightEditPanel__item__content">
								<span v-if="item.is_manually_added" class="flightEditPanel__content__symbol is-inserted">
									<SvgIcon iconType="plusCircle"></SvgIcon>
								</span>
								
								<span class="flightEditPanel__content__symbol">
									<SvgIcon iconType="anchorCircle"></SvgIcon>
								</span>

								<span class="flightEditPanel__content__label">{{item.stop.name}}</span>

								<div v-if="item.passed" class="flightEditPanel__content__status">
									<span class="flightEditPanel__content__status__symbol">
										<SvgIcon iconType="check"></SvgIcon>
									</span>
								</div>

								<span class="flightEditPanel__content__time">{{item.departure}}</span>
							</div>
							
							<transition appear v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:leave="leave">
								<div v-if="!showOffcanvas" class="flightEditPanel__item__actions">
									<div class="flightEditPanel__actions__item">
										<button @click="handleInsertClick(item,index)" :disabled="item.passed == 1" class="button button--theme-1 flightEditPanel__actions__button">
											<span class="button__symbol flightEditPanel__actions__button__symbol">
												<SvgIcon iconType="insert"></SvgIcon>
											</span>
										</button>
									</div>

									<div class="flightEditPanel__actions__item">
										<button @click="handleDeleteClick(item)" :disabled="item.passed == 1" class="button flightEditPanel__actions__button button--brand-2">
											<span class="button__symbol flightEditPanel__actions__button__symbol">
												<SvgIcon iconType="trash"></SvgIcon>
											</span>
										</button>
									</div>
								</div>
							</transition>
						</li>
					</ul>
				</div>
				
				<transition name="slideX" mode="in-out">
					<div v-if="showOffcanvas" class="flightEditPanel__offcanvas">
						<FlightInsertForm :emitToggleOffcanvas="emitToggleOffcanvas" :currentItem="currentItem"></FlightInsertForm>	
					</div>
				</transition>
			</div>
		</transition>

	</section>
</template>

<style lang="scss" scoped>@import "./FlightEditPanel";</style>
<script src="./FlightEditPanel.js"></script>
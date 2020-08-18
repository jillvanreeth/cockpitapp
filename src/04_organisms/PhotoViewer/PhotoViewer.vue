<template>

	<transition name="fade">
		<section class="photoViewer">
			<div class="photoViewer__inner">
				
				<div class="photoViewer__actions">
					<div class="photoViewer__theCloser" @click="handleClick()">
						<div class="photoViewer__theCloser__symbol">
							<SvgIcon iconType="close"></SvgIcon>
						</div>
					</div>
				</div>

				<div class="photoViewer__content">
					<header  class="photoViewer__header">
						<div class="photoViewer__header__group">
							<span class="photoViewer__header__symbol">
								<SvgIcon iconType="warning"></SvgIcon>	
							</span>

							<span class="photoViewer__header__subtitle">{{theViewData.title}} - {{theViewData.subtitle}}</span>
						</div>
						
						<h3 v-if="theViewData.subcategorytitle" class="heading heading--4 photoViewer__header__title">{{theViewData.subcategorytitle}}</h3>
					</header>

					<div v-if="theViewData.remarks && theViewData.remarks != ''" class="photoViewer__remarks">
						<p>{{theViewData.remarks}}</p>
					</div>
				</div>

			</div>

			<div class="photoViewer__visual" :style="`background-image: url(${theViewData.image});`"></div>
		</section>
	</transition>

</template>

<style lang="scss" scoped>@import "./PhotoViewer";</style>
<script src="./PhotoViewer.js"></script>
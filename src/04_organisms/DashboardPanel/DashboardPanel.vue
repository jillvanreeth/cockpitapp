<template>
	<div class="dashboardPanel">
		<transition name="fade" mode="out-in">
		
			<div v-if="isLoading" class="dashboardPanel__loader">
				<Loader></Loader>
			</div>
			
			<div v-if="!isLoading" class="dashboardPanel__inner">
				<section class="dashboardPanel__overview">
					<div class="dashboardPanel__overview__inner">
						<SideInfo :viewData="viewData"></SideInfo>
						
						<div class="dashboardPanel__overview__action">
							<router-link to="malfunctions/create?q=new" class="button button--brand-2">
								<span class="button__symbol">
									<SvgIcon iconType="megaphoneFlat"></SvgIcon>
								</span>
								<span class="button__label">Storing versturen</span>
							</router-link>
						</div>
					</div>	
				</section>
				
				<section class="dashboardPanel__widgets">
					<div class="dashboardPanel__widgets__inner">
						<Widgets v-if="viewData" :viewData="viewData"></Widgets>
					</div>	
				</section>
			</div>

		</transition>
	</div>
</template>

<style lang="scss" scoped>@import "./DashboardPanel";</style>
<script src="./DashboardPanel.js"></script>
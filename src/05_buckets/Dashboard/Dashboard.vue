<template>
	<div class="dashboard">
		<div class="dashboard__outer">
			<h2 class="heading heading--3 dashboard__title">Dashboard</h2>

			<div class="dashboard__actions">
				
				<div class="dashboard__logout">
					<div class="dashboard__logout__inner">
						<span class="dashboard__logout__symbol">
							<SvgIcon iconType="wheel"></SvgIcon>
						</span>
						<span v-show="theCaptain" class="dashboard__logout__label">{{theCaptain}}</span>
					</div>

					<Logout></Logout>
				</div>
			</div>

		</div>
		
		<div class="dashboard__inner">
			<DashboardPanel @emitCaptain="emitCaptain"></DashboardPanel>
		</div>

	</div>
</template>

<style lang="scss" scoped>@import "./Dashboard";</style>
<script src="./Dashboard.js"></script>
<template>
	
	<div class="notifications">
		
		<div class="notifications__outer">
			<h2 class="heading heading--3 notifications__title">Meldingen</h2>
			
			<div class="notifications__actions">
				<div class="notifications__actions__item">
					<router-link to="/dashboard" tag="button" class="specialButton specialButton--darker">
						<span class="specialButton__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="specialButton__label">Dashboard</span>
					</router-link>
				</div>

				<div class="notifications__actions__item">
					<Logout></Logout>
				</div>
			</div>
		</div>
		
		<div class="notifications__inner">
			<NotificationsOverview></NotificationsOverview>
		</div>

	</div>

</template>

<style lang="scss" scoped>@import "./Notifications";</style>
<script src="./Notifications.js"></script>
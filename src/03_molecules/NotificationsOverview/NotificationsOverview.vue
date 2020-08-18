<template>
	<section class="notificationsOverview">
		<div class="notificationsOverview__inner">
			
			<table>
				<thead>
					<th>Datum &amp; tijd</th>
					<th>Beschrijving</th>
				</thead>
				<tbody>
					<tr v-for="notification in theNotifications" @click="handleDetailClick(notification)">
						<td>{{formatDateOfNotification(notification)}} <span>&bullet;</span> {{formatTimeOfNotification(notification)}}</td>
						<td>{{notification.message}}</td>
					</tr>
				</tbody>
			</table>
		
		</div>
	</section>
</template>

<style lang="scss" scoped>@import "./NotificationsOverview";</style>
<script src="./NotificationsOverview.js"></script>
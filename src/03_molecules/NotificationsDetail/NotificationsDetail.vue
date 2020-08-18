<template>
	<div :class="['notificationsDetail', {'is-urgent' : isUrgent}, {'is-new' : isNew}]">
		
		<h2 v-if="isUrgent || isNew" class="notificationsDetail__urgent heading heading--3">Nieuwe melding</h2>
		
		<header class="notificationsDetail__header">
			<h3 v-if="theNotification.title" class="heading heading--4 notificationsDetail__header__title">{{theNotification.title}}</h3>
			
			<span v-if="!theNotification.title" class="notificationsDetail__header__subtitle">Beschrijving</span>
		</header>
			
		<div class="notificationsDetail__content">
			
			<div class="notificationsDetail__content__item">

				<span class="notificationsDetail__content__label">Beschrijving</span>
				
				<div class="notificationsDetail__desc">
					<p>{{theNotification.message}}</p>
				</div>
			</div>
					
			<div class="notificationsDetail__content__item">
				<div class="notificationsDetail__info">
					<ul class="notificationsDetail__info__list">
						<li class="notificationsDetail__info__listItem">
							<span class="notificationsDetail__info__title">Datum &amp; tijd</span>
							
							<div class="notificationsDetail__info__data">
								<span class="notificationsDetail__info__data__symbol">
									<SvgIcon iconType="calendarFlat"></SvgIcon>
								</span>
								
								<span class="notificationsDetail__info__data__theContent ff--bold">
									 {{formatDateOfNotification(theNotification)}} <span>&bullet;</span> {{formatTimeOfNotification(theNotification)}}
								</span>
							</div>
						</li>

						<li class="notificationsDetail__info__listItem">
							<span class="notificationsDetail__info__title">Traject</span>
							
							<div class="notificationsDetail__info__data">
								<span class="notificationsDetail__info__data__symbol">
									<SvgIcon iconType="anchorCircle"></SvgIcon>
								</span>
								
								<span class="notificationsDetail__info__data__theContent">
									{{theNotification.tracks[0].name}}
								</span>
							</div>
						</li>

						<li class="notificationsDetail__info__listItem">
							<span class="notificationsDetail__info__title">Verstuurd door</span>
							
							<div class="notificationsDetail__info__data">
								<span class="notificationsDetail__info__data__symbol">
									<SvgIcon iconType="sender"></SvgIcon>
								</span>
								
								<span class="notificationsDetail__info__data__theContent">{{theNotification.user.firstname}} {{theNotification.user.lastname}}</span>
							</div>
						</li>
					</ul>

					<div class="notificationsDetail__actions">
					<router-link @click.native="handleHelpClick" to="/help" :class="['button', isUrgent || isNew ? 'button--theme-1' : 'button--brand-1']">
						<span class="button__label">Help &amp; contact</span>
					</router-link>
				</div>
				</div>

				
			</div>

		</div>
		
		<div v-if="isNew" class="notificationsDetail__backBtn">
			<button @click="handleBackClick" class="button button--bottom button--pairing-brand-2">
				<span class="button__label">Naar huidige vaart</span>
				<span class="button__symbol">
					<SvgIcon iconType="arrowRight"></SvgIcon>
				</span>
			</button>
		</div>

	</div>
</template>


<style lang="scss" scoped>@import "./NotificationsDetail";</style>
<script src="./NotificationsDetail.js"></script>
<template>
	<div class="commentsConfirm">
		<transition name="fade" mode="out-in">
			
			<div v-if="!isSuccess" class="commentsConfirm__inner">
				<header  class="commentsConfirm__header">
					<div class="commentsConfirm__header__group">
						<span class="commentsConfirm__header__symbol">
							<SvgIcon iconType="warning"></SvgIcon>	
						</span>

						<span class="commentsConfirm__header__subtitle">{{entry.title}} - {{entry.subtitle}}</span>
					</div>
					
					<h3 class="heading heading--4 commentsConfirm__header__title">{{entry.subcategorytitle}}</h3>
				</header>
		
				<div :class="['commentsConfirm__theContent', {'is-loading' : isLoading}]">
					<div class="commentsConfirm__content">
						<div class="commentsConfirm__content__item">
							<div class="commentsConfirm__formContent">
								<div v-if="entry.remarks != ''" class="commentsConfirm__formContent__remarks">
									<p>{{entry.remarks}}</p>
								</div>

								<div v-if="entry.image" class="commentsConfirm__formContent__visual">
									<button @click="handlePhotoClick" class="button button--brand-1">
										<span class="button__symbol">
											<SvgIcon iconType="camera"></SvgIcon>
										</span>
										<span class="button__label">Bekijk foto</span>
									</button>
								</div>
							</div>
						</div>

						<div class="commentsConfirm__content__item">
							<div class="commentsConfirm__info">
								<ul class="commentsConfirm__info__list">
									<li class="commentsConfirm__info__listItem">
										<span class="commentsConfirm__info__title">Datum &amp; tijd</span>
										
										<div class="commentsConfirm__info__data">
											<span class="commentsConfirm__info__data__symbol">
												<SvgIcon iconType="calendarFlat"></SvgIcon>
											</span>
											
											<span class="commentsConfirm__info__data__theContent">
												<Date dateType="nameOfDay+DD/MM/YYYY"></Date> &bullet; {{viewData.timestamp}}

											</span>
										</div>
									</li>

									<li class="commentsConfirm__info__listItem">
										<span class="commentsConfirm__info__title">Dienstregeling</span>
										
										<div class="commentsConfirm__info__data">
											<span class="commentsConfirm__info__data__symbol">
												<SvgIcon iconType="anchorCircle"></SvgIcon>
											</span>
											
											<span class="commentsConfirm__info__data__theContent"> {{entry.shift}} </span>
										</div>
									</li>

									<li class="commentsConfirm__info__listItem">
										<span class="commentsConfirm__info__title">Kapitein</span>
										
										<div class="commentsConfirm__info__data">
											<span class="commentsConfirm__info__data__symbol">
												<SvgIcon iconType="wheel"></SvgIcon>
											</span>
											
											<span class="commentsConfirm__info__data__theContent"> {{entry.captain}} </span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="commentsConfirm__actions">
						<div class="commentsConfirm__actions__item">
							<button @click="handleChangeClick" class="button button--pairing-neutrals-5">
								<span class="button__label">Wijzigen</span>
							</button>
						</div>

						<div class="commentsConfirm__actions__item">
							<button @click="handleSubmit" class="button button--brand-2">
								<span class="button__label">Bevestigen</span>
							</button>
						</div>
					</div>
				</div>

				<div v-if="isLoading" class="commentsConfirm__loader">
					<Loader></Loader>
				</div>
			</div>

			<div v-if="isSuccess" class="commentsConfirm">
				<div class="commentsConfirm__success">
					<Success :viewData="theMessage"></Success>
				</div>
			</div>
			
		</transition>
	</div>

</template>

<style lang="scss" scoped>@import "./CommentsConfirm";</style>
<script src="./CommentsConfirm.js"></script>
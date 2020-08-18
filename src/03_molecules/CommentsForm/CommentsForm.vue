<template>
	
		<div class="commentsForm">
		
			<header class="commentsForm__header">
				<div class="commentsForm__header__group">
					<span class="commentsForm__header__symbol">
						<SvgIcon iconType="warning"></SvgIcon>	
					</span>

					<span class="commentsForm__header__subtitle">{{viewData.entry.title}} - {{viewData.entry.subtitle}}</span>
				</div>
				
				<h3 class="heading heading--4 commentsForm__header__title">{{viewData.entry.subcategorytitle}}</h3>
			</header>
			
			<form class="commentsForm__form">			
				<div class="commentsForm__form__field" ref="comment">
					<label class="input__label" for="comment">Opmerkingen</label>
					<textarea v-model="inputFields.remarks" class="input__textarea" rows="4" name="comment"></textarea> 
				</div>
			
				<div class="commentsForm__camera">
					<transition name="fade">
						<div v-show="inputFields.image" class="commentsForm__camera__photo">
							<img :src="inputFields.image" class="commentsForm__camera__thePhoto" ref="photo">
							
							<button @click.stop.prevent="handleDeleteClick" class="commentsForm__camera__photo__action">
								<span class="commentsForm__camera__photo__symbol">
									<SvgIcon iconType="trash"></SvgIcon>
								</span>
							</button>
						</div>
					</transition>
					
					<Camera></Camera>

					<div class="commentsForm__camera__btn">
						<button @click.stop.prevent="handlePhotoClick" class="button button--pairing-medium" ref="submit">
							<span class="button__symbol">
								<SvgIcon iconType="camera"></SvgIcon>
							</span>
							<span class="button__label">{{!inputFields.image ? 'Foto toevoegen' : 'Foto vervangen' }}</span>
						</button>
					</div>	

				</div>

				<div class="commentsForm__form__submit">
					<button @click.stop.prevent="handleSubmit" class="button button--brand-2" type="sumbit" ref="submit">
						<span class="button__label">Verzenden</span>
					</button>		
				</div>	
				
				<transition name="fade">
					<div v-if="isInvalid" :class="{'is-invalid' : isInvalid}" class="commentsForm__error">
						<span class="input__error">
							<span class="input__error__symbol">
								<SvgIcon iconType="warning"></SvgIcon>
							</span>
							<span class="input__error__label">Voeg een opmerking of foto toe</span>
						</span>
					</div>
				</transition>
			</form>
		
		</div>
	
</template>

<style lang="scss" scoped>@import "./CommentsForm";</style>
<script src="./CommentsForm.js"></script>
<template>
	<div class="malfunctionsForm">
		
		<h3 class="heading heading--3 malfunctionsForm__title">Opmerkingen &amp; notities</h3>

		<div class="malfunctionsForm__inner">
			
			<div v-if="isLoading" class="malfunctionsForm__loader">
				<Loader></Loader>
			</div>
			
			<form class="malfunctionsForm__form">			
				<div class="malfunctionsForm__form__field" ref="remark">
					<textarea v-model="inputFields.remarks" class="input__textarea" placeholder="Opmerkingen en notities voor verantwoodelijke en/of technieker" rows="6" name="remark"></textarea> 
				</div>
			
				<div class="malfunctionsForm__camera">
					<transition name="fade">
						<div v-show="inputFields.image" class="malfunctionsForm__camera__photo">
							<img :src="inputFields.image" class="malfunctionsForm__camera__thePhoto" ref="photo">
							
							<button @click.stop.prevent="handleDeleteClick" class="malfunctionsForm__camera__photo__action">
								<span class="malfunctionsForm__camera__photo__symbol">
									<SvgIcon iconType="trash"></SvgIcon>
								</span>
							</button>
						</div>
					</transition>
					
					<Camera></Camera>

					<div class="malfunctionsForm__camera__btn">
						<button @click.stop.prevent="handlePhotoClick" class="button button--pairing-medium" ref="submit">
							<span class="button__symbol">
								<SvgIcon iconType="camera"></SvgIcon>
							</span>
							<span class="button__label">{{!inputFields.image ? 'Foto toevoegen' : 'Foto vervangen' }}</span>
						</button>
					</div>	

				</div>

				<transition name="fade">
					<div v-if="isInvalid" :class="{'is-invalid' : isInvalid}" class="malfunctionsForm__error">
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

	</div>
</template>

<style lang="scss" scoped>@import "./MalfunctionsForm";</style>
<script src="./MalfunctionsForm.js"></script>
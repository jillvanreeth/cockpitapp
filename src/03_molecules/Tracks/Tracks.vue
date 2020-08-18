<template>
	<div class="tracks">
		
		<h3 class="heading heading--3 tracks__title">Kies een traject</h3>

		<div class="tracks__inner">
			
			<Loader v-if="isLoading"></Loader>

			<div v-for="track in theTracks" class="tracks__item">
				<div class="tracks__item__sizer">
					<div class="tracks__item__inner">

						<input @change="handleChange()" v-model="chosenTrack" :value="track.id" :id="track.id" class="tracks__radio" type="radio">
						<label :for="track.id" class="tracks__radioFaker">
							<div class="tracks__checked__symbol">
								<span class="tracks__checked__theSymbol">
									<SvgIcon iconType="check"></SvgIcon>
								</span>
							</div>

							<span class="tracks__item__symbol">
								<SvgIcon iconType="anchor"></SvgIcon>
							</span>

							<span class="tracks__item__label">{{track.name}}</span>
						</label>

					</div>
				</div>
			</div>
		
		</div>
	
	</div>
</template>

<style lang="scss" scoped>@import "./Tracks";</style>
<script src="./Tracks.js"></script>
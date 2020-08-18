<template>
	
	<div class="flight">
		
		<div class="flight__outer">
			
			<div v-if="$route.path == '/flight/edit'" class="flight__prevBtn">
				<button @click="handlePrevClick" class="specialButton">
					<span class="specialButton__symbol">
						<SvgIcon iconType="arrowLeft"></SvgIcon>
					</span>
					<span class="button__label">Terug naar huidige vaart</span>
				</button>
			</div>

			<h2 class="heading heading--3 flight__title">{{$route.meta.title}}</h2>
			
			<div class="flight__actions">
				<div class="flight__actions__item">
					<router-link to="/dashboard" tag="button" class="specialButton specialButton--darker">
						<span class="specialButton__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="specialButton__label">Dashboard</span>
					</router-link>
				</div>

				<div class="flight__actions__item">
					<Logout></Logout>
				</div>
			</div>
		</div>
		
		<div class="flight__inner">
			<router-view></router-view>
		</div>

	</div>

</template>

<style lang="scss" scoped>@import "./Flight";</style>
<script src="./Flight.js"></script>
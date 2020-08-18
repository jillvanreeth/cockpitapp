<template>
	
	<div class="malfunctions">
		
		<div class="malfunctions__outer">

			<div v-if="$route.path !== '/malfunctions/create/step-1/1' && $route.params.id > 1" class="malfunctions__prevBtn">
				<button @click="handlePrevClick" class="specialButton">
					<span class="specialButton__symbol">
						<SvgIcon iconType="arrowLeft"></SvgIcon>
					</span>
					<span class="button__label">Vorige</span>
				</button>
			</div>

			<h2 class="heading heading--3 malfunctions__title">{{$route.meta.title}}</h2>
			
			<div class="malfunctions__actions">
				<div class="malfunctions__actions__item">
					<router-link to="/dashboard" tag="button" class="specialButton specialButton--darker">
						<span class="specialButton__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="specialButton__label">Dashboard</span>
					</router-link>
				</div>

				<div class="malfunctions__actions__item">
					<Logout></Logout>
				</div>
			</div>
		</div>
		
		<div class="malfunctions__inner">
			<router-view></router-view>
		</div>

	</div>

</template>

<style lang="scss" scoped>@import "./Malfunctions";</style>
<script src="./Malfunctions.js"></script>
<template>
  <div id="app">
  	<div class="main">
    	<router-view></router-view>
			
			<transition name="slide-fade">
    		<Offcanvas v-if="offCanvas.toggle" :viewToShow="offCanvas.viewToShow" :viewData="offCanvas.viewData"></Offcanvas>
   		</transition>
			
			<transition name="fade">
				<PhotoViewer v-if="photoViewer.toggle" :viewData="photoViewer.viewData"></PhotoViewer>
   		</transition>

   		<transition name="fade">
				<div class="overlay" v-if="offCanvas.toggle || photoViewer.toggle"></div>
   		</transition>
   	</div>
  </div>
</template>

<style lang="scss">@import "./App";</style>
<script src="./App.js"></script>
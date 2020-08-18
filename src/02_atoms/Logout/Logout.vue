<template>
	<div class="logout">
		<button @click="handleClick()" class="specialButton logout__button">
			<span class="specialButton__symbol logout__button__symbol">
				<SvgIcon iconType="logout"></SvgIcon>
			</span>
		</button>
	</div>
</template>

<style lang="scss" scoped>@import "./Logout";</style>
<script src="./Logout.js"></script>
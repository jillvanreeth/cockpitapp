<template>
	<section class="malfunctionsOverview">
		<div class="malfunctionsOverview__inner">
			
			<table>
				<thead>
					<th width="25%">Datum &amp; tijd</th>
					<th width="25%">Situatie</th>
					<th width="50%">Beschrijving</th>
				</thead>
				<transition name="fade" mode="in-out">
					<div v-if="isLoading" class="malfunctionsOverView__loader">
						<Loader></Loader>
					</div>

					<tbody v-if="!isLoading">
						<tr v-for="malfunction in theMalfunctions" @click="handleDetailClick(malfunction)">
							<td>{{formatDateOfMalfunction(malfunction)}} <span>&bullet;</span> {{formatTimeOfMalfunction(malfunction)}}</td>
							<td>{{malfunction.category}}</td>
							<td>{{malfunction.remarks}}</td>
						</tr>
					</tbody>
				</transition>
			</table>
			
			<div class="malfunctions__actions">
				<router-link to="malfunctions/create?q=new" class="button button--bottom button--pairing-brand-2 malfunctions__actions__button">
					<span class="button__label">
						<span class="button__symbol malfunctions__actions__symbol">
							<SvgIcon iconType="megaphoneFlat"></SvgIcon>
						</span>
						Storing versturen
					</span>
					<span class="button__symbol">
						<SvgIcon iconType="arrowRight"></SvgIcon>
					</span>
				</router-link>
			</div>

		</div>
	</section>
</template>

<style lang="scss" scoped>@import "./MalfunctionsOverview";</style>
<script src="./MalfunctionsOverview.js"></script>
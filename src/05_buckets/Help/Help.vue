<template>
	
	<div class="help">
		
		<div class="help__outer">
			<h2 class="heading heading--3 help__title">Help &amp; Contact</h2>
			
			<div class="help__actions">
				<div class="help__actions__item">
					<router-link to="/dashboard" tag="button" class="specialButton specialButton--darker">
						<span class="specialButton__symbol">
							<SvgIcon iconType="dashboard"></SvgIcon>
						</span>
						<span class="specialButton__label">Dashboard</span>
					</router-link>
				</div>

				<div class="help__actions__item">
					<Logout></Logout>
				</div>
			</div>
		</div>
		
		<div class="help__inner">
			<div class="help__content">
				<div class="help__content__inner">
						
					<div class="help__box">
						<div class="help__box__title">
							<span class="help__box__title__symbol">
								<SvgIcon iconType="lifebuoyFlat"></SvgIcon>
							</span>

							<span class="help__box__title__label">Urgente storing? Bel steeds eerst het noodnummer</span>
						</div>

						<div class="help__box__callout">
							<span class="help__box__callout__symbol">
								<SvgIcon iconType="phone"></SvgIcon>
							</span>

							<a href="tel:038441919" class="help__box__callout__label">03 844 19 19</a>
						</div>
					</div>

					<div class="help__content__theContent">
						<table>
							<tbody>
								<tr>	
									<td>
										<span class="help__content__theContent__label">Technische dienst</span>
										<span class="help__content__theContent__desc">Een technieker bereiken? Qui ea pariatur laborum consequat culpa. Dolore occaecat voluptate occaecat ea exercitation exercitation ullamco fugiat.</span>
									</td>
									<td>
										<div class="help__content__theContent__phone">
											<span class="help__content__theContent__phone__symbol">
												<SvgIcon iconType="phone"></SvgIcon>
											</span>
											<a href="tel:038332791" class="help__content__theContent__phone__label">03 833 27 91</a>
										</div>
									</td>
								</tr>
								<tr>	
									<td>
										<span class="help__content__theContent__label">Concessie verantwoordelijke</span>
										<span class="help__content__theContent__desc">De verantwoordeijke voor jouw vaart ui ea pariatur laborum consequat culpa. Dolore occaecat voluptate occaecat ea exercitation exercitation ullamco fugiat.</span>
									</td>
									<td>
										<div class="help__content__theContent__phone">
											<span class="help__content__theContent__phone__symbol">
												<SvgIcon iconType="phone"></SvgIcon>
											</span>
											<a href="tel:038332543" class="help__content__theContent__phone__label">03 833 25 43</a>
										</div>
									</td>
									<td>
										<div class="help__content__theContent__phone">
											<span class="help__content__theContent__phone__symbol">
												<SvgIcon iconType="phone"></SvgIcon>
											</span>
											<a href="tel:038332540" class="help__content__theContent__phone__label">03 833 25 40</a>
										</div>
									</td>
								</tr>
								<tr>	
									<td>
										<span class="help__content__theContent__label">Aqualiner</span>
										<span class="help__content__theContent__desc">Aqualiner ui ea pariatur laborum consequat culpa. Dolore occaecat voluptate occaecat ea exercitation exercitation ullamco fugiat.</span>
									</td>
									<td>
										<div class="help__content__theContent__phone">
											<span class="help__content__theContent__phone__symbol">
												<SvgIcon iconType="phone"></SvgIcon>
											</span>
											<a href="tel:038332543" class="help__content__theContent__phone__label">03 833 25 43</a>
										</div>
									</td>
									<td>
										<div class="help__content__theContent__phone">
											<span class="help__content__theContent__phone__symbol">
												<SvgIcon iconType="phone"></SvgIcon>
											</span>
											<a href="tel:038332540" class="help__content__theContent__phone__label">03 833 25 40</a>
										</div>
									</td>
								</tr>
							</tbody>
							
						</table>
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<style lang="scss" scoped>@import "./Help";</style>
<script src="./Help.js"></script>
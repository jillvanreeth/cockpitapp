<template>
  <div class="UI">

		<section class="section">
			<h2 class="section__title	">Titles/headings</h2>
	    <h1 class="heading heading--0">.heading .heading--0 titleSize('h0') 72px</h1>
	    <h1 class="heading heading--1">.heading .heading--1 titleSize('h1') 68px</h1>
	    <h2 class="heading heading--2">.heading .heading--2 titleSize('h2') 48px</h2>
	    <h3 class="heading heading--3">.heading .heading--3 titleSize('h3') 36px</h3>
	    <h4 class="heading heading--4">.heading .heading--4 titleSize('h4') 26px</h4>
	    <h5 class="heading heading--5">.heading .heading--5 titleSize('h5') 16px</h5>
	    <h6 class="heading heading--6">.heading .heading--6 titleSize('h6') 14px</h6>
	  </section>
	   
	  <section class="section">
			<h2 class="section__title">Paragraphs</h2>
			
			<p class="fontSize--xxs">Paragraph 10.5px with .fontSize--xxs</p>
			<p class="fontSize--xs">Paragraph 12px with .fontSize--xs</p>
			<p class="fontSize--s">Paragraph 14px with .fontSize--s</p>
			<p class="fontSize--m">Default Size Paragraph 16px with .fontSize--m</p>
			<p class="fontSize--l">Paragraph 24px with .fontSize--l</p>
			<p class="fontSize--xl">Paragraph 28px with .fontSize--xl</p>
			<p class="fontSize--xxl">Paragraph 36px with .fontSize--xxl</p>
		</section>	
	    
		<section class="section">
			<h2 class="section__title">Buttons, <small>(can be of type button, submit, a, span, div,...)</small></h2>
			
			<button class="button button--pairing-brand-1">Default button colorpairing brand-1</button>
		
			<br/>
			
			<button class="button button--brand-2">
				<span class="button__label">Button brand-2 &amp; symbol</span>
				<span class="button__symbol">
					<SvgIcon iconType="anchorCircle"/>
				</span>
			</button>

			<br/>
			
			<button class="button" disabled>
				<span class="button__symbol">
					<SvgIcon iconType="anchorCircle"/>
				</span>
				<span class="button__label">Disabled attr Button with symbol</span>
			</button>
				
			<br/>
			
			<input type="sumbit" class="button" disabled value="Button input type submit disabled">
			
			<br/>
			
			<button class="button button--fixed button--pairing-neutrals-5">
				<span class="button__symbol">
					<svg-icon iconType="anchorCircle"/>
				</span>
				<span class="button__label">Button fixed width with symbol</span>
			</button>
			
			<br/>
			
			<a href="#0" class="button button--pairing-neutrals-10 button--fixed">
				<span class="button__label">Anchor tag with fixed width</span>
				<span class="button__symbol">
					<svg-icon iconType="anchorCircle"/>
				</span>
			</a>
			
			<br/>
			
			<a href="#0" class="specialButton">
				<span class="specialButton__label">Anchor tag specialButton</span>
				<span class="specialButton__symbol">
					<svg-icon iconType="anchorCircle"/>
				</span>
			</a>

			<br/>

			<a href="#0" class="button button--fixed is-disabled">
				<span class="button__label">Anchor tag fixed width with class is-disabled</span>
				<span class="button__symbol">
					<svg-icon iconType="anchorCircle"/>
				</span>
			</a>

			<br/>

			<button class="button button--brand-2 button--bottom">
				<span class="button__label">Button bottom with symbol</span>
				<span class="button__symbol">
					<SvgIcon iconType="anchorCircle"/>
				</span>
			</button>

			<div class="directionalButton">
				<span class="directionalButton__symbol">
					<SvgIcon iconType="arrowLeft"></SvgIcon>
				</span>
			</div>
				
			<button class="directionalButton">
				<span class="directionalButton__symbol">
					<SvgIcon iconType="arrowLeft"></SvgIcon>
				</span>
			</button>

			<a href="#0" class="directionalButton">
				<span class="directionalButton__symbol">
					<SvgIcon iconType="arrowRight"></SvgIcon>
				</span>
			</a>

		</section>
		
		<section class="section">
			<h2 class="section__title">Colors</h2>

			<div class="block-wrap">

				<div class="block">
					<span class="block-color bgc--light" style="border: 1px solid"></span>
					<span class="block-name">light <br/>#FFF</span>
				</div>
				
				<div class="block">
					<span class="block-color bgc--dark"></span>
					<span class="block-name">dark <br/>#000</span>
				</div>

				<span class="break"></span>
				
				<div class="block">
					<span class="block-color bgc--positive"></span>
					<span class="block-name">positive <br/>#599255</span>
				</div>

				<div class="block">
					<span class="block-color bgc--negative"></span>
					<span class="block-name">negative <br/>#C4271E</span>
				</div>

				<div class="block">
					<span class="block-color bgc--disabled"></span>
					<span class="block-name">disabled <br/>#F8F8F8</span>
				</div>
				
				<span class="break"></span>
				
				<div class="block">
					<span class="block-color bgc--brand-1"></span>
					<span class="block-name">brand-1 <br/>#0C3764</span>
				</div>

				<div class="block">
					<span class="block-color bgc--brand-2"></span>
					<span class="block-name">brand-2 <br/>#BC0D26</span>
				</div>
				
				<span class="break"></span>

				<div class="block">
					<span class="block-color bgc--positive-darker"></span>
					<span class="block-name">positive-darker <br/>#20491D</span>
				</div>

				<div class="block">
					<span class="block-color bgc--positive"></span>
					<span class="block-name">positive <br/>#599255</span>
				</div>

				<div class="block">
					<span class="block-color bgc--positive-lighter"></span>
					<span class="block-name">positive-lighter <br/>#90B48E</span>
				</div>
				
				<span class="break"></span>

					<div class="block">
					<span class="block-color bgc--negative-darker"></span>
					<span class="block-name">negative-darker <br/>#620A16</span>
				</div>

				<div class="block">
					<span class="block-color bgc--negative"></span>
					<span class="block-name">negative <br/>#C4271E</span>
				</div>
				
				<div class="block">
					<span class="block-color bgc--negative-lighter"></span>
					<span class="block-name">negative-lighter <br/>#CFB6B9</span>
				</div>
				
				
				<span class="break"></span>
				
				<div class="block">
					<span class="block-color bgc--neutrals-0"></span>
					<span class="block-name">neutrals-0 <br>#2D3D43</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-1"></span>
					<span class="block-name">neutrals-1 <br>#6F8591</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-2"></span>
					<span class="block-name">neutrals-2 <br>#A4AFB5</span>
				</div>
				
				<div class="block">
					<span class="block-color bgc--neutrals-3"></span>
					<span class="block-name">neutrals-3 <br>#BAC5CA</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4"></span>
					<span class="block-name">neutrals-4 <br>#D7DFE2</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-5"></span>
					<span class="block-name">neutrals-5 <br>#E4EAED</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-6"></span>
					<span class="block-name">neutrals-6 <br>#F1F4F5</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-7"></span>
					<span class="block-name">neutrals-7 <br>#D8D8D8</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-8"></span>
					<span class="block-name">neutrals-8 <br>#E8E8E8</span>
				</div>
				
				<div class="block">
					<span class="block-color bgc--neutrals-9"></span>
					<span class="block-name">neutrals-9 <br>#FAF9F9</span>
				</div>
				
				<div class="block">
					<span class="block-color bgc--neutrals-10"></span>
					<span class="block-name">neutrals-10 <br>#FDFDFD</span>
				</div>

				<span class="break"></span>	

				<div class="block">
					<span class="block-color bgc--theme-0"></span>
					<span class="block-name">theme-0 <br>#0E151D</span>
				</div>		

				<div class="block">
					<span class="block-color bgc--theme-1"></span>
					<span class="block-name">theme-1 <br>#001930</span>
				</div>		

				<div class="block">
					<span class="block-color bgc--theme-2"></span>
					<span class="block-name">theme-2 <br>#224564</span>
				</div>	

				<div class="block">
					<span class="block-color bgc--theme-3"></span>
					<span class="block-name">theme-3 <br>#143F6A</span>
				</div>		

				<div class="block">
					<span class="block-color bgc--theme-4"></span>
					<span class="block-name">theme-4 <br>#325475</span>
				</div>		

				<div class="block">
					<span class="block-color bgc--theme-5"></span>
					<span class="block-name">theme-5 <br>#5E7A97</span>
				</div>			
				
				<div class="block">
					<span class="block-color bgc--theme-6"></span>
					<span class="block-name">theme-6 <br>#0b3056</span>
				</div>
				
				<span class="break"></span>
				
				<div class="block">
					<span class="block-color bgc--alt-0"></span>
					<span class="block-name">alt-0 <br>#1E3B46</span>
				</div>

				<div class="block">
					<span class="block-color bgc--alt-1"></span>
					<span class="block-name">alt-1 <br>#365663</span>
				</div>

				<div class="block">
					<span class="block-color bgc--alt-2"></span>
					<span class="block-name">alt-2 <br>#608496</span>
				</div>

				<div class="block">
					<span class="block-color bgc--alt-3"></span>
					<span class="block-name">alt-3 <br>#BFDDE4</span>
				</div>	
				
				<div class="block">
					<span class="block-color bgc--alt-4"></span>
					<span class="block-name">alt-4 <br>#BCDAE1</span>
				</div>		

			</div>
		</section>

		<section class="section">
			
			<h2 class="section__title">Symbols <small>(usage: SvgIcon iconType="nameOfIcon", colors: ::v-deep svg { fill: color })</small></h2>

			<div class="block-wrap">

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="anchorCircle"/>
					</span>
					<span class="block-name">anchorCircle</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="anchor"/>
					</span>
					<span class="block-name">anchor</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="anchorFlat"/>
					</span>
					<span class="block-name">anchorFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="arrowLeft"/>
					</span>
					<span class="block-name">arrowLeft</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="arrowRight"/>
					</span>
					<span class="block-name">arrowRight</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="bike"/>
					</span>
					<span class="block-name">bike</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="brokenWheels"/>
					</span>
					<span class="block-name">brokenWheels</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="calendarFlat"/>
					</span>
					<span class="block-name">calendarFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="calendar"/>
					</span>
					<span class="block-name">calendar</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="camera"/>
					</span>
					<span class="block-name">camera</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="checkCircle"/>
					</span>
					<span class="block-name">checkCircle</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="check"/>
					</span>
					<span class="block-name">check</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="checklistFlat"/>
					</span>
					<span class="block-name">checklistFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="checklist"/>
					</span>
					<span class="block-name">checklist</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="close"/>
					</span>
					<span class="block-name">close</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="dashboard"/>
					</span>
					<span class="block-name">dashboard</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="deleteMobile"/>
					</span>
					<span class="block-name">deleteMobile</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="goal"/>
					</span>
					<span class="block-name">goal</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="groupAdd"/>
					</span>
					<span class="block-name">groupAdd</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="groupRemove"/>
					</span>
					<span class="block-name">groupRemove</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="insert"/>
					</span>
					<span class="block-name">insert</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="lifebuoyFlat"/>
					</span>
					<span class="block-name">lifebuoyFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="lifebuoy"/>
					</span>
					<span class="block-name">lifebuoy</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="logo"/>
					</span>
					<span class="block-name">logo</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="logout"/>
					</span>
					<span class="block-name">logout</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="megaphoneFlat"/>
					</span>
					<span class="block-name">megaphoneFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="megaphone"/>
					</span>
					<span class="block-name">megaphone</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="nextStop"/>
					</span>
					<span class="block-name">nextStop</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="notificationsFlat"/>
					</span>
					<span class="block-name">notificationsFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="notifications"/>
					</span>
					<span class="block-name">notifications</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="passengersFlat"/>
					</span>
					<span class="block-name">passengersFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="passengers"/>
					</span>
					<span class="block-name">passengers</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="pencil"/>
					</span>
					<span class="block-name">pencil</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="personAdded"/>
					</span>
					<span class="block-name">personAdded</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="personFlat"/>
					</span>
					<span class="block-name">personFlat</span>
				</div>
				
				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="pinSend"/>
					</span>
					<span class="block-name">pinSend</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="phone"/>
					</span>
					<span class="block-name">phone</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="plusCircle"/>
					</span>
					<span class="block-name">plusCircle</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="plusMinCircle"/>
					</span>
					<span class="block-name">plusMinCircle</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="radarFlat"/>
					</span>
					<span class="block-name">radarFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="radar"/>
					</span>
					<span class="block-name">radar</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="schedule"/>
					</span>
					<span class="block-name">schedule</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="sender"/>
					</span>
					<span class="block-name">sender</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="settingsFlat"/>
					</span>
					<span class="block-name">settingsFlat</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="settings"/>
					</span>
					<span class="block-name">settings</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="shipFront"/>
					</span>
					<span class="block-name">shipFront</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="ship"/>
					</span>
					<span class="block-name">ship</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="trash"/>
					</span>
					<span class="block-name">trash</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="triangle"/>
					</span>
					<span class="block-name">triangle</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="warning"/>
					</span>
					<span class="block-name">warning</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="wheel"/>
					</span>
					<span class="block-name">wheel</span>
				</div>

				<div class="block">
					<span class="block-symbol">
						<svg-icon iconType="whoops"/>
					</span>
					<span class="block-name">whoops</span>
				</div>
			</div>
		
		</section>
	

		<section class="section">
			
			<h2 class="section__title">Spaces</h2>

			<div class="block-wrap">
				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:5px;"></span>
					<span class="block-name">gap('xxs') 5px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:10px;"></span>
					<span class="block-name">gap('xs') 10px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:15px;"></span>
					<span class="block-name">gap('s') 15px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:20px;"></span>
					<span class="block-name">gap('m') 20px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:25px;"></span>
					<span class="block-name">gap('l') 25px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:30px;"></span>
					<span class="block-name">gap('xl') 30px</span>
				</div>

				<div class="block">
					<span class="block-color bgc--neutrals-4" style="width:50px;"></span>
					<span class="block-name">gap('xxl') 50px</span>
				</div>

			</div>

		</section>

	</div> 
</template>

<style lang="scss">@import "./UI";</style>
<script src="./UI.js"></script>

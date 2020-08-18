<template>
	
		<section :class="['offcanvas', {'is-urgent' : viewData && viewData.urgent}]">
			
			<div class="offcanvas__inner">
					
				<div class="offcanvas__actions">
					<div class="offcanvas__theCloser" @click="handleClick()">
						<div class="offcanvas__theCloser__symbol">
							<SvgIcon iconType="close"></SvgIcon>
						</div>
					</div>
				</div>

				<div class="offcanvas__content">
					<ChecklistConfirm v-if="viewToShow == 'ChecklistConfirm'" :viewData="viewData"></ChecklistConfirm>

					<CommentsConfirm v-if="viewToShow == 'CommentsConfirm'" :viewData="viewData"></CommentsConfirm>
					
					<CommentsForm v-if="viewToShow == 'CommentsForm'" :viewData="viewData"></CommentsForm>
					
					<FlightConfirm v-if="viewToShow == 'FlightConfirm'" :viewData="viewData"></FlightConfirm>

					<FlightDelete v-if="viewToShow == 'FlightDelete'" :viewData="viewData"></FlightDelete>

					<FlightSkipForm v-if="viewToShow == 'FlightSkipForm'" :viewData="viewData"></FlightSkipForm>

					<FlightStopConfirm v-if="viewToShow == 'FlightStopConfirm'"></FlightStopConfirm>

					<LogoutConfirm v-if="viewToShow == 'LogoutConfirm'" :viewData="viewData"></LogoutConfirm>
					
					<MalfunctionsDetail v-if="viewToShow == 'MalfunctionsDetail'" :viewData="viewData"></MalfunctionsDetail>

					<NotificationsDetail v-if="viewToShow == 'NotificationsDetail'" :viewData="viewData"></NotificationsDetail>

					<PassengersForm v-if="viewToShow == 'PassengersForm'" :viewData="viewData"></PassengersForm>

					<PincodeForm v-if="viewToShow == 'PincodeForm'"></PincodeForm>
					
					<PinConfirm v-if="viewToShow == 'PinConfirm'"></PinConfirm>

					<Success v-if="viewToShow == 'Success'" :viewData="viewData"></Success>
					
					<Whoops v-if="viewToShow == 'Whoops'" :viewData="viewData"></Whoops>
				</div>
			
			</div>
		</section>
	
</template>

<style lang="scss" scoped>@import "./Offcanvas";</style>
<script src="./Offcanvas.js"></script>
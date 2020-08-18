import MalfunctionsOverview 	from '@/03_molecules/MalfunctionsOverview/MalfunctionsOverview.vue'

export default {
	name: 'Malfunctions',

	components: {
		MalfunctionsOverview,
	},

	data() {
		return {
			debug: false,
		}
	},

	methods: {

		handlePrevClick() {

			this.debug && console.log('MALFUNCTIONS: handlePrevClick')

			this.$router.go(-1)
		},
	},
}
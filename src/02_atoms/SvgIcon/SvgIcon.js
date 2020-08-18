import symbols from './index.js';

export default {
  name: 'SvgIcon',
  
  components: {
    ...symbols
  },

  props: {
    iconType: {
      type: String
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
  },

  computed: {
    path () {
      return symbols[this.iconType]
    }
  }
}
import ResponsiveObserve, { responsiveArray } from 'ant-design-vue/es/_util/responsiveObserve'

export const RESPONSIVE_ARRAY = responsiveArray

export default {
  name: 'ContainerQuery',
  data () {
    return {
      token: undefined
    }
  },
  mounted () {
    console.log('mounted...', this)
    this.token = ResponsiveObserve.subscribe((screens) => {
      console.log('screens', screens)
      this.$emit('resize', screens)
    })
  },
  beforeDestroy () {
    ResponsiveObserve.unsubscribe(this.token)
  },
  render (h) {
    return this.$slots['default'][0]
  }
}

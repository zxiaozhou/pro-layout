import './BasicLayout.less'

import PropTypes from 'ant-design-vue/es/_util/vue-types'
import Vue from 'vue'
import { Layout } from 'ant-design-vue'
// import { ContainerQuery } from 'vue-container-query'
import { SiderMenuWrapper, GlobalFooter } from './components'
import { getComponentFromProp, isFun } from './utils/util'
import { SiderMenuProps } from './components/SiderMenu'
import HeaderView, { HeaderViewProps } from './Header'
import WrapContent from './WrapContent'
import ConfigProvider from './components/ConfigProvider'
import ResponsiveObserve, { responsiveArray } from 'ant-design-vue/es/_util/responsiveObserve'

export const BasicLayoutProps = {
  ...SiderMenuProps,
  ...HeaderViewProps,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).def('en-US'),
  isChildrenLayout: PropTypes.bool.def(false),
  breadcrumbRender: PropTypes.func,
  breakpoint: PropTypes.oneOf(responsiveArray).def('lg'),
  disableMobile: PropTypes.bool.def(false),
  mediaQuery: PropTypes.object.def({}),
  handleMediaQuery: PropTypes.func,
  footerRender: PropTypes.func,
}

const getPaddingLeft = (
  hasLeftPadding,
  collapsed = undefined,
  siderWidth
) => {
  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth
  }
  return 0
}

const headerRender = (h, props) => {
  if (props.headerRender === false) {
    return null
  }
  return <HeaderView { ...{ props } } />
}

const defaultI18nRender = (key) => key

const BasicLayout = {
  name: 'BasicLayout',
  functional: true,
  props: BasicLayoutProps,
  render (h, content) {
    const { props, children } = content
    const {
      layout,
      collapsed,
      handleCollapse,
      contentWidth,
      siderWidth,
      fixSiderbar,
      breakpoint,
      i18nRender = defaultI18nRender
    } = props

    const state = Vue.observable({
      colSize: breakpoint,
      isMobile: false
    })

    console.log('render::content', content)
    ResponsiveObserve.subscribe((screens) => {
      if (screens['xxl']) {
        state.colSize = 'xxl'
        return
      }
      if (screens['xl']) {
        state.colSize = 'xl'
        return
      }
      if (screens['lg']) {
        state.colSize = 'lg'
        return
      }
      if (screens['md']) {
        state.colSize = 'md'
        return
      }
      if (screens['sm']) {
        state.colSize = 'sm'
        return
      }
      if (screens['xs']) {
        state.colSize = 'xs'
        return
      }
      state.colSize = 'md'
    })

    const footerRender = getComponentFromProp(content, 'footerRender')
    const rightContentRender = getComponentFromProp(content, 'rightContentRender')
    const collapsedButtonRender = getComponentFromProp(content, 'collapsedButtonRender')
    const menuHeaderRender = getComponentFromProp(content, 'menuHeaderRender')
    const breadcrumbRender = getComponentFromProp(content, 'breadcrumbRender')

    state.isMobile = (state.colSize === 'sm' || state.colSize === 'xs') && !props.disableMobile

    const isTopMenu = layout === 'topmenu'
    const hasSiderMenu = !isTopMenu
    // If it is a fix menu, calculate padding
    // don't need padding in phone mode
    const hasLeftPadding = fixSiderbar && !isTopMenu && !state.isMobile

    const someClassName = {
      [`screen-${state.colSize}`]: state.colSize,
      'ant-pro-basicLayout': true,
      'ant-pro-topmenu': isTopMenu,
      'ant-pro-basicLayout-is-children': false,
      'ant-pro-basicLayout-fix-siderbar': fixSiderbar,
      'ant-pro-basicLayout-mobile': state.isMobile,
    }

    const cdProps = {
      ...props,
      hasSiderMenu,
      footerRender,
      menuHeaderRender,
      rightContentRender,
      collapsedButtonRender,
      breadcrumbRender
    }
    // 显示传递 props
    const someSiderProps = {
      mode: props.mode,
      theme: props.theme,
      isMobile: state.isMobile,
      menus: props.menus,
      logo: props.logo,
      title: props.title,
      handleCollapse,
      i18nRender,
      layout,
      contentWidth,
      siderWidth,
      fixSiderbar,
    }

    return (
      <ConfigProvider i18nRender={i18nRender} contentWidth={contentWidth} breadcrumbRender={breadcrumbRender}>
        <Layout class={someClassName}>
          <SiderMenuWrapper
            { ...{ props: someSiderProps }}
            collapsed={collapsed}
            onCollapse={handleCollapse}
          />
          <Layout class={[layout]} style={{
            paddingLeft: hasSiderMenu
              ? `${getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth)}px`
              : undefined,
            minHeight: '100vh'
          }}>
            {headerRender(h, {
              ...cdProps,
              isMobile: state.isMobile,
              mode: 'horizontal',
            })}
            <WrapContent class="ant-pro-basicLayout-content" contentWidth={contentWidth}>
              {children}
            </WrapContent>
            <Layout.Footer>
              { footerRender && (
                isFun(footerRender) && footerRender(h) || footerRender
              ) || (
                <GlobalFooter>
                  <template slot="links">
                    <a href="https://www.github.com/vueComponent/" target="_self">Github</a>
                    <a href="https://www.github.com/sendya/" target="_self">@Sendya</a>
                  </template>
                  <template slot="copyright">
                    <a href="https://github.com/vueComponent">vueComponent</a>
                  </template>
                </GlobalFooter>
              )}
            </Layout.Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}

export default BasicLayout

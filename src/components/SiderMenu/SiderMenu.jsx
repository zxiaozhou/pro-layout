import './index.less'

import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { Layout, Menu, Icon } from 'ant-design-vue'

const {
  Item: MenuItem,
  SubMenu
} = Menu

import BaseMenu from '../RouteMenu'

const { Sider } = Layout

export const SiderMenuProps = {
  i18nRender: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).def(false),
  mode: PropTypes.string.def('inline'),
  theme: PropTypes.string.def('dark'),
  contentWidth: PropTypes.bool,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  handleCollapse: PropTypes.func,
  menus: PropTypes.array,
  siderWidth: PropTypes.number.def(256),
  isMobile: PropTypes.bool,
  layout: PropTypes.string.def('inline'),
  fixSiderbar: PropTypes.bool,
  logo: PropTypes.any,
  title: PropTypes.string.def(''),
  menuHeaderRender: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
}

export const defaultRenderLogo = (h, logo) => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />
  }
  if (typeof logo === 'function') {
    return logo()
  }
  return h(logo)
}

export const defaultRenderLogoAntTitle = (h, props) => {
  const {
    logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
    title,
    menuHeaderRender
  } = props
  console.log('defaultRenderLogoAntTitle.menuHeaderRender', menuHeaderRender)
  if (menuHeaderRender === false) {
    return null
  }
  const logoDom = defaultRenderLogo(h, logo)
  const titleDom = <h1>{title}</h1>

  if (menuHeaderRender) {
    return menuHeaderRender(h, logoDom, props.collapsed ? null : titleDom, props)
  }
  return (
    <span>
      {logoDom}
      {titleDom}
    </span>
  )
}

export const defaultRenderMenuFooter = (h, props) => {
  return null
}

const defaultRenderCollapsedButton = (h, collapsed) => (
  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
)

const SiderMenu = {
  name: 'SiderMenu',
  model: {
    prop: 'collapsed',
    event: 'collapse'
  },
  props: SiderMenuProps,
  render (h) {
    const {
      collapsible,
      collapsed,
      siderWidth,
      fixSiderbar,
      mode,
      theme,
      menus,
      logo,
      title,
      handleCollapse,
      onMenuHeaderClick = () => null,
      i18nRender,
      menuHeaderRender
    } = this
    const siderCls = ['ant-pro-sider-menu-sider']
    if (fixSiderbar) siderCls.push('fix-sider-bar')
    if (theme === 'light') siderCls.push('light')
    //
    // const handleCollapse = (collapsed, type) => {
    //   this.$emit('collapse', collapsed)
    // }

    const headerDom = defaultRenderLogoAntTitle(h, {
      logo, title, menuHeaderRender, collapsed
    })
    console.log('headerDom', headerDom)
    const footerDom = defaultRenderMenuFooter(h, {
      ...this.$props
    })
    const collapsedButtonRender = defaultRenderCollapsedButton
    const isMobile = false

    return (<Sider
      class={siderCls}
      breakpoint={'lg'}
      trigger={null}
      width={siderWidth}
      collapsedWidth={48}
      theme={theme}
      collapsible={collapsible}
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      {headerDom && (
        <div
          class="ant-pro-sider-menu-logo"
          onClick={onMenuHeaderClick}
          id="logo"
        >
          <router-link to={{ path: '/' }}>
            {headerDom}
          </router-link>
        </div>
      )}
      <BaseMenu collapsed={collapsed} menus={menus} mode={mode} theme={theme} i18nRender={i18nRender} />
      <div class="ant-pro-sider-links">
        <Menu
          class={'ant-pro-sider-link-menu'}
          theme={theme}
          inlineIndent={16}
          selectedKeys={[]}
          openKeys={[]}
          mode="inline"
        >
          {collapsedButtonRender && !isMobile && (
            <Menu.Item
              class={`ant-pro-sider-collapsed-button`}
              title={false}
              onClick={() => {
                if (handleCollapse) {
                  handleCollapse(!collapsed)
                }
              }}
            >
              {collapsedButtonRender(h, collapsed)}
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Sider>)
  }
}

export default SiderMenu

import BasicLayout, { BasicLayoutProps } from './BasicLayout'
import BlockLayout from './BlockLayout'
import PageContainer from './components/PageContainer'
import SiderMenuWrapper from './components/SiderMenu'
import GlobalFooter from './components/GlobalFooter'
import SettingDrawer from './components/SettingDrawer'
import DocumentTitle from './components/DocumentTitle'
import { updateTheme } from './utils/dynamicTheme'

export {
  GlobalFooter,
  // old export name
  PageContainer as PageHeaderWrapper,
  PageContainer,
  SiderMenuWrapper,
  BlockLayout,
  SettingDrawer,
  DocumentTitle,
  BasicLayoutProps,

  updateTheme
}

export default BasicLayout

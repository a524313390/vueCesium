import { createPinia } from 'pinia'
import {useViewerStore} from './modules/viewer'
const store = createPinia();
export {useViewerStore}
export default store;
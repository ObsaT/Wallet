import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, polygon, base, type AppKitNetwork} from '@reown/appkit/networks'
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/InfoList.vue';
export const projectId = import.meta.env.VITE_PROJECT_ID || "ec61a0b2116c95e42965497b544ca36c"
 // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, polygon, base]

export const ethersAdapter = new EthersAdapter()
export const appKitConfig = {
  projectId,
  networks,
  adapter: ethersAdapter,
  // this is only for testing purposes, do not use in production
  enableDebug: import.meta.env.DEV,
}
export const appKitConfigWithProjectId = {
  ...appKitConfig,
  projectId: import.meta.env.VITE_PROJECT_ID || "ec61a0b2116c95e42965497b544ca36c",
}
const routes = [
  { path: '/Home', name: 'Home', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
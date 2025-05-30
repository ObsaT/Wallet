<template>
       <main class="content">  
      <CandlestickChart />
      <div class="connect-section">
        <h2>Connect Wallet</h2>
        <p>This website only accepts access from decentralized wallet DAPP browsers.</p>
        <ActionButtonList />
      </div>
    </main>
</template>

<script lang="ts">
import {
  createAppKit,
  useAppKitAccount,
} from '@reown/appkit/vue'
import { ethersAdapter, networks, projectId } from '../config/index'
import CandlestickChart from '../components/CandlestickChart.vue'
import ActionButtonList from "../components/ActionButton.vue"
import InfoList from "../components/InfoList.vue";
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const walletAddress = ref('');
const accountInfo = useAppKitAccount();

// Initialize AppKit
createAppKit({
  adapters: [ethersAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true
  },
  metadata: {
    name: 'AppKit Vue Example',
    description: 'AppKit Vue Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export default {
  name: "App",
  components: {
    ActionButtonList,
    InfoList,
    CandlestickChart
  },
  setup() {
    const router = useRouter();
    watch(
      () => accountInfo.value.isConnected,
      (val) => {
        debugger
        if (accountInfo.value.isConnected) {
          router.push('/info') 
        }else{
          router.push('/') 
        }
      }
    )
       const shortenAddress = (address: string) => {
      if (!address) return '';
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return {
      walletAddress,
      shortenAddress,
      accountInfo,
    };
  }
};
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3700B3;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 100;
}

.toggle-theme {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
}

.content {
  padding: 1rem;
}

.connect-section {
  margin: 2rem auto;
  max-width: 480px;
  text-align: center;
}

.connect-btn {
  background-color: #0336ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}
.connect-btn:hover {
  background-color: #6200ee;
}

.wallet-address {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

:root {
  --bg: #ffffff;
  --text: #111111;
}
.dark {
  --bg: #121212;
  --text: #f0f0f0;
}

@media (max-width: 600px) {
  .header {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }

  .connect-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .content {
    padding: 0.75rem;
  }
  
  .wallet-address {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>

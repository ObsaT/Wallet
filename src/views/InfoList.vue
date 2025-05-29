<!-- <template>
    <section>
      <h2>useAppKit</h2>
      <pre>
Address: {{ accountInfo.address }}
caip Address: {{ accountInfo.caipAddress }}
Connected: {{ accountInfo.isConnected }}
Status: {{ accountInfo.status }}
      </pre>
    </section>

    <section>
      <h2>Theme</h2>
      <pre>
Theme: {{ kitTheme.themeMode }}
      </pre>
    </section>

    <section>
      <h2>State</h2>
      <pre>
open: {{ state.open }}
selectedNetworkId: {{ state.selectedNetworkId }}
      </pre>
    </section>

    <section>
      <h2>WalletInfo</h2>
      <pre>
Name: {{ walletInfo?.name }}<br />
      </pre>
    </section>
</template> -->
  <template>
  <div class="defi-portfolio">
    <div style="width: 100%; background-color: green;">
      <div style="display: flex; justify-content: flex-end;">
        <ActionButtonList />
      </div>
    </div>

    <div class="portfolio-container">
      
      <!-- Account Summary Section -->
      <div class="account-summary">
        <h1 class="title">DEFI P.E</h1>
        
        <div class="balance-card">
          <div class="balance-item">
            <p class="label">USDT Account</p>
            <p class="amount">55.0000000 USD</p>
          </div>
          
          <div class="balance-item">
            <p class="label">Total Revenue</p>
            <p class="amount">1.0000000 ETH</p>
          </div>
        </div>
      </div>
      
      <!-- Portfolio Section -->
      <div class="portfolio-section">
        <h2 class="section-title">Portfolio</h2>
        
        <div class="assets-grid">
          <!-- BTC Card -->
          <div class="asset-card">
            <div class="asset-header">
              <h3 class="asset-pair">BTC/USD</h3>
              <p class="asset-name">Bitcoin</p>
            </div>
            <div class="asset-price">
              <p class="price">$108630.99</p>
              <p class="change negative">-0.25%</p>
            </div>
          </div>
          
          <!-- ETH Card -->
          <div class="asset-card">
            <div class="asset-header">
              <h3 class="asset-pair">ETH/USD</h3>
              <p class="asset-name">Ethereum</p>
            </div>
            <div class="asset-price">
              <p class="price">$2560.26</p>
              <p class="change negative">-0.35%</p>
            </div>
          </div>
          
          <!-- ATOM Card -->
          <div class="asset-card">
            <div class="asset-header">
              <h3 class="asset-pair">ATOM/USD</h3>
              <p class="asset-name">ATOM</p>
            </div>
            <div class="asset-price">
              <p class="price">$4.989</p>
              <p class="change negative">-1.00%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { onMounted } from "vue";
import ActionButtonList from "../components/ActionButton.vue"
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/vue";

export default {
   components: {
    ActionButtonList,
  },
  name: "InfoList",
  setup(){
    const kitTheme = useAppKitTheme();
    const state = useAppKitState();
    const accountInfo = useAppKitAccount();
    const events = useAppKitEvents();
    const { walletInfo }  = useWalletInfo();

    onMounted(() => {
      console.log("Events: ", events);
    });

    return {
      kitTheme,
      state,
      accountInfo,
      walletInfo,
    };
  },
};
</script>

<style scoped>
.defi-portfolio {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.portfolio-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.account-summary {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.balance-card {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.balance-item {
  flex: 1;
}

.label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.amount {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.asset-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.asset-header {
  margin-bottom: 15px;
}

.asset-pair {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.asset-name {
  font-size: 14px;
  color: #666;
}

.asset-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: 500;
}

.change {
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

.change.negative {
  color: #f44336;
  background-color: rgba(244, 67, 54, 0.1);
}

/* Divider */
.divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .portfolio-container {
    flex-direction: row;
  }
  
  .account-summary {
    flex: 1;
    max-width: 300px;
  }
  
  .portfolio-section {
    flex: 2;
  }
}

@media (max-width: 480px) {
  .balance-card {
    flex-direction: column;
    gap: 15px;
  }
  
  .assets-grid {
    grid-template-columns: 1fr;
  }
}
</style>
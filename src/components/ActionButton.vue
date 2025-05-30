<template>
  <div>
     <button class="connect-btn"   @click="openAppKit">
      {{ accountInfo.isConnected ? 'Open'  : 'Connect'}}</button>
    <button   @click="handleDisconnect">Disconnect</button>
  </div>
</template>

<script>
import { useDisconnect, useAppKit, useAppKitNetwork,useAppKitAccount } from "@reown/appkit/vue";
import { networks } from "../config/index";
import { useRouter } from "vue-router"; 
const accountInfo = useAppKitAccount();

export default {
  name: "ActionButtonList",
  setup() {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const networkData = useAppKitNetwork();
    const router = useRouter();
    const openAppKit = () => open();
    const switchToNetwork = () => networkData.value.switchNetwork(networks[1]);
    const handleDisconnect = async () => {
        try {
          await disconnect();
          router.push('/'); // Redirect to home after disconnect
        } catch (error) {
          console.error("Error during disconnect:", error);
        }
    };

    return {
      handleDisconnect,
      openAppKit,
      switchToNetwork,
      accountInfo
    };
  },
};
</script>
<style>

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
</style>
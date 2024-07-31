import { Web3Modal } from "@web3modal/wagmi"
import { Chain, ChainFormatters } from "viem"


declare global {
  interface Window {
    walletconnect: {
      modal: Web3Modal,
      wagmiConfig: import("@wagmi/core").Config<readonly [import("viem").Chain, ...import("viem").Chain[]], any>,
      wagmi,
      viem,
      chain: Chain<ChainFormatters>
    }
  }
}

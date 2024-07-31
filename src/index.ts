import * as wagmi from '@wagmi/core';
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as viem from 'viem'
import { Chain, ChainFormatters } from 'viem'

const projectId = '/*%projectId%*/'
const chain: Chain<ChainFormatters> = {
  id: +'/*%chainId%*/',
  name: '/*%chainName%*/',
  nativeCurrency: {
    name: '/*%chainCurrencyName%*/',
    symbol: '/*%chainCurrencySymbol%*/',
    decimals: +'/*%chainCurrencyDecimals%*/'
  },
  rpcUrls: {
    default: {
      http: ['/*%chainRpcUrl%*/']
    }
  },
  blockExplorers: {
    default: {
      name: '/*%chainExploreName%*/',
      url: '/*%chainExploreUrl%*/',
      apiUrl: '/*%chainExploreApi%*/'
    }
  }
}

const customChain = viem.defineChain(chain)

const metaSite = {
  name: '/*%siteName%*/',
  description: '/*%siteDescription%*/',
  url: '/*%siteUrl%*/',
  icons: ['/*%siteIconUrl%*/']
}

const wagmiConfig = defaultWagmiConfig({
  chains: [customChain],
  projectId,
  metadata: metaSite,
})
wagmi.reconnect(wagmiConfig)

const modal: Web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId
})

globalThis.walletconnect = {
  modal,
  wagmiConfig,
  wagmi,
  viem,
  chain
}

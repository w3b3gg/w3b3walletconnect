import * as wagmi from '@wagmi/core';
import * as allChains from '@wagmi/core/chains'
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as viem from 'viem'
import { Chain, ChainFormatters } from 'viem'

const projectId = '/*%projectId%*/'

const metadata = {
  name: '/*%siteName%*/',
  description: '/*%siteDescription%*/',
  url: '/*%siteUrl%*/',
  icons: ['/*%siteIconUrl%*/']
}

//@ts-ignore
if ('/*%enableCustomChain%*/' === 'true') {
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

  const wagmiConfig = defaultWagmiConfig({
    projectId,
    metadata,
    chains: [customChain]
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
} else {
  const { http, reconnect } = wagmi

  type UiChainTypes = {
    chain: string,
    rpc: `https://${string}`
  }

  //@ts-ignore
  const uiChains: UiChainTypes[] = '/*%chains%*/'

  console.log('chains', uiChains)

  const chains: Chain[] = uiChains.map(({ chain }) => allChains[chain])
  let transports = {}
  uiChains.forEach(({ rpc }, index) => {
    transports[chains[index].id] = http(rpc)
  })

  console.assert(chains.length > 0, 'You need to put a chain in Project/W3B3 ConnectWallet')

  const wagmiConfig = defaultWagmiConfig({
    projectId,
    metadata,
    chains: [chains[0], ...chains.slice(1)],
    transports
  })
  reconnect(wagmiConfig)

  const modal: Web3Modal = createWeb3Modal({
    wagmiConfig,
    projectId
  })

  globalThis.walletconnect = {
    modal,
    wagmiConfig,
    wagmi,
    viem
  }
}

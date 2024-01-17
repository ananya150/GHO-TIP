"use client";
import React from 'react';
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { arbitrumSepolia, sepolia } from 'viem/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { ETH_KEY, ARB_KEY, WALLET_CONNECT_ID } from '@/utils/chains';
import theme from './theme.json'


// const chains = [sepolia, arbitrumSepolia]

const { publicClient, chains } = configureChains(
  [sepolia, arbitrumSepolia],
  [
    alchemyProvider({apiKey: ETH_KEY! }),
    alchemyProvider({apiKey: ARB_KEY! })
  ]
)

const config = createConfig(
    getDefaultConfig({
      // Required API Keys
      walletConnectProjectId: WALLET_CONNECT_ID!,
      chains,
      publicClient,  
      // Required
      appName: "GHO-TIP",
  
      // Optional
      // appDescription: "Your App Description",
      // appUrl: "https://family.co", // your app's url
      // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );

const Provider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider customTheme={theme}
>        
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default Provider
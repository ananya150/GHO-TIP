"use client"
import { ConnectKitButton } from "connectkit"

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ConnectKitButton />
    </div>
  )
}

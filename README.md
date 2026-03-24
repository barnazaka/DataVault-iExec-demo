# DataVault

DataVault is a clean, minimal application that demonstrates how to protect your personal data and list it for monetization on the iExec network using the real iExec DataProtector SDK.

## Features

- **Protect Data**: Encrypt and store your sensitive data (like emails or documents) securely using iExec's Confidential Computing technology.
- **Monetize Data**: List your protected data for monetization by setting a price per access in nRLC.
- **Privacy-First**: Your data remains encrypted throughout its lifecycle, and only authorized users/apps can process it.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- A Web3 wallet (e.g., MetaMask) connected to **Arbitrum One**.
- Some RLC and ETH (for gas) on Arbitrum One if you want to perform real transactions on-chain.

## How to Run Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   # Navigate to the project directory
   cd datavault
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`.

## How to Use

1. **Connect Wallet**: Click the "Connect Wallet" button and approve the connection in your Web3 wallet. Ensure you are on the Arbitrum One network.
2. **Protect Data**:
   - Enter a name for your data (e.g., "My Secret Email").
   - Enter the sensitive value you want to protect.
   - Click "Protect Data". This will trigger a transaction to encrypt and register your data on-chain as a Protected Data NFT.
3. **Monetize Data**:
   - Once the data is protected, you can set a "Price per access" in nRLC.
   - Click "List for Monetization". This will grant access to any user/app that pays the specified price.

## Tech Stack

- **React + TypeScript + Vite**: Fast and modern frontend development.
- **iExec DataProtector SDK**: The core SDK for confidential computing and data protection.
- **Wagmi & Viem**: For Ethereum wallet interactions.
- **TanStack Query**: For efficient data fetching and state management.

---

Built with ❤️ using [iExec Documentation](https://docs.iex.ec/get-started/welcome)

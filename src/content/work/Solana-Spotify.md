---
title: Spotify DApp on Solana
publishDate: 2022-05-15 00:00:00
img: /image/spotify.jpg
img_alt: Utilizing Solana Programs from a Spotify Dupe PWA
description: |
  Utilizing Solana Programs from a Spotify Dupe PWA
niches:
  - Blockchain
tags:
  - Blockchain
  - Rust
links:
  - github.com/devd-99/spotify-dapp
---
# Solana Spotify Project Overview

This project is a decentralized application (dApp) built on the Solana blockchain, integrating with a Spotify-like interface. It uses Next.js for the frontend and Anchor for the Solana program development.

## Key Components

### 1. Payment Component (`Payment.js`)

The main component handling the payment process and user interaction.

- Uses the Solana wallet adapter for wallet connection
- Interacts with the Solana program to process payments
- Displays a payment button and updates the payer list

Key functions:
- `getAllWallets()`: Fetches all payer accounts
- `payClicked()`: Processes the payment transaction

### 2. Solana Program (`lib.rs`)

The Rust-based Solana program defining the on-chain logic.

- Defines the `accept_payment` instruction
- Uses the `PayerAccount` struct to store payer information

Key structures:
- `PayerContext`: Defines the accounts required for the payment instruction
- `PayerAccount`: Stores the payer's wallet public key

### 3. Wallet Connection Provider (`WalletConnectionProvider.js`)

Provides wallet connection functionality to the application.

- Uses `@solana/wallet-adapter-react` for wallet integration
- Configures the Phantom wallet adapter

### 4. Program IDL

Defines the interface for the Solana program, including:
- The `acceptPayment` instruction
- The `PayerAccount` account structure

## Workflow

1. User connects their Phantom wallet
2. The application checks if the user has already paid
3. If not paid, the user can click the "Pay 0.1 Sol" button
4. The payment is processed on-chain using the Solana program
5. Upon successful payment, the user is redirected to the Spotify-like interface

## Technical Details

- Solana Host: Defined in `utils/const.js` (not provided in the snippets)
- Program ID: `HvFiRFSrpRCP77kzQ7u37BGNsmGcBs3Ayp21ZgiXQkdN`
- Payment Amount: 0.1 SOL (100,000,000 lamports)
- Receiver Address: `ANh76nb4KVU54fLVyGjaj6atvS3mASDcRTjaEPiSKwqD`

## Setup and Usage

1. Ensure you have a Phantom wallet installed and configured for Solana
2. Connect your wallet to the application
3. If you haven't paid, you'll see the payment screen
4. Click "Pay 0.1 Sol" to make the payment
5. After successful payment, you'll be redirected to the Spotify-like interface

## Notes

- The project uses Anchor for easier Solana program development
- The frontend is built with Next.js and uses Tailwind CSS for styling
- Error handling and transaction status updates are implemented for a better user experience
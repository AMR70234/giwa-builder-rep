# GIWA Builder Rep

[![Smart Contract Tests](https://github.com/AMR70234/giwa-builder-rep/actions/workflows/test.yml/badge.svg)](https://github.com/AMR70234/giwa-builder-rep/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

On-chain reputation for builders in the GIWA ecosystem. Attestations are weighted automatically by the issuer's own reputation — a vouch from a trusted builder counts more than one from a brand-new account.

**Status:** live on GIWA Sepolia with real profiles and attestations already on-chain — not just a deployed contract sitting empty.

**Live demo:** [giwa-builder-rep.vercel.app](https://giwa-builder-rep.vercel.app/)
**Contract (GIWA Sepolia):** [`0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B`](https://sepolia-explorer.giwa.io/address/0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B)

---

## The problem

As the GIWA ecosystem grows, there's no unified way to verify a builder's credibility before working with them. Reputation is scattered across GitHub, Twitter, and word of mouth — nothing permanent or verifiable on-chain.

## The solution

A simple smart contract where any builder can:

1. **Create a profile** with a handle
2. **Receive attestations** from other builders in categories like *Reliable Developer*, *Delivered Project*, *Security Conscious*
3. Have every attestation **automatically weighted** by the issuer's current reputation:

```solidity
issuerWeight = 1 + (issuerScore / 10)   // capped at 100
```

This protects the system from fake or spammy attestations — reputation has to be earned before it can be lent to someone else.

## Project structure

```
├── contracts/
│   └── GiwaBuilderRep.sol   # the smart contract
├── test/
│   └── test.js              # Hardhat test suite (6 passing tests)
├── scripts/
│   └── deploy.js            # deployment script
├── index.html                # frontend (vanilla JS + ethers.js, no build step)
└── hardhat.config.js
```

## Tech stack

- **Contract:** Solidity ^0.8.24
- **Tooling:** Hardhat, ethers.js
- **Frontend:** Plain HTML/CSS/JS — no framework, no build step
- **Network:** GIWA Sepolia (Chain ID `91342`)

## Running locally

```bash
npm install
npx hardhat compile
npx hardhat test
```

To deploy your own instance:

```bash
cp .env.example .env
# add your PRIVATE_KEY to .env
npx hardhat run scripts/deploy.js --network giwaSepolia
```

To run the frontend:

```bash
npx serve .
```

Then open the local URL in a browser with MetaMask installed, connected to GIWA Sepolia.

## Roadmap

- ~~Concept mockup of the reputation badge inside GIWA Wallet~~ ✅ live on the site — see the "Coming to GIWA Wallet" section
- Staking on attestations (slashed if proven false)
- Real integration inside the GIWA Wallet (not just a mockup)
- Public API for other GIWA projects to query builder reputation

## Built for

[GASOK](https://giwa.io/gasok) — GIWA's Web3 incubation & acceleration program. Track: **GIWA-Native Ideas**.

## License

MIT — see [LICENSE](./LICENSE).

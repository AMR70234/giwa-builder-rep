# GIWA Builder Rep — GASOK Application

## Project Name
**GIWA Builder Rep**

## Track
GIWA-Native Ideas

## Deployed Contract (Testnet)
`0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B`
https://sepolia-explorer.giwa.io/address/0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B

---

## 1. One-line pitch

An on-chain reputation system built for builders and developers in the GIWA ecosystem. Anyone can vouch for a builder through attestations, and each attestation is automatically weighted by the reputation of whoever issues it — not just a simple counter.

## 2. The problem

As the GIWA ecosystem grows — especially with accelerator programs like GASOK bringing in new teams — there's no unified, trustworthy way for investors, projects, or users to verify a builder's credibility before working with them. Reputation today is scattered across GitHub, Twitter, and word of mouth. There's no permanent, verifiable on-chain record.

## 3. The solution

A weighted, on-chain reputation system with a full product experience around it:

1. **Create a profile** with a clear handle
2. **Receive attestations** from other builders in specific categories (Reliable Developer, Delivered Project, Security Conscious, etc.)
3. **Have every attestation automatically weighted** by the reputation of whoever issued it — so a vouch from a trusted builder carries more weight than one from a brand-new account, protecting the system from fake or spammy attestations
4. **Progress through reputation levels** — Novice → Trusted → Veteran → Elder Builder — a simple, visible signal of track record at a glance
5. **Appear on a live leaderboard** ranked by score, pulled directly from on-chain data — no backend, no database, fully verifiable

## 4. Why GIWA

- GIWA is building its ecosystem from the ground up — this is the best possible moment to establish a shared reputation standard before the market fragments and it becomes harder to unify.
- The system is designed to integrate directly with the **GIWA Wallet** — a concept mockup of the reputation badge inside the wallet UI is already live on the site, showing exactly how a builder's score and level would surface without leaving the app.
- This is trust infrastructure — it's meant to serve every other project built on GIWA going forward, not a standalone consumer app.

## 5. Originality

The core differentiator from traditional attestation systems (like EAS or similar frameworks): **dynamic weighting**. There isn't a simple reputation system that automatically ties the strength of an attestation to the credibility of its issuer, entirely on-chain. The current formula:

```
issuer weight = 1 + (their current score ÷ 10)   [capped at 100]
```

As a builder earns real reputation, their attestations become more powerful — rewarding consistency and credibility, not just activity.

## 6. Feasibility — proof of work

This isn't just an idea on paper. Here's what's actually been done:

| Step | Status |
|---|---|
| Smart contract written (Solidity) | ✅ Complete |
| Automated tests (6 test cases) | ✅ All passing |
| Deployed to GIWA Sepolia Testnet | ✅ Complete |
| **Contract source code verified on Explorer** | ✅ Complete |
| **CI pipeline running tests on every push (GitHub Actions)** | ✅ Complete |
| **MIT License** | ✅ Complete |
| Full frontend connected to the contract | ✅ Complete and functional |
| Live leaderboard (on-chain event indexing, no backend) | ✅ Complete and functional |
| Reputation levels (Novice → Trusted → Veteran → Elder) | ✅ Complete |
| Use-case messaging for freelancers, DAOs, hackathons, and hiring | ✅ Complete |
| **Onboarding section for first-time GIWA users (wallet, faucet, network setup)** | ✅ Complete |
| **Concept mockup of the reputation badge inside GIWA Wallet** | ✅ Complete |
| **Real on-chain activity** — two independent profiles and a live attestation between them, not just an empty deployed contract | ✅ Complete |
| End-to-end live test (wallet connect, profile creation, data read) | ✅ Successfully completed on the live network |

## 7. Who it's for

- **Freelancers** — a portable track record that travels with their wallet across clients and platforms
- **DAOs** — weighting governance or contributor selection by earned reputation instead of token balance alone
- **Bounties & hackathons** — organizers can filter applicants by track record before reviewing a single submission
- **Hiring in Web3** — teams get a verifiable signal beyond a GitHub profile or resume

## 8. Market potential

Every accelerator or incubator — including GASOK itself — faces the same problem: how do you evaluate the credibility of applicants? This reputation system could become a real evaluation tool that GIWA uses to vet future projects, creating genuine usage from day one.

## 9. Team

A solo builder with a web development background, learning and applying Web3 development hands-on through this project. Despite being a one-person team, the full execution cycle has been demonstrated: idea → smart contract → testing → deployment → working frontend → live product with leaderboard and levels.

## 10. Roadmap

- **Short term:** Add a simple staking mechanism (locking a small amount when issuing an attestation, forfeited if proven false) to strengthen resistance to manipulation.
- **Mid term:** Move from the current concept mockup to a real, working integration inside the GIWA Wallet.
- **Long term:** Open a public API that any other project in the GIWA ecosystem can use to verify the credibility of developers they work with.

---

## Links
- **Contract on Explorer:** https://sepolia-explorer.giwa.io/address/0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B
- **Live site (Frontend):** https://giwa-builder-rep.vercel.app/
- **Source code:** https://github.com/AMR70234/giwa-builder-rep

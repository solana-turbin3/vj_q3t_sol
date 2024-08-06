# Introduction

This repo showcases work done for the WBA Turbine 2024 Q3 Cohort

# Turbine3 Work

## Prerequisite Task

In the prerequisite task for the Turbin3 cohort, we used typescript to generate a keypair, airdrop to that wallet, transfer sol, and enroll to the WBA registration program.

Folder:

    ts/prereqs.ts

## Rust Registration

In the registration task, we used rust to generate a keypair, airdrop to that wallet, swap between wallet keys and b58, transfer sol, and enroll to the WBA registration program.

Folder:

    rs/prereqs.rs

## 240730 - Class 1

In Class 1 we created a working token initizalizer, created the associated token account (ATA) within our own wallet for that token, then minted tokens into that ATA.

Files:

    ts\cluster1\spl_init.ts
    ts\cluster1\spl_mint.ts

Here is the final [transaction](https://explorer.solana.com/tx/3qtK6uMAhq8FEuBXfQagfPYYLBWtbGTXAnAx6fm8tv7ugmKkFw2PGGRXUAXUfNqoHHoT2akuNAinMEnPnptzXXR5?cluster=devnet) of this class' work, which is the mint tx.

## Necessary Run Tasks

1.  Standard install of necessary modules

        yarn  -- installs all dependencies mentioned in package.json
        nvm install node -- installs latest version of node . nvm --> node version manager

2.  Add a wba-wallet address private key locally, and double check <code>.gitignore</code> based on your wallet file naming convention
3.  After updating any ts files, use <code>yarn {name in package.json scripts}</code> to run them

        cd ts
        yarn spl_init

4. After creating mint address update spl_mint to create ATA account and add tokens to ATA account, use <code>yarn {name in package.json scripts}</code> to run them    
        cd ts
        yarn spl_mint
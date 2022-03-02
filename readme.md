# Umbria Dashboard

Unofficial Analytics Dashboard for the [Umbria Narni Bridge](https://bridge.umbria.network/staking-pool/)  
Main branch is deployed at https://umbrdash.netlify.app

## Features

- Sortable table of current reported APY yields for all assets across all networks
- Estimated APR rewards for staking UMBR on Ethereum or Polygon Networks
  - Calculated based on Average daily bridge volume for all assets as reported by Umbria Bridge API
  - All APR values based on current TVL and token prices (token prices provided by CoinGecko API)
- Plots of the average daily bridge volume values for all assets for the past 30 ,14 ,7, and 1 days

## Run Locally

Clone the repo and then install all npm packages.

```
npm install
```

Launch the local instance

```
npm start
```

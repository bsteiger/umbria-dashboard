# TODO

## Plans 2/5/21

- [ ] create network/bridgevolume/ endpoint
  - [ ] get data from get bridgeVolumeAll for [1,7,14,30] days
  - [ ] Single asset pivot chart
    - [ ] Dropdowns for:
      - [ ] Network
      - [ ] Bridge
    - [ ] Option to switch between usd and native currency
  - Later:
    - use this data to make apy
      - single time range doughnut charts for umbr earnings for each bridge
        - switchable between 1d, 7d, 14d, 30d
      - APY/Time plots for each bridge (similar to volume plots but in %)

# Data Plots to Implement

## Umbria Stats

Info for the protocol. No individual wallet info.  
_\*should provide 24h 7d, 30d averages_

- [x] Current UMBR Price
- [ ] Umbr Price history
- [ ] Filterable APY Table
  - [ ] Network (Bridge Side)
  - [ ] Asset
  - [ ] Bridge
  - [ ] TVL
  - [ ] Incoming Bridge Volume\*
  - [ ] APY\*
- [x] Bridge APYs
  - [ ] Bar Graph grouped by network
  - [ ] Table
- [ ] UMBR APY Breakdown
  - [ ] Pie Charts for each network
    - [ ] Pie chart title total UMBR APY
    - [ ] Slices contain effective APY(R?) per asset
- [ ] Graphs
  - [ ] For a given network/bridge/asset
    - [ ] Plot one of the following:
      - [ ] Bridge volume over time
      - [ ] APY
    - [ ] Comparable with other data on same axis
    - [ ] Allow USD or percent

## Wallet Address Stats

Info for a given wallet address

- [ ] Current USD of all assets staked on bridge
- [ ] Pie Chart
  - [ ] Single Network | All networks
  - [ ] Per Asset
    - [ ] If subgroup available break into bridge side
- [ ] Liquidity provided vs. earned (Stacked bar graph?)

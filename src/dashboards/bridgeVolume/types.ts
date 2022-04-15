export interface BridgeVolumeData {
  network: string;
  asset: string;
  price: number;
  days: string[];
  totalVols: number[];
  totalVolsUsd: number[];
  avgVols: number[];
  avgVolsUsd: number[];
}

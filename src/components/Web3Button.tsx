import React from "react";
import { useWeb3Context } from "../context/Web3Context";
import "../styles/web3button.css";
const buttonClasses = "web3btn btn btn-glow";

interface ConnectProps {
  connect: (() => Promise<void>) | null;
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <button className={buttonClasses} onClick={connect}>
      Connect Wallet
    </button>
  ) : (
    <button>Loading...</button>
  );
};

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null;
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <button className={buttonClasses} onClick={disconnect}>
      Disconnect
    </button>
  ) : (
    <button>Loading...</button>
  );
};

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context();

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  );
}

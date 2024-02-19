import React from "react";
import ReactDOM from "react-dom/client";
// wallet adapter
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// wallets
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { OolletWallet } from "@miskollc/oollet-adapter-plugin";

import "./index.css";
import App from "./App";

const wallets = [
  new PetraWallet(),
  new OolletWallet(),
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.log("Custom error handling", error);
      }}
    >
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);

import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  AccountInfo,
  NetworkInfo,
  WalletInfo,
} from "@aptos-labs/wallet-adapter-core";
//import Row from "./components/Row";
import Col from "./components/Col";
import SingleSignerTransaction from "./components/transactionFlow/SingleSigner";
import { Network } from "@aptos-labs/ts-sdk";

const isOolletWallet = (walletName?: string): boolean => {
  return walletName?.toLowerCase() === "oollet";
}

const isSendableNetwork = (connected: boolean, network?: string, walletName?: string): boolean => {
  return (
    connected &&
    (
      ((network?.toLowerCase() === Network.DEVNET.toLowerCase()) && (walletName?.toLowerCase() === "petra")) ||
      ((network?.toLowerCase() === Network.TESTNET.toLowerCase()) && (walletName?.toLowerCase() === "petra")) ||
      ((network?.toLowerCase() === Network.MAINNET.toLowerCase()) && (walletName?.toLowerCase() === "oollet"))
    )
  );
};

function App() {
  const { account, connected, network, wallet } = useWallet();
  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Oollet example web app</div>
        <div>
          <WalletSelector />
        </div>
      </div>
      <div className="center-link-container">
        <p><a href="https://github.com/miskollc/oollet-web-example/">Demo app source code</a></p>
      </div>
      <table className="table-auto w-full border-separate border-spacing-y-8 shadow-lg bg-white border-separate">
        <tbody>
          {connected && (
            <WalletProps wallet={wallet} network={network} account={account} />
          )}
          {connected && !isSendableNetwork(connected, network?.name, wallet?.name) && !isOolletWallet(wallet?.name) && (
            <tr>
              <Col title={true}></Col>
              <Col>
                <p style={{ color: "red" }}>
                  Aptos/Petra transactions only work with Devnet or Testnet networks
                </p>
              </Col>
            </tr>
          )}
          {connected && !isSendableNetwork(connected, network?.name, wallet?.name) && isOolletWallet(wallet?.name) && (
            <tr>
              <Col title={true}></Col>
              <Col>
                <p style={{ color: "red" }}>
                  OL/Oollet transactions only work with Mainnet network
                </p>
              </Col>
            </tr>
          )}
          {connected && (
            <SingleSignerTransaction isSendableNetwork={isSendableNetwork} isOolletWallet={isOolletWallet} />
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;


// TODO: Verify public key matches account
function WalletProps(props: {
  account: AccountInfo | null;
  network: NetworkInfo | null;
  wallet: WalletInfo | null;
}) {
  const { account, network } = props;

  return (
    <>
        <Col>
          <h3>
            <b>Wallet Information</b>
          </h3>
          <DisplayOptionalValue
            name={"Address"}
            value={account?.address}
          />
          <DisplayOptionalValue
            name={"Network"}
            value={network?.name}
          />
          <DisplayOptionalValue
            name={"URL"} 
            value={network?.url}
          />
          <DisplayOptionalValue name={"ChainId"} value={network?.chainId} />
        </Col>
    </>
  );
}

function DisplayOptionalValue(props: { name: string; value?: string }) {
  const { name, value } = props;
  return (
    <div>
      <p>
        <b>{name}:</b> {value}
      </p>
    </div>
  );
}
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
//import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  AccountInfo,
  NetworkInfo,
  WalletInfo,
} from "@aptos-labs/wallet-adapter-core";
import Row from "./components/Row";
import Col from "./components/Col";
//import Image from "next/image";

function App() {
  const { account, connected, network, wallet } = useWallet();
  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Oollet example web app</div>
        <div>
          <WalletConnector className="wallet-button"/>
        </div>
      </div>
      <div className="center-link-container">
        <p><a href="https://github.com/miskollc/oollet-web-example/">Demo app source code</a></p>
      </div>
      <table className="table-auto w-full border-separate border-spacing-y-8 shadow-lg bg-white border-separate">
        <tbody>
          {connected && (
            <Row>
              <Col title={true} border={true}>
                <h3>
                  <b>Wallet Information</b>
                </h3>
              </Col>
              <Col border={true} />
            </Row>
          )}
          {connected && (
            <WalletProps wallet={wallet} network={network} account={account} />
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
  const { account, network, wallet } = props;

  return (
    <>
      <tr>
        <Col title={true}>
          <h3>Wallet Name</h3>
        </Col>
        <Col>
          <b>Icon: </b>
          {props.wallet && (
            <img src={wallet?.icon ?? ""} alt={wallet?.name ?? ""} />
          )
          //  <Image
          //    src={wallet?.icon ?? ""}
          //    alt={wallet?.name ?? ""}
          //    width={25}
          //    height={25}
          // />
          //)
          }
          <b> Name: </b>
          {wallet?.name}
          <b> URL: </b>
          <a
            target="_blank"
            className="text-sky-600"
            rel="noreferrer"
            href={wallet?.url}
          >
            {wallet?.url}
          </a>
        </Col>
      </tr>
      <Row>
        <Col title={true}>
          <h3>Account Info</h3>
        </Col>
        <Col>
          <DisplayOptionalValue
            name={"Address"}
            value={account?.address}
          />
        </Col>
      </Row>
      <Row>
        <Col title={true}>
          <h3>Network Info</h3>
        </Col>
        <Col>
          <DisplayOptionalValue
            name={"Network Name"}
            value={network?.name}
          />
          <DisplayOptionalValue
            name={"URL"} 
            value={network?.url}
          />
          <DisplayOptionalValue name={"ChainId"} value={network?.chainId} />
        </Col>
      </Row>
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
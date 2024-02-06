import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import logo from "./assets/oollet.png";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Oollet example web app 2</div>
        <div>
          <WalletSelector />
        </div>
      </div>
      <div className="center-container">
        <img className="center-image" src={logo} alt="oollet" />
      </div>
    </>
  );
}

export default App;

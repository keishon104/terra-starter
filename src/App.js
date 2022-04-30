import "./App.css";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Menu from "./components/Menu/Menu";
import WalletAddress from "./components/Wallet/WalletAddress";

function App() {
  const { status, connect, disconnect, availableConnectTypes } = useWallet();

  console.log("Wallet status is: ", status);
  console.log("Available connection types: ", availableConnectTypes);

  const renderConnecButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div>
          <button
            type="button"
            key={`connect-EXTENSION `}
            onClick={() => connect("EXTENSION")}
            className="cta-button connect-wallet-button"
          >
            Connect Wallet
          </button>
        </div>
      );
    } else if (status === WalletStatus.WALLET_CONNECTED) {
      return (
        <button
          type="button"
          onClick={() => disconnect()}
          className="cta-button connect-wallet-button"
        >
          Disconnect Wallet
        </button>
      );
    }
  };

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>⚔ Goblin War ⚔</h1>
          <p>Only you can save us from Goblin town</p>
        </div>
        <WalletAddress />
      </header>

      <div>
        <img
          src="https://media.giphy.com/media/B19AYwNXoXtcs/giphy.gif"
          alt="Goblin gif"
        />
      </div>
      {status === WalletStatus.WALLET_CONNECTED && (
        <div className="game-menu-container">
          <Menu />
        </div>
      )}
      {renderConnecButton()}
    </main>
  );
}

export default App;

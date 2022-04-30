import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as query from "../contract/query";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import WalletAddress from "../components/Wallet/WalletAddress";

const Leaderboard = () => {
  const connectedWallet = useConnectedWallet();
  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchScores = async () => {
      if (connectedWallet && connectedWallet.network.name === "testnet") {
        return (await query.getScores(connectedWallet)).scores;
      }
    };
    fetchScores().then((scores) => {
      setScores(scores);
      setLoading(false);
    });
  }, [connectedWallet]);

  const renderScores = (scores) => {
    // If game is new and not played.
    if (!scores || scores.length < 1) {
      return <div> No scores available.</div>;
    }
    return scores.map((score, index) => {
      return (
        <div key={index} className="score">
          <span>
            {score[0].slice(0, 5) + "..." + score[0].slice(-4)}:{" "}
            {score[1].toString().padStart(2, "0")}
          </span>
        </div>
      );
    });
  };

  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>⚔ Goblin War ⚔️</h1>
            <p>Only you can save us from Goblin town</p>
          </div>
        </Link>
        <WalletAddress />
      </header>

      <div className="score-board-container">
        <h3>Scoreboard</h3>
        {/* If loading, show loading, else render */}
        {loading ? <div>Loading...</div> : renderScores(scores)}

        <div></div>
      </div>
    </main>
  );
};

export default Leaderboard;

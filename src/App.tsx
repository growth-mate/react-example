import { useContext } from "react";
import { WalletSelectorContext } from "./utils/wallet";
import { Ad } from "./components/Ad";

function App() {
	const walletSelector = useContext(WalletSelectorContext);

	return (
		<>
			<div className="left">
				<Ad
					unitId="BADeTNAXK4MgyNsyJ1cZXQ=="
					format="200x200"
				/>
				<Ad
					unitId="your ad unit id here"
					format="300x100"
				/>
			</div>
			<div className="main">
				<h1>
					{walletSelector && walletSelector?.accountId != null ? `GM, ${walletSelector!.accountId}!` : "GM!"}
				</h1>
				<div>
					This is an example implementation of a GrowthMate ad unit. <br /> More info at{" "}
					<a href="https://github.com/growth-mate/react-example/tree/main">
						https://github.com/growth-mate/react-example
					</a>
					.<br />
					<br />
					<button
						className="connect-wallet"
						onClick={async () => {
							if (walletSelector?.accountId != null) (await walletSelector!.selector.wallet()).signOut();
							else walletSelector!.modal.show();
						}}
					>
						{walletSelector && walletSelector?.accountId != null ? <p>Log Out</p> : <p>Connect Wallet</p>}
					</button>
				</div>
			</div>
			<div className="your ad unit id here">
				<Ad
					unitId="2"
					format="250x250"
				/>
			</div>
		</>
	);
}

export default App;

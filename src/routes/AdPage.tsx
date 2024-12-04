import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { Ad } from "../components/Ad";
import "./AdPage.css";

export const AdPage: React.FC = () => {
	const walletSelector = useContext(WalletSelectorContext);

	return (
		<div className="ad-page">
			<div className="main">
				<h1>
					{walletSelector && walletSelector?.accountId != null
						? `GM, ${walletSelector!.accountId}!`
						: "No more boring ads!"}
				</h1>
				<div>
					Our ad units only serve relevant ads that are based on your users recent on-chain activity.
					<br />
					This is an example implementation of a GrowthMate ad unit.{" "}
					<a
						className="more-info"
						href="https://github.com/growth-mate/react-example/tree/main"
					>
						More info
					</a>
					<br />
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
			<div className="ads">
				<div className="overflow-scroll">
					<div className="resizable">
						<Ad
							unitId="1W7xUZDbrIAMhKseC6tSUA=="
							format="Leaderboard"
						/>
					</div>
				</div>
				<div className="overflow-scroll">
					<div className="resizable">
						<Ad
							unitId="OhHdiR6xO06CdOhrlnmr/A=="
							format="Small Rectangle"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

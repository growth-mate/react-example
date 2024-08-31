import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { Ad } from "../components/Ad";
import "./AdPage.css";

export const AdPage: React.FC = () => {
	const walletSelector = useContext(WalletSelectorContext);

	return (
		<>
			<div className="top">
				<Ad
					unitId="1W7xUZDbrIAMhKseC6tSUA=="
					format="Leaderboard"
				/>
			</div>
			<div className="left">
				<Ad
					unitId="OhHdiR6xO06CdOhrlnmr/A=="
					format="Small Rectangle"
				/>
			</div>
			<div className="main">
				<h1>
					{walletSelector && walletSelector?.accountId != null ? `GM, ${walletSelector!.accountId}!` : "GM!"}
				</h1>
				<div>
					This is an example implementation of a GrowthMate ad unit. <br /> More info at{" "}
					<a href="https://github.com/growth-mate/ad-widget/tree/main">
						https://github.com/growth-mate/ad-widget
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
			<div className="right">
				<Ad
					unitId="2"
					format="Small Banner"
				/>
			</div>
		</>
	);
};

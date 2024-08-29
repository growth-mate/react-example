import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { Feed } from "../components";

export const FeedPage: React.FC = () => {
	const walletSelector = useContext(WalletSelectorContext);

	return (
		<>
			<div className="main">
				<h1>
					{walletSelector && walletSelector?.accountId != null ? `GM, ${walletSelector!.accountId}!` : "GM!"}
				</h1>
				<div>
					This is an example implementation of a GrowthMate feed. <br /> More info at{" "}
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
				<Feed feedId="test" />
			</div>
		</>
	);
};

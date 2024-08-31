import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { Feed } from "../components";

export const FeedPage: React.FC = () => {
	const walletSelector = useContext(WalletSelectorContext);
	const isMobile = window.innerWidth <= 768;

	if (isMobile)
		return (
			<div style={{ margin: "1rem auto", display: "flex", flexFlow: "column nowrap", gap: 15, width: 300 }}>
				<h1>
					{walletSelector && walletSelector?.accountId != null ? `GM, ${walletSelector!.accountId}!` : "GM!"}
				</h1>
				<div>
					The <i>easiest way</i> to engage on NEAR. Log in with your wallet to discover actions curated for
					you.
				</div>
				<button
					className="connect-wallet"
					onClick={async () => {
						if (walletSelector?.accountId != null) (await walletSelector!.selector.wallet()).signOut();
						else walletSelector!.modal.show();
					}}
				>
					{walletSelector && walletSelector?.accountId != null ? <p>Log Out</p> : <p>Connect Wallet</p>}
				</button>

				<div className="left">
					<Feed unitId="56kI7qxIQM34KtqlHpYnGg==" />
				</div>
				<div style={{ marginTop: "auto", opacity: 0.3 }}>
					This is an example implementation of a GrowthMate feed. <br /> More info at{" "}
					<a href="https://github.com/growth-mate/react-example/tree/main">
						https://github.com/growth-mate/react-example
					</a>
					.<br />
				</div>
			</div>
		);

	return (
		<>
			<div className="left">
				<Feed unitId="56kI7qxIQM34KtqlHpYnGg==" />
			</div>
			<div
				className="main"
				style={{ height: 350, paddingTop: 50 }}
			>
				<h1>
					{walletSelector && walletSelector?.accountId != null ? `GM, ${walletSelector!.accountId}!` : "GM!"}
				</h1>
				<div>
					The <i>easiest way</i> to engage on NEAR. Log in with your wallet to discover actions curated for
					you.
				</div>
				<button
					className="connect-wallet"
					onClick={async () => {
						if (walletSelector?.accountId != null) (await walletSelector!.selector.wallet()).signOut();
						else walletSelector!.modal.show();
					}}
				>
					{walletSelector && walletSelector?.accountId != null ? <p>Log Out</p> : <p>Connect Wallet</p>}
				</button>
				<div style={{ marginTop: "auto", opacity: 0.3 }}>
					This is an example implementation of a GrowthMate feed. <br /> More info at{" "}
					<a href="https://github.com/growth-mate/react-example/tree/main">
						https://github.com/growth-mate/react-example
					</a>
					.<br />
				</div>
			</div>
			<div className="right">
				<Feed unitId="BpQ1FqdowtXqsQfzTQxXLA==" />
			</div>
		</>
	);
};

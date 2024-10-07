import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { useSearchParams } from "react-router-dom";
import { Feed } from "../components";
import "./FeedPage.css";

export const FeedPage: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, _] = useSearchParams();
	const walletSelector = useContext(WalletSelectorContext);
	const isMobile = window.innerWidth <= 768;

	if (isMobile)
		return (
			<div className="feed-page">
				<div className="flex-column">
					<br />
					<h2>
						{walletSelector && walletSelector?.accountId != null
							? `GM, ${walletSelector!.accountId}!`
							: "Curated Actions for You"}
					</h2>
					<div>
						Discover the latest offers and news in your ecosystem based on your transaction history. Log in
						now and stay up to date! 🚀
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
					<br />
					<br />
					<div
						style={
							searchParams.has("unblur") || (walletSelector && walletSelector?.accountId != null)
								? {}
								: { filter: "blur(10px)" }
						}
					>
						<Feed unitId="YXegR/6lNM1JZVCpKyCFkg==" />
					</div>
					<div style={{ marginTop: "auto", opacity: 0.3 }}>
						This is an example implementation of a GrowthMate feed. <br /> More info at{" "}
						<a href="https://github.com/growth-mate/react-example/tree/main">
							https://github.com/growth-mate/react-example
						</a>
						.<br />
					</div>
					<br />
				</div>
			</div>
		);

	return (
		<div className="feed-page">
			<div className="flex-column">
				<div className="flex-row">
					<div
						className="left"
						style={
							searchParams.has("unblur") || (walletSelector && walletSelector?.accountId != null)
								? {}
								: { filter: "blur(10px)" }
						}
					>
						<Feed unitId="YXegR/6lNM1JZVCpKyCFkg==" />
					</div>
					<div className="right">
						<h2>
							{walletSelector && walletSelector?.accountId != null
								? `GM, ${walletSelector!.accountId}!`
								: "Curated Actions for You"}
						</h2>
						<div>
							Discover the latest offers and news in your ecosystem based on your transaction history. Log
							in now and stay up to date! 🚀
						</div>
						<button
							className="connect-wallet"
							onClick={async () => {
								if (walletSelector?.accountId != null)
									(await walletSelector!.selector.wallet()).signOut();
								else walletSelector!.modal.show();
							}}
						>
							{walletSelector && walletSelector?.accountId != null ? (
								<p>Log Out</p>
							) : (
								<p>Connect Wallet</p>
							)}
						</button>
					</div>
				</div>
				<div className="footer">
					This is an example implementation of a GrowthMate feed. <br /> More info at{" "}
					<a href="https://github.com/growth-mate/react-example/tree/main">
						https://github.com/growth-mate/react-example
					</a>
					.<br />
				</div>
			</div>
		</div>
	);
};

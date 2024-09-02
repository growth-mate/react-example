import React, { useContext } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { useSearchParams } from "react-router-dom";
import { Feed } from "../components";
import "./FeedPage.css";

export const FeedPage: React.FC = () => {
	const [searchParams, _] = useSearchParams();
	const walletSelector = useContext(WalletSelectorContext);
	const isMobile = window.innerWidth <= 768;

	if (isMobile)
		return (
			<div style={{ margin: "1rem auto", display: "flex", flexFlow: "column nowrap", gap: 15, width: 300 }}>
				<h1>
					{walletSelector && walletSelector?.accountId != null
						? `GM, ${walletSelector!.accountId}!`
						: "Curated Actions for You"}
				</h1>
				<div>Login with your wallet to access a personalized feed tailored to your transaction history.</div>
				<button
					className="connect-wallet"
					onClick={async () => {
						if (walletSelector?.accountId != null) (await walletSelector!.selector.wallet()).signOut();
						else walletSelector!.modal.show();
					}}
				>
					{walletSelector && walletSelector?.accountId != null ? <p>Log Out</p> : <p>Connect Wallet</p>}
				</button>
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
			</div>
		);

	return (
		<>
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
				<h1>
					{walletSelector && walletSelector?.accountId != null
						? `GM, ${walletSelector!.accountId}!`
						: "Curated Actions for You"}
				</h1>
				<div>Login with your wallet to access a personalized feed tailored to your transaction history.</div>
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
		</>
	);
};

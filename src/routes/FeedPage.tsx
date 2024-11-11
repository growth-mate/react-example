import React, { useContext, useEffect, useState } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { useSearchParams } from "react-router-dom";
import { Feed } from "../components";
import "./FeedPage.css";
import { Network, truncateAccountDisplay } from "../utils/network";

export const FeedPage: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, _] = useSearchParams();
	const walletSelector = useContext(WalletSelectorContext);
	const isMobile = window.innerWidth <= 768;
	const [selectedNetwork, setSelectedNetwork] = useState<Network>(Network.Near);
	const [accountId, setAccountId] = useState<string | null>(null);
	const [inputAccountId, setInputAccountId] = useState<string>("");

	useEffect(() => {
		if (walletSelector && walletSelector.accountId != null) {
			setAccountId(walletSelector.accountId);
		}
	}, [walletSelector]);

	if (isMobile)
		return (
			<div className="feed-page">
				<div className="flex-column">
					<br />
					<h2>
						{accountId != null
							? `GM, ${
									accountId.length > 10
										? truncateAccountDisplay(accountId, selectedNetwork)
										: accountId
							  }!`
							: "Curated Actions for You"}
					</h2>
					<div>
						Discover the latest offers and news in your ecosystem based on your transaction history. Log in
						now and stay up to date! 🚀
					</div>
					<div className="network-selector">
						<div>
							<label htmlFor="network-select">
								<h2>Select Network</h2>
							</label>
							<select
								id="network-select"
								aria-label="Select Network"
								onChange={async (e) => {
									// logout of near wallet if selector has accountId
									if (walletSelector && walletSelector?.accountId != null) {
										(await walletSelector!.selector.wallet()).signOut();
									}
									if (e.target.value != selectedNetwork) {
										setAccountId(null);
									}
									return setSelectedNetwork(Network[e.target.value as keyof typeof Network]);
								}}
							>
								{Object.keys(Network).map((network) => (
									<option
										key={network}
										value={network}
									>
										{network}
									</option>
								))}
							</select>
						</div>
						<div>
							<div className="network-selector">
								{selectedNetwork == Network.Near ? (
									<div>
										<input
											className="network-selector-input"
											type="text"
											// className="network-selector-input-disabled" in case of deactivation to allow only wallet connection
											// disabled={true}
											placeholder="Enter wallet address or connect"
											onChange={(e) => setInputAccountId(e.target.value)}
										/>
										<button
											className="connect-wallet"
											onClick={() => {
												setAccountId(inputAccountId);
												if (inputAccountId.length == 0) {
													setAccountId(null);
												}
											}}
										>
											Load Feed
										</button>
									</div>
								) : (
									<div>
										<input
											className="network-selector-input"
											type="text"
											placeholder="Enter your Wallet Address"
											onChange={(e) => setInputAccountId(e.target.value)}
										/>
										<button
											className="connect-wallet"
											onClick={() => {
												setAccountId(inputAccountId);
												if (inputAccountId.length == 0) {
													setAccountId(null);
												}
											}}
										>
											Load Feed
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
					<br />
					<br />
					<div
						style={
							searchParams.has("unblur") ||
							(walletSelector && walletSelector?.accountId != null) ||
							accountId != null
								? {}
								: { filter: "blur(10px)" }
						}
					>
						<Feed
							unitId="YXegR/6lNM1JZVCpKyCFkg=="
							network={selectedNetwork}
							accountId={accountId ?? undefined}
						/>
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
							searchParams.has("unblur") ||
							(walletSelector && walletSelector?.accountId != null) ||
							accountId != null
								? {}
								: { filter: "blur(10px)" }
						}
					>
						<Feed
							unitId="YXegR/6lNM1JZVCpKyCFkg=="
							network={selectedNetwork}
							accountId={accountId ?? undefined}
						/>
					</div>
					<div className="right">
						<h2>
							{accountId != null
								? `GM, ${
										accountId.length > 10
											? truncateAccountDisplay(accountId, selectedNetwork)
											: accountId
								  }!`
								: "Curated Actions for You"}
						</h2>
						<div>
							Discover the latest offers and news in your ecosystem based on your transaction history. Log
							in now and stay up to date! 🚀
						</div>
						<div className="network-selector">
							<div>
								<label htmlFor="network-select">
									<h2>Select Network</h2>
								</label>
								<select
									id="network-select"
									aria-label="Select Network"
									onChange={async (e) => {
										// logout of near wallet if selector has accountId
										if (walletSelector && walletSelector?.accountId != null) {
											(await walletSelector!.selector.wallet()).signOut();
										}
										if (e.target.value != selectedNetwork) {
											setAccountId(null);
										}
										return setSelectedNetwork(Network[e.target.value as keyof typeof Network]);
									}}
								>
									{Object.keys(Network).map((network) => (
										<option
											key={network}
											value={network}
										>
											{network}
										</option>
									))}
								</select>
							</div>
							<div>
								<div className="network-selector">
									{selectedNetwork == Network.Near ? (
										<div>
											<input
												className="network-selector-input"
												type="text"
												placeholder="Enter wallet address or connect"
												onChange={(e) => setInputAccountId(e.target.value)}
											/>
											<button
												className="connect-wallet"
												onClick={() => {
													setAccountId(inputAccountId);
													if (inputAccountId.length == 0) {
														setAccountId(null);
													}
												}}
											>
												Load Feed
											</button>
										</div>
									) : (
										<div>
											<input
												className="network-selector-input"
												type="text"
												placeholder="Enter your Wallet Address"
												onChange={(e) => setInputAccountId(e.target.value)}
											/>
											<button
												className="connect-wallet"
												onClick={() => {
													setAccountId(inputAccountId);
													if (inputAccountId.length == 0) {
														setAccountId(null);
													}
												}}
											>
												Load Feed
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
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

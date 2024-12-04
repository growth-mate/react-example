import React, { useContext, useEffect, useState } from "react";
import { WalletSelectorContext } from "../utils/wallet";
import { useSearchParams } from "react-router-dom";
import { Feed } from "../components";
import "./FeedPage.css";
import { truncateAccountDisplay } from "../utils/network";
import { Button, Select, TextField } from "@radix-ui/themes";
import { ArrowRightIcon } from "lucide-react";

const networks = ["Near", "Ethereum", "Polygon", "Optimism", "Arbitrum", "Base"] as const;
type Network = (typeof networks)[number];

export const FeedPage: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, _] = useSearchParams();
	const walletSelector = useContext(WalletSelectorContext);
	const isMobile = window.innerWidth <= 768;
	const [selectedNetwork, setSelectedNetwork] = useState<Network>("Near");
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
									accountId.length > 20
										? truncateAccountDisplay(accountId, selectedNetwork)
										: accountId
							  }!`
							: "Curated Actions for You"}
					</h2>
					<div>
						Discover the latest offers and news in your ecosystem based on your transaction history. Log in
						now and stay up to date! 🚀
					</div>
					<div className="inputs">
						<Select.Root
							size="3"
							value={selectedNetwork}
							onValueChange={(value: Network) => setSelectedNetwork(value)}
						>
							<Select.Trigger
								className="network-input"
								variant="soft"
								color="gray"
							/>
							<Select.Content>
								{networks.map((network) => (
									<Select.Item
										key={network}
										value={network}
									>
										{network}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
						<TextField.Root
							color="gray"
							variant="soft"
							size="3"
							className="account-input"
							placeholder="Wallet Address"
							onChange={(e) => setInputAccountId(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setAccountId(inputAccountId);
									if (inputAccountId.length == 0) {
										setAccountId(null);
									}
								}
							}}
						/>
						<Button
							variant="soft"
							color="gray"
							size="3"
							className="submit-button"
							onClick={() => {
								setAccountId(inputAccountId);
								if (inputAccountId.length == 0) {
									setAccountId(null);
								}
							}}
						>
							<ArrowRightIcon />
						</Button>
					</div>
					<Feed
						unitId={searchParams.get("unitId") ?? "YXegR/6lNM1JZVCpKyCFkg=="}
						network={selectedNetwork}
						accountId={accountId ?? undefined}
						className="mobile-feed"
					/>
					<br />
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
					<div className="left">
						<Feed
							unitId={searchParams.get("unitId") ?? "YXegR/6lNM1JZVCpKyCFkg=="}
							network={selectedNetwork}
							accountId={accountId ?? undefined}
						/>
					</div>
					<div className="right sticky">
						<h2>
							{accountId != null
								? `GM, ${
										accountId.length > 20
											? truncateAccountDisplay(accountId, selectedNetwork)
											: accountId
								  }!`
								: "Curated Actions for You"}
						</h2>
						<div>
							Discover the latest offers and news in your ecosystem based on your transaction history. Log
							in now and stay up to date! 🚀
						</div>
						<div className="inputs">
							<Select.Root
								size="3"
								value={selectedNetwork}
								onValueChange={(value: Network) => setSelectedNetwork(value)}
							>
								<Select.Trigger
									className="network-input"
									variant="soft"
									color="gray"
								/>
								<Select.Content>
									{networks.map((network) => (
										<Select.Item
											key={network}
											value={network}
										>
											{network}
										</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
							<TextField.Root
								color="gray"
								variant="soft"
								size="3"
								className="account-input"
								placeholder="Wallet Address"
								onChange={(e) => setInputAccountId(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setAccountId(inputAccountId);
										if (inputAccountId.length == 0) {
											setAccountId(null);
										}
									}
								}}
							/>
							<Button
								variant="soft"
								color="gray"
								size="3"
								className="submit-button"
								onClick={() => {
									setAccountId(inputAccountId);
									if (inputAccountId.length == 0) {
										setAccountId(null);
									}
								}}
							>
								<ArrowRightIcon />
							</Button>
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

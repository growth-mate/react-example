function getConfig(env: string) {
	switch (env) {
		case "production":
		case "mainnet":
			return {
				networkId: "mainnet",
				WNEAR_ADDRESS: "wrap.near",
				EXAMPLE_ADDRESS: "example.near",
				GROWTHMATE_ADDRESS: "pay.growthmate.near",
				nodeUrl: "https://free.rpc.fastnear.com/",
				walletUrl: "https://wallet.near.org",
				helperUrl: "https://api.kitwallet.app",
				explorerUrl: "https://explorer.mainnet.near.org",
			};
		case "development":
		case "testnet":
			return {
				networkId: "testnet",
				WNEAR_ADDRESS: "wrap.testnet",
				EXAMPLE_ADDRESS: "example.testnet",
				GROWTHMATE_ADDRESS: "lennczar.testnet",
				nodeUrl: "https://rpc.testnet.near.org",
				walletUrl: "https://wallet.testnet.near.org",
				helperUrl: "https://testnet-api.kitwallet.app",
				explorerUrl: "https://explorer.testnet.near.org",
			};
		case "betanet":
			return {
				networkId: "betanet",
				nodeUrl: "https://rpc.betanet.near.org",
				walletUrl: "https://wallet.betanet.near.org",
				helperUrl: "https://helper.betanet.near.org",
				explorerUrl: "https://explorer.betanet.near.org",
			};
		case "local":
			return {
				networkId: "local",
				nodeUrl: "http://localhost:3030",
				keyPath: `${process.env.HOME}/.near/validator_key.json`,
				walletUrl: "http://localhost:4000/wallet",
			};
		case "test":
		case "ci":
			return {
				networkId: "shared-test",
				nodeUrl: "https://rpc.ci-testnet.near.org",
				masterAccount: "test.near",
			};
		case "ci-betanet":
			return {
				networkId: "shared-test-staging",
				nodeUrl: "https://rpc.ci-betanet.near.org",
				masterAccount: "test.near",
			};
		default:
			throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
	}
}

export { getConfig };

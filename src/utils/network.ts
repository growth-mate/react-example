export enum Network {
	Near = "Near",
    Ethereum = "Ethereum",
    Polygon = "Polygon",
    Optimism = "Optimism",
    Arbitrum = "Arbitrum",
    Base = "Base",
}


export function truncateAccountDisplay(accountId: string, ecosystem: string) {
	switch (ecosystem) {
		case "Near":
			// For Near, truncate to 12 characters have the .near suffix included if possible
			// but when no .near suffix, keep the first 3 and last 3 characters
			return accountId.endsWith(".near")
				? (accountId.length > 12 ? `${accountId.slice(0, 9)}...` : accountId)
				: (accountId.length > 8 ? `${accountId.slice(0, 3)}...${accountId.slice(-3)}` : accountId);
		default:
			// Default case, keep the first 5 (0xABC) and last 3 characters
			return `${accountId.slice(0, 5)}...${accountId.slice(-3)}`;
	}
}

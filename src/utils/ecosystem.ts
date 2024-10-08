export type Ecosystem = {
	name: string;
	paragraph: string;
};

export const Ecosystems: Ecosystem[] = [
	{
  name: "Near",
  paragraph: "The Near ecosystem",
},
{
  name: "Ethereum",
  paragraph: "The Ethereum ecosystem",
},
{
  name: "Polygon",
  paragraph: "The Polygon ecosystem",
},
];

export function truncateAccountId(accountId: string) {
	return `${accountId.slice(0, 5)}...${accountId.slice(-3)}`;
}

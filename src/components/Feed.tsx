import React from "react";
import { Ad } from "./Ad";

interface IFeed {
	feedId: string;
	accountId?: string;
	className?: string;
}

const Feed: React.FC<IFeed> = ({ feedId, accountId, className }) => {
	return (
		<div
			className={`gm-feed ${className ?? ""}`}
			data-gm-id={feedId}
			data-gm-account-id={accountId ?? null}
		>
			<Ad
				unitId="6JdSUkpf0AGTaAQYxb8Mkw=="
				format="Small Rectangle"
			/>
			<Ad
				unitId="hcxNjzZU73mPl1NkoljMPQ=="
				format="Small Rectangle"
			/>
			<Ad
				unitId="86Dsfjrb7qFVMKre01qYCw=="
				format="Small Rectangle"
			/>
			<Ad
				unitId="gPvY0MlKT/r7zyafMIfuDA=="
				format="Small Rectangle"
			/>
			<Ad
				unitId="0HrBew0MqfzQEQioktav8g=="
				format="Small Rectangle"
			/>
		</div>
	);
};

export { Feed };
export type { IFeed };

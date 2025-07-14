import React, { useEffect } from "react";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		growthmate: any;
	}
}

interface IAd {
	unitId: string;
	format: string;
	accountId?: string;
	network?: string;
	className?: string;
}

const Ad: React.FC<IAd> = ({ unitId, format, accountId, network, className }) => {
	useEffect(() => {
		if (window.growthmate !== undefined) window.growthmate.register(unitId);

		let script: HTMLScriptElement | null = document.querySelector("#gm-ad-script");
		if (!script) {
			script = document.createElement("script");
			script.src = "https://cdn.growthmate.xyz/scripts/v0.3.2/ad-unit-manager.react.js";
			script.id = "gm-ad-script";
			document.head.appendChild(script);
		}

		script.addEventListener("load", () => window.growthmate.register(unitId));

		return () => window.growthmate?.unregister(unitId);
	}, [unitId]);

	return (
		<a
			className={`gm-ad-unit ${className ?? ""}`}
			data-gm-id={unitId}
			data-gm-format={format}
			data-gm-account-id={accountId ?? null}
			data-gm-network={network ?? null}
		></a>
	);
};

export { Ad };
export type { IAd };

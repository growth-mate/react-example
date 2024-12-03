import React, { useEffect } from "react";

interface IAd {
	unitId: string;
	format: string;
	accountId?: string;
	network?: string;
	className?: string;
}

const Ad: React.FC<IAd> = ({ unitId, format, accountId, network, className }) => {
	useEffect(() => {
		if (window.growthmate !== undefined) window.growthmate.registerUnit(unitId);

		let script: HTMLScriptElement | null = document.querySelector("#gm-script");
		if (!script) {
			script = document.createElement("script");
			script.src = "https://cdn.growthmate.xyz/scripts/ad-unit-manager.react.js";
			script.id = "gm-script";
			document.head.appendChild(script);
		}

		script.addEventListener("load", () => window.growthmate.registerUnit(unitId));

		return () => window.growthmate?.unregisterUnit(unitId);
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

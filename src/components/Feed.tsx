import React, { useEffect } from "react";

declare global {
	interface Window {
		growthmate: {
			register: (unitId: string) => void;
			unregister: (unitId: string) => void;
		};
	}
}

interface IFeed {
	unitId: string;
	accountId?: string;
	className?: string;
}

const Feed: React.FC<IFeed> = ({ unitId, accountId, className }) => {
	useEffect(() => {
		if (window.growthmate !== undefined) window.growthmate.register(unitId);

		let script: HTMLScriptElement | null = document.querySelector("#gm-script");
		if (!script) {
			script = document.createElement("script");
			script.src = "http://127.0.0.1:8080/feed-manager.react.js";
			script.id = "gm-script";
			document.head.appendChild(script);
		}

		script.addEventListener("load", () => window.growthmate.register(unitId));

		return () => window.growthmate?.unregister(unitId);
	}, [unitId]);

	return (
		<div
			className={`gm-feed ${className ?? ""}`}
			data-gm-id={unitId}
			data-gm-account-id={accountId ?? null}
		></div>
	);
};

export { Feed };
export type { IFeed };

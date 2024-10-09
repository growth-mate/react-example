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
	ecosystemName?: string;
}

const Feed: React.FC<IFeed> = ({ unitId, accountId, className, ecosystemName }) => {
	useEffect(() => {
		const loadAndInitScript = () => {
			return new Promise<void>((resolve) => {
				let script: HTMLScriptElement | null = document.querySelector("#gm-script");
				if (!script) {
					script = document.createElement("script");
					script.src = "https://cdn.growthmate.xyz/scripts/feed-manager.react.js";
					script.id = "gm-script";
					document.head.appendChild(script);

					script.onload = () => {
						if (window.growthmate) {
							window.growthmate.register(unitId);
						}
						resolve();
					};
				} else {
					resolve();
				}
			});
		};

		loadAndInitScript().then(() => {
			if (window.growthmate) {
				window.growthmate.register(unitId);
			}
		});

		return () => {
			if (window.growthmate) {
				window.growthmate.unregister(unitId);
			}
		};
	}, [unitId, accountId]);

	return (
		<div
			className={`gm-feed ${className ?? ""}`}
			data-gm-id={unitId}
			data-gm-account-id={accountId ?? null}
			data-gm-ecosystem-name={ecosystemName ?? null}
		>
			<a className="gm-post--ghost" />
			<a className="gm-post--ghost" />
			<a className="gm-post--ghost" />
		</div>
	);
};

export { Feed };
export type { IFeed };

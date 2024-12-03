import { useEffect, useState, useRef } from "react";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		growthmate: any;
	}
}

type PostData = {
	postId: string;
	createdAt: string;
	topics: string[];
	link: string;
	avatar?: string;
	projectName: string;
	headline: string;
	description: string;
	cta: string;
};

type PostId = PostData["postId"];

type FeedDataEvent = CustomEvent<{
	posts: PostData[];
	registerClick: (postId: PostId) => void;
}>;

const useFeed = (unitId: string, accountId?: string, network?: string) => {
	const [feed, setFeed] = useState<PostData[]>([]);
	const registerClickRef = useRef<(postId: PostId) => void>();

	useEffect(() => {
		if (window.growthmate !== undefined) window.growthmate.registerUnit(unitId);

		let script: HTMLScriptElement | null = document.querySelector("#gm-feed-script");
		if (!script) {
			script = document.createElement("script");
			script.src = "https://cdn.growthmate.xyz/scripts/feed-manager.react.js";
			script.id = "gm-feed-script";
			document.head.appendChild(script);
		}

		script.addEventListener("load", () => window.growthmate.registerUnit(unitId));

		document.addEventListener("gm-feed-data", ((event: FeedDataEvent) => {
			setFeed(event.detail.posts);
			registerClickRef.current = event.detail.registerClick;
		}) as EventListener);

		return () => window.growthmate?.unregisterUnit(unitId);
	}, [unitId, accountId, network]);

	return {
		feed,
		feedProps: {
			"data-gm-id": unitId,
			"data-gm-account-id": accountId ?? null,
			"data-gm-network": network ?? null,
		},
		registerClick: registerClickRef.current!,
	};
};

export { useFeed };
export type { PostData, PostId };

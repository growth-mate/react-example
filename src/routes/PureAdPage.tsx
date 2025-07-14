import React, { useEffect, useState } from "react";
import { Ad } from "../components/Ad";
import "./PureAdPage.css";

const useResize = (fn: () => boolean) => {
	const [, forceUpdate] = useState({});
	useEffect(() => {
		const handleResize = () => forceUpdate({});
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [fn]);
	return fn();
};

export const PureAdPage: React.FC = () => {
	const isLeaderboard = useResize(() => window.innerWidth >= 648);

	return (
		<div className="pure-ad-page">
			{isLeaderboard ? (
				<Ad
					unitId="1W7xUZDbrIAMhKseC6tSUA=="
					format="Leaderboard"
					network="Near"
				/>
			) : (
				<Ad
					unitId="OhHdiR6xO06CdOhrlnmr/A=="
					format="Small Rectangle"
					network="Near"
				/>
			)}
		</div>
	);
};

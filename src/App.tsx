import { Routes, Route, Navigate } from "react-router-dom";
import { AdPage, FeedPage } from "./routes";
import React from "react";
import { PureAdPage } from "./routes/PureAdPage";

const App = () => {
	// Enable Amplitude
	React.useEffect(() => {
		// Amplitude analytics
		if (Object.prototype.hasOwnProperty.call(window, "amplitude")) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 })).promise.then(function () {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				window.amplitude.init("344a531fcd2975dbd1de0a38aa328371", {
					autocapture: { elementInteractions: true, sessions: true },
				});
			});
		}
	}, []);

	return (
		<Routes>
			<Route
				path="/ads"
				element={<AdPage />}
			/>
			<Route
				path="/pure-ads"
				element={<PureAdPage />}
			/>
			<Route
				path="/feeds"
				element={<FeedPage />}
			/>
			<Route
				index
				path="*"
				element={
					<Navigate
						to="/feeds"
						replace
					/>
				}
			/>
		</Routes>
	);
};

export default App;

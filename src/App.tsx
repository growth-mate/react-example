import { Routes, Route, Navigate } from "react-router-dom";
import { AdPage, FeedPage } from "./routes";

const App = () => (
	<Routes>
		<Route
			path="react-example/ads"
			element={<AdPage />}
		/>
		<Route
			path="react-example/feeds"
			element={<FeedPage />}
		/>
		<Route
			index
			path="react-example/*"
			element={
				<Navigate
					to="/react-example/feeds"
					replace
				/>
			}
		/>
	</Routes>
);

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { AdPage, FeedPage } from "./routes";

const App = () => (
	<Routes>
		<Route
			path="ads"
			element={<AdPage />}
		/>
		<Route
			path="feeds"
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

export default App;

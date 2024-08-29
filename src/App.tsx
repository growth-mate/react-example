import { Routes, Route } from "react-router";
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
	</Routes>
);

export default App;

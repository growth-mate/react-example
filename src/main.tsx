import "@near-wallet-selector/modal-ui/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { WalletSelectorContextProvider } from "./utils/wallet.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HashRouter>
			<WalletSelectorContextProvider>
				<App />
			</WalletSelectorContextProvider>
		</HashRouter>
	</React.StrictMode>
);

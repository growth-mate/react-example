import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { WalletSelectorContextProvider } from "./utils/wallet.tsx";
import "@near-wallet-selector/modal-ui/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<WalletSelectorContextProvider>
			<App />
		</WalletSelectorContextProvider>
	</React.StrictMode>
);

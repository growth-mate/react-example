import "@near-wallet-selector/modal-ui/styles.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { WalletSelectorContextProvider } from "./utils/wallet.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Theme
			accentColor="grass"
			radius="large"
			appearance="dark"
		>
			<HashRouter>
				<WalletSelectorContextProvider>
					<App />
				</WalletSelectorContextProvider>
			</HashRouter>
		</Theme>
	</React.StrictMode>
);

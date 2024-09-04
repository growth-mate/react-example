import type { AccountState, Network, NetworkId, WalletSelector } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";

import type { ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { distinctUntilChanged, map } from "rxjs";

import { getConfig } from "./near-config";

declare global {
	interface Window {
		NEAR_ENV: NetworkId;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nearConfig: any;
		selector: WalletSelector;
		modal: WalletSelectorModal;
	}
}

window.NEAR_ENV = "mainnet" as NetworkId;
window.nearConfig = getConfig(window.NEAR_ENV);

interface WalletSelectorContextValue {
	selector: WalletSelector;
	modal: WalletSelectorModal;
	accounts: Array<AccountState>;
	accountId: string | null;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

const WalletSelectorContextProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [selector, setSelector] = useState<WalletSelector | null>(null);
	const [modal, setModal] = useState<WalletSelectorModal | null>(null);
	const [accounts, setAccounts] = useState<Array<AccountState>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const init = useCallback(async () => {
		const _selector = await setupWalletSelector({
			network: {
				networkId: window.NEAR_ENV,
				nodeUrl: window.nearConfig.nodeUrl,
			} as Network,
			modules: [
				setupMyNearWallet(),
				setupSender(),
				setupHereWallet(),
				setupMeteorWallet(),
				setupBitteWallet(),
				setupNearMobileWallet(),
				setupNightly(),
			],
		});
		const _modal = setupModal(_selector, {
			contractId: window.nearConfig.GROWTHMATE_ADDRESS,
		});
		const state = _selector.store.getState();
		setAccounts(state.accounts);

		// this is added for debugging purpose only
		// for more information (https://github.com/near/wallet-selector/pull/764#issuecomment-1498073367)
		window.selector = _selector;
		window.modal = _modal;

		setSelector(_selector);
		setModal(_modal);
		setLoading(false);
	}, []);

	useEffect(() => {
		init().catch((err) => {
			console.error(err);
			alert("Failed to initialise wallet selector");
		});
	}, [init]);

	useEffect(() => {
		if (!selector) {
			return;
		}

		const subscription = selector.store.observable
			.pipe(
				map((state) => state.accounts),
				distinctUntilChanged()
			)
			.subscribe((nextAccounts) => {
				console.log("Accounts Update", nextAccounts);

				setAccounts(nextAccounts);
			});

		const onHideSubscription = modal!.on("onHide", ({ hideReason }) => {
			console.log(`The reason for hiding the modal ${hideReason}`);
		});

		return () => {
			subscription.unsubscribe();
			onHideSubscription.remove();
		};
	}, [selector, modal]);

	const walletSelectorContextValue = useMemo<WalletSelectorContextValue>(
		() => ({
			selector: selector!,
			modal: modal!,
			accounts,
			accountId: accounts.find((account) => account.active)?.accountId || null,
		}),
		[selector, modal, accounts]
	);

	if (loading) {
		return (
			<div className="lds-ellipsis">
				<div />
				<div />
				<div />
				<div />
			</div>
		);
	}

	return (
		<WalletSelectorContext.Provider value={walletSelectorContextValue}>{children}</WalletSelectorContext.Provider>
	);
};

export { WalletSelectorContext, WalletSelectorContextProvider };
export type { WalletSelectorContextValue };

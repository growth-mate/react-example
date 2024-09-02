# react-example

###### React + Typescript + wallet-selector

Dead simple [example integration](https://growth-mate.github.io/react-example/) of GrowthMate ad units.

This repository contains boilerplate code of a vite react-typescript app, plus the default implementation of wallet-selector.
Adding our ad units to it straightforward:

1. (_Just once_) Copy & paste the [`Ad` component](https://github.com/growth-mate/react-example/blob/main/src/components/Ad.tsx) to your project - no modifications required.

2. Position the ad units on the web page (in this example see [`App.tsx`](https://github.com/growth-mate/react-example/blob/main/src/App.tsx)). The embeds are generated by & can be copied from our website.
    ```tsx
    // example ad unit
    <Ad
    	unitId="BADeTNAXK4MgyNsyJ1cZXQ=="
    	format="200x200"
    />
    ```

**Note:** We provide you with all the necessary code & instructions upon creating an ad unit on our website.

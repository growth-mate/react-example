const LOCAL = false;

const MIN_ONSCREEN_TIME = 1000;
const MIN_ONSCREEN_PERCENTAGE = 50;
const DEBOUNCE_TIME = 1000;
const PADDING_GHOSTS = 4;  

const API_BASE_URL = LOCAL ? "http://localhost:3000" : "https://api.growthmate.xyz";
const CDN_BASE_URL = LOCAL ? "http://localhost:8080" : "https://cdn.growthmate.xyz/scripts";

const feedState = {};
const postState = {};

let intersectionObserver;

const stylesheet = document.createElement("link");
stylesheet.href = `${CDN_BASE_URL}/feed.css`;
stylesheet.type = "text/css";
stylesheet.rel = "stylesheet";

document.head.appendChild(stylesheet);

intersectionObserver = new IntersectionObserver(
    (entries) =>
        entries.forEach((e) => {
            const id = e.target.attributes.getNamedItem("data-gm-id").nodeValue;
            if (e.isIntersecting)
                postState[id]["timeout"] = setTimeout(() => {
                    registerImpression(id);
                }, MIN_ONSCREEN_TIME);
            else clearTimeout(postState[id]["timeout"]);
        }),
    { threshold: MIN_ONSCREEN_PERCENTAGE / 100 }
);

window["growthmate"] = {
    register: (id) => {

        const units = document.querySelectorAll(`div[data-gm-id="${id}"]`);
        
        if (units.length > 1) {
            console.error("Feed ids must be unique");
            return;
        }

        if (!intersectionObserver) {
            console.error("Missing intersection observer");
            return;
        }

        const unit = units[0];

        feedState[id] ??= {};

        if (
            feedState[id]["unit"] != undefined 
            && feedState[id]["creation_time"] != undefined 
            && Date.now() - feedState[id]["creation_time"] <= DEBOUNCE_TIME
        ) {
            unit.replaceWith(feedState[id]["unit"])
            return;
        } else if (feedState[id]["status"] != "loading") {
            feedState[id]["status"] = "loading";
            feedState[id]["unit"] = unit;
            serve(id).then(() => {
                feedState[id]["status"] = "success";
                feedState[id]["unit"].childNodes.forEach(post => {        
                    intersectionObserver.observe(post)
        
                    post.onclick = (e) => {
                        const id = e.target.attributes.getNamedItem("data-gm-id").nodeValue;
                        registerClick(id);
                        return true;
                    };
                });
            }).catch(err => {
                console.error("Error requesting feed", err);
                unit.setAttribute("data-gm-is-error", true);
                return;
            });
        } else {
            return;
        }
    },

    unregister: (id) => {
        delete feedState[id];
    }

}

const getEcosystemName = async (id) => {
    const ecosystemNameAttribute = feedState[id]?.["unit"].attributes.getNamedItem("data-gm-ecosystem-name")?.nodeValue;
    if (ecosystemNameAttribute) return ecosystemNameAttribute;

    if (window.selector && window.selector.isSignedIn()) {
        return "Near"
    }

    return null;
}

const getAccountId = async (id) => {
    const accountIdAttribute = feedState[id]?.["unit"].attributes.getNamedItem("data-gm-account-id")?.nodeValue;
    if (accountIdAttribute) return accountIdAttribute;

    if (window.selector && window.selector.isSignedIn()) {
        return (await (await window.selector.wallet()).getAccounts())[0].accountId;
    }

    return null;
}

const getAttributes = async (id) => {
    const ecosystemName = await getEcosystemName(id);
    const accountId = await getAccountId(id);
    return { ecosystemName, accountId };
}

const serve = async (id) => {
	const { accountId, ecosystemName } = await getAttributes(id);

	const request = await fetch(`${API_BASE_URL}/public/v0/rec/feed`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			account_id: accountId,
			unit_id: id,
            referrer: window.location.href,
            ecosystem_name: ecosystemName
		})
	});

    const response = await request.json();
    
    const unit = feedState[id]["unit"];
    unit.innerHTML = "";

    response.forEach(({ post_id, link, media_url }) => {
        postState[post_id] = {
            rec_id: post_id,
        }

        const post = document.createElement("a");
        post.setAttribute("class", "gm-post");
        post.setAttribute("href", link);
        post.setAttribute("target", "_blank");
        post.setAttribute("rel", "noopener");
        post.setAttribute("data-gm-id", post_id);
        post.style.backgroundImage = `url(${media_url})`;
        post.style.backgroundSize = "contain";

        unit.appendChild(post);
    })

    for (let i = 0; i < PADDING_GHOSTS; i++) {
        const ghost =  document.createElement("a")
        ghost.setAttribute("class", "gm-post--ghost")
        unit.appendChild(ghost);
    }
    
    feedState[id] = {
        ...feedState[id],
        creation_time: Date.now(),
        unit,
    }
};

const registerImpression = async (id) => {
    const { accountId } = await getAttributes(id);
    const rec_id = postState[id]?.["rec_id"];
    const ipr_id = postState[id]?.["ipr_id"];
    if (!!accountId || accountId == "" || rec_id == undefined || !!ipr_id) return;

    const request = await fetch(`${API_BASE_URL}/public/v0/ipr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ rec_id })
    });

    const response = await request.json();

    postState[id]["ipr_id"] = response.ipr_id;
};

const registerClick = async (id) => {
    const { accountId } = await getAttributes(id);
    const rec_id = postState[id]?.["rec_id"];
    const clk_id = postState[id]?.["clk_id"];
    if (!!accountId || accountId == "" || rec_id == undefined || !!clk_id) return;

    const request = await fetch(`${API_BASE_URL}/public/v0/clk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ rec_id })
    });

    const response = await request.json();

    postState[id]["clk_id"] = response.clk_id;
};
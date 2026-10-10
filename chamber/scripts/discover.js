import { items } from "../data/items.mjs";

const gridContainer = document.querySelector(".discover-grid");
const visitMessage = document.querySelector("#visitor-message");

function displayItems() {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";
    items.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add(`card-${index + 1}`);

        const title = document.createElement("h2");
        title.textContent = item.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.setAttribute("src", item.photo);
        img.setAttribute("alt", item.name);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "300");
        img.setAttribute("height", "200");
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = item.address;

        const desc = document.createElement("p");
        desc.textContent = item.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        gridContainer.appendChild(card);
    });
}

function handleVisits() {
    if (!visitMessage) return;
    const lastVisit = localStorage.getItem("last-visit-ls");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentVisit - Number(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("last-visit-ls", currentVisit);
}

displayItems();
handleVisits();
const months = [
    {name: "Septiembre 2025", message: "No hubieron fotos, pero aqui empezo todo."},
    {name: "Octubre 2025", folder: "october2025"},
    {name: "Diciembre 2025", message: "Lamentablemente estuvimos lejos este mes."},
    {name: "Enero 2026", folder: "january2026"},
    {name: "Febrero 2026", message: "No hubieron fotos, pero si recuerdos."},
    {name: "Marzo 2026", folder: "march2026", highlight: true},
    {name: "Abril 2026", folder: "april2026"},
    {name: "Mayo 2026", folder: "may2026"},
    {name: "Junio 2026", folder: "june2026"},
    {name: "Julio 2026", folder: "july2026"},
    {name: "Agosto 2026", folder:"august2026"},
    {name: "Septiembre 2026", folder: "september2026"}
];

const container = document.getElementById("gallery");

months.forEach(month => {
    const heading = document.createElement("h2");
    heading.textContent = month.name;
    container.appendChild(heading);

    const monthDiv = document.createElement("div");
    monthDiv.className = "month-photos fade-section";
    container.appendChild(monthDiv);

    if (month.highlight) {
        heading.classList.add("highlight-month");
    }

    loadMonthPhotos(month.folder, monthDiv, month.message);
});

function loadMonthPhotos(folderName, container, fallbackMessage) {
    let i = 1;
    let foundAny = false;

    function tryNext() {
        const img = new Image();
        img.src = `images/${folderName}/${i}.jpg`;

        img.onload = () => {
            foundAny = true;
            container.appendChild(img);
            i++;
            tryNext();
        };

        img.onerror = () => {
            if (!foundAny && fallbackMessage) {
                const note = document.createElement("p");
                note.textContent = fallbackMessage;
                note.className = "message"
                container.appendChild(note);
            }
        };
    }

    tryNext()
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG" && e.target.closest(".month-photos")) {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove("hidden");
    } else if (e.target === lightbox) {
        lightbox.classList.add("hidden");
    }
});
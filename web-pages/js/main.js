const url = new URL(window.location);
const queryParams = url.searchParams;
const defaultTitle = {
    en: "How to add a shortcut to the IFAM app in your home screen",
    es: "Como añadir un acceso directo a la aplicación de IFAM en la pantalla principal",
    eus: "Nola gehitu lasterbide bat IFAM aplikazioari zure orri nagusian"
};
const steps = {
    en: {
        stepOne: "Step 1: Click the <span class=\"fa-solid fa-arrow-up-from-bracket\">&nbsp;</span> button at the bottom of the screen.",
        stepTwo: "Step 2: Choose 'Add to Home Screen' <span class=\"fa-solid fa-square-plus\">&nbsp;</span>."
    },
    es: {
        stepOne: "Paso 1: Haz click en el botón <span class=\"fa-solid fa-arrow-up-from-bracket\">&nbsp;</span> en la parte inferior de la pantalla.",
        stepTwo: "Paso 2: Selecciona 'Añadir a la pantalla principal' <span class=\"fa-solid fa-square-plus\">&nbsp;</span>."
    },
    eus: {
        stepOne: "1. pausua: Pantallaren azpiko aldian agertzen den <span class=\"fa-solid fa-arrow-up-from-bracket\">&nbsp;</span> botoia sakatu.",
        stepTwo: "2. pausua: 'Gehitu orri nagusian' <span class=\"fa-solid fa-square-plus\">&nbsp;</span> hautatu."
    }
};
const deviceTypeImages = {
    utopic: "images/cilindro-ireki.jpg"
};

function getValidQueryParam(dict, queryName, defaultValue) {
    let queryParam = queryParams.get(queryName);
    return dict.hasOwnProperty(queryParam) ? queryParam : defaultValue;
};

function renderData() {
    let language = getValidQueryParam(steps, "language", "en");
    let deviceType = getValidQueryParam(deviceTypeImages, "device_type", "utopic");
    let deviceID = queryParams.get("device_id") ?? "";
    let redirectURL = new URL("irekiapp://open");
    redirectURL.searchParams.set("devId", deviceID)
    let deviceName = queryParams.get("device_name") ?? defaultTitle[language];

    if (queryParams.get("from_shortcut")) {
        // We're adding this invisble link because apparently iOS 
        // doesn't allow modifying the `location` for redirects
        let invisibleLink = document.createElement("a");
        invisibleLink.href = redirectURL.href;
        invisibleLink.style.display = 'none';
        document.body.appendChild(invisibleLink);
        invisibleLink.click();
        document.body.removeChild(invisibleLink);
        
        window.location.href = redirectURL.href;
    } else {
        url.searchParams.set("from_shortcut", true)
        history.replaceState(null, null, url.href);
    }
    
    let deviceNameTitle = document.getElementById("title");
    deviceNameTitle.append(deviceName);

    let stepOne = document.getElementById("stepOne");
    // We use innerHTML here because the content is not coming from
    // the user (it's fixed, and set by use). Otherwise, this could
    // lead to XSS attacks.
    stepOne.innerHTML = steps[language].stepOne;

    let stepTwo = document.getElementById("stepTwo");
    stepTwo.innerHTML = steps[language].stepTwo;

    let deviceTypeImage = document.getElementById("deviceTypeImage");
    deviceTypeImage.src = deviceTypeImages[deviceType];
}

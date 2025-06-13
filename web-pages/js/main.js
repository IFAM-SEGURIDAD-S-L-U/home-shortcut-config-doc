const queryParams = new URL(window.location).searchParams;
const steps = {
    en: {
        stepOne: "Step 1: Click the <span class=\"fa-solid fa-arrow-up-from-bracket\">&nbsp;</span> button at the bottom of the screen.",
        stepTwo: "Step 2: Choose 'Add to Home Screen' <span class=\"fa-solid fa-square-plus\">&nbsp;</span>."
    },
    es: {
        stepOne: "Paso 1: Haz click en el botón <span class=\"fa-solid fa-arrow-up-from-bracket\">&nbsp;</span> en la parte inferior de la pantalla.",
        stepTwo: "Paso 2: Selecciona 'Añadir a la pantalla principal' <span class=\"fa-solid fa-square-plus\">&nbsp;</span>."
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
    let deviceID = getValidQueryParam(deviceTypeImages, "device_id", "");

    let stepOne = document.getElementById("stepOne");
    // We use innerHTML here because the content is not coming from
    // the user (it's fixed, and set by use). Otherwise, this could
    // lead to XSS attacks.
    stepOne.innerHTML = steps[language].stepOne;

    let stepTwo = document.getElementById("stepTwo");
    stepTwo.innerHTML = steps[language].stepTwo;

    let deviceTypeImage = document.getElementById("deviceTypeImage");
    deviceTypeImage.src = deviceTypeImages[deviceType];

    if (queryParams.get("redirect-intent")) {
        window.location = "irekiapp://open?deviceid=" + deviceID;
    }
}

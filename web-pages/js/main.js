const queryParams = new URL(window.location).searchParams;
const steps = {
    en: {
        stepOne: "Step 1: Click the button at the bottom of the screen ",
        stepTwo: "Step 2: Choose 'Add to Home Screen' "
    },
    es: {
        stepOne: "Paso 1: Haz click en el botón debajo de la pantalla ",
        stepTwo: "Paso 2: Selecciona 'Añadir a la pantalla principal' "
    }
};
const deviceTypeImages = {
    utopic: "https://eurobrico.feriavalencia.com/wp-content/uploads/2024/09/Cilindro-IREKI.jpg"
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
    let stepOneIcon = document.createElement("i");
    stepOneIcon.classList = "fa-solid fa-arrow-up-from-bracket";
    stepOne.append(steps[language].stepOne);
    stepOne.appendChild(stepOneIcon);

    let stepTwo = document.getElementById("stepTwo");
    let stepTwoIcon = document.createElement("i");
    stepTwoIcon.classList = "fa-solid fa-square-plus";
    stepTwo.append(steps[language].stepTwo);
    stepTwo.appendChild(stepTwoIcon);

    let deviceTypeImage = document.getElementById("deviceTypeImage");
    deviceTypeImage.src = deviceTypeImages[deviceType];

    if (queryParams.get("redirect-intent")) {
        window.location = "irekiapp://open?deviceid=" + deviceID;
    }
}
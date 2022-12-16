// ES6 or Vanilla JavaScript

////////// Check Controls //////////

// Set variables for correction views.
let back = false;

/**
 * Swaps what side of a prescription scan is shown.
 */
function swapSides() {
    if (back) {
        document.getElementById('prescription-image').src = '/images/E000001NE02_side1.jpg';
        document.getElementById('swap-sides').innerHTML = 'Show Back';
    } else {
        document.getElementById('prescription-image').src = '/images/E000001NE02_side2.jpg';
        document.getElementById('swap-sides').innerHTML = 'Show Front';
    }

    back = !back;
}

/**
 * Redirect to corrections view.
 */
function showCorrections() {
    window.location.href = ('/apps/50k/check-corrections');
}

/**
 * Redirect to check view.
 */
function cancelCorrections() {
    window.location.href = ('/apps/50k/check');
}


////////// Web-flow Emulation //////////

// See if a web-flow object has been established.
if (window['web-flow']) {

    // Establish variables for substituting into global functions.
    let parameters = window['web-flow'];
    let root = parameters['root'] || '/';
    let value = parameters['value'] || 'value';
    let expectedParameters = parameters['expectedParameters'] || [];
    let readableReplacements = parameters['readableReplacements'] || [];
    let nextView = parameters['nextView'] || '/';
    let previousView = parameters['previousView'] || '/';
    let parameterString = '';

    // Get URL query.
    const urlParams = new URLSearchParams(window.location.search);
    const isError = urlParams.get('isError');

    // Get the expected parameters - redirect to start if any are missing.
    for (let i = 0; i < expectedParameters.length; i++) {
        let expectedParameter = expectedParameters[i];
        parameters[expectedParameter] = urlParams.get(expectedParameter);
        if (parameters[expectedParameter] === null || parameters[expectedParameter] === '') {
            location.replace(root);
        }
        parameterString += expectedParameter + '=' + parameters[expectedParameter] + '&';
    }

    // Substitute in human-readable parameters (if none supplied then use the value).
    let webFlowSubElems = document.getElementsByClassName('web-flow-sub');
    for (let i = 0; i < webFlowSubElems.length; i++) {
        let eleValue = webFlowSubElems[i].getAttribute('web-flow-sub-value');
        if (eleValue) {
            for (let j = 0; j < expectedParameters.length; j++) {
                if (eleValue == expectedParameters[j]) {
                    let currentValue = parameters[eleValue];
                    if (currentValue) {
                        if (readableReplacements[eleValue]) {
                            if (readableReplacements[eleValue][currentValue]) {
                                currentValue = readableReplacements[eleValue][currentValue];
                            }
                        }
                        webFlowSubElems[i].innerHTML = currentValue;   
                    }           
                    break;
                }
            }
        }
    }

    // Show error message if required.
    if (isError) {
        let alertMessage = document.getElementById('alert-message');
        if (alertMessage) {
            alertMessage.classList.remove('hidden-alert');
        }
    }

    // Check previously selected value if required.
    if (value && urlParams.get(value)) {
        let inputElems = document.getElementsByClassName('nhsuk-radios__input');
        for (let i = 0; i < inputElems.length; i++) {
            if (inputElems[i].value == urlParams.get(value)) {
                inputElems[i].checked = true;
                break;
            }
        }
    }

    /**
     * Function which redirects on web-flow form submission.
     */
    function onWebFlowFormSubmit() {
        let inputElems = document.getElementsByClassName('nhsuk-radios__input');
        for (let i = 0; i < inputElems.length; i++) {
            if (inputElems[i].checked) {     
                location.replace(nextView + '?' + parameterString + value + '=' + inputElems[i].value);
                return false;
            }
        }
        location.replace(window.location.pathname + '?' + parameterString + 'isError=true');
        return false;
    }

    /**
     * Redirect to previous question view with selections intact.
     */
    function onWebFlowGoBack() {
        location.replace(previousView + '?' + parameterString);
    }

    /**
     * Download the corresponding example file for a report creation request.
     */
    function downloadReport() {
        if (parameters['report']) {
            if (parameters['report'] == 'totals-file') {
                location.replace('/data/example-totals.csv');
            } else {
                window.open('/data/example-report.pdf', '_blank');
            }
        }
    }
    
}

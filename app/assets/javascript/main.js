// ES6 or Vanilla JavaScript

// Set zoom limits.
const minZoom = 1;
const maxZoom = 3;
const zoomStep = 0.3;

// Get Url Parameters.
const urlParams = new URLSearchParams(window.location.search);
const checkNumber = urlParams.get('check');
const totalChecks = urlParams.get('total'); 
const currentPart = urlParams.get('part'); 

////////// Dragable Modal //////////
/*
 * Enable dragging for an element.
 */
function enableDrag(element) {
    // Mouse X and Y variables.
    let mouseX = 0;
    let mouseY = 0;

    // Event listener for on mouse down.
    const mouseDown = function(e) {
        // Get the current mouse x and y and assign them to their respective variables.
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add event listeners for mouseMove and mouseUp for the document.
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }
    // Event listener for on mouse move.
    const mouseMove = function(e) {
        // Get the amount we should offset the position of the pop over.
        const offsetX = e.clientX - mouseX;
        const offsetY = e.clientY - mouseY;

        // Set the style of the pop over in order to move it.
        element.style.top = `${element.offsetTop + offsetY}px`;
        element.style.left = `${element.offsetLeft + offsetX}px`;
        
        // Get the current mouse x and y and assign them to their respective variables.
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    // Event listener for on mouse up.
    const mouseUp = function(e) {
        // Remove the unneeded event listeners from the document.
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
    // Add event listener for mouseDown on the pop over.
    element.addEventListener('mousedown', mouseDown);
}

// Check if the window should enable dragging for a pop over.
if (window['hasmodal']) {
    enableDrag(document.getElementById("draggable-modal"));
}

////////// Version Selector //////////
function directToVersionOne() {
    redirectToV1Check();
}
function directToVersionTwo() {
    redirectToCheck();
}

////////// Check Controls //////////
// Set variables for correction views.
let front = true;
const frontImage = '/images/E000001NE02_side1.jpg';
const backImage = '/images/E000001NE02_side2.jpg';

/**
 * Pretend to load image.
 */
if (document.getElementById('prescription-image') != null) {
    document.getElementById('prescription-image').src = frontImage;
}


/**
 * Swaps what side of a prescription scan is shown.
 */
function swapSides() {
    if (front) {
        document.getElementById('prescription-image').src = backImage;
        document.getElementById('swap-sides').innerHTML = 'Show Front';
    } else {
        document.getElementById('prescription-image').src = frontImage;
        document.getElementById('swap-sides').innerHTML = 'Show Back';
    }

    front = !front;
}

/**
 * Show form notes.
 */
function showFormNotes() {
    document.getElementById('notes-background').removeAttribute('hidden');
    document.getElementById('notes-background').removeAttribute('aria-hidden');
}
/**
 * Hide form notes.
 */
function hideFormNotes() {
    document.getElementById('notes-background').setAttribute('hidden', 'true');
    document.getElementById('notes-background').setAttribute('aria-hidden', true);
}

/**
 * Increases the zoom on the scan.
 */
function zoomScanIn() {
    let scanEle = document.getElementById('prescription-image');
    if (scanEle) {   
        let newScale = (+scanEle.style.scale || 1) + zoomStep;
        if (newScale <= maxZoom) {
            scanEle.style.scale = newScale;
        }        
    }
}

/**
 * Decreases the zoom on the scan.
 */
function zoomScanOut() {
    let scanEle = document.getElementById('prescription-image');
    if (scanEle) {  
        let newScale = (+scanEle.style.scale || 1) - zoomStep;
        if (newScale >= minZoom) {
            scanEle.style.scale = newScale;
        }
    }
}


////////// Counter //////////

/*
 * Looks at the URL arguments and updates the counter.
 */
if (window['check']) {   
    if (checkNumber && totalChecks) {
        document.getElementById('checked-label').innerHTML = checkNumber + ' of ' + totalChecks + ' checked';
        document.getElementById('checkedprogress').value = checkNumber;
        document.getElementById('checkedprogress').max = totalChecks;
        document.getElementById('current-part').innerHTML = currentPart;
    }
}

////////// RNG //////////
/**
 * Randomly decide if the next check should be an EPS or a scanned check.
*/
function isNextEPS() {
    var randomValue = Math.random() < 0.4; // Adjust '0.4' to adjust the probability of displaying a scanned check. 
    return !randomValue;
}

////////// Navigation Links //////////

/**
 * Redirect to corrections view.
 */
function showCorrections() {
    window.location.href = '/apps/50k/check/corrections?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
}

/**
 * Redirect to check view.
 */
function redirectToCheck() {
    if (currentPart === '2' || currentPart == '3') {
        window.location.href = '/apps/50k/check/checkpart2-3?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
    } else {
        window.location.href = '/apps/50k/check?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
    }
}

/**
 * Redirect to corrections view. (For EPS).
 */
function showEPSCorrections() {
    window.location.href = '/apps/50k/check/eps/corrections?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
}

/**
 * Redirect to check view. (For EPS).
 */
function redirectToEPS() {
    if (currentPart === '2' || currentPart === '3') {
        window.location.href = '/apps/50k/check/eps/checkpart2-3?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
    } else {
        window.location.href = '/apps/50k/check/eps?check=' + checkNumber + '&total=' + totalChecks + '&part=' + currentPart;
    }
}

/**
 * Redirect to check view while increasing check value.
 */
function nextCheck() {
    if (checkNumber && totalChecks) {
       processNextCheck();
    }
}

/**
 * Redirect to EPS check view while increasing check value.
 */
function nextEPS() {
    if (checkNumber && totalChecks) {
        processNextCheck();
    }
}

/**
 * Use RNG to randomly select the next check type.
 */
function processNextCheck() {
    var isEPS = isNextEPS();

    if (isEPS) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/eps/checkpart2-3?check=' + (Number(checkNumber)+1) + '&total=' + totalChecks + '&part=' + currentPart;
        } else {
            window.location.href = '/apps/50k/check/eps?check=' + (Number(checkNumber)+1) + '&total=' + totalChecks + '&part=' + currentPart;
        }
    } else {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?check=' + (Number(checkNumber)+1) + '&total=' + totalChecks + '&part=' + currentPart;
        } else {
            window.location.href = '/apps/50k/check?check=' + (Number(checkNumber)+1) + '&total=' + totalChecks + '&part=' + currentPart;
        }
    }
}

/**
 * Redirect to check view while decreasing check value.
 */
function backCheck() {
    if (checkNumber && totalChecks) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?check=' + (Number(checkNumber)-1) + '&total=' + totalChecks + '&part=' + currentPart;
        } else {
            window.location.href = '/apps/50k/check?check=' + (Number(checkNumber)-1) + '&total=' + totalChecks + '&part=' + currentPart;
        }
    }
}
/**
 * Redirect to EPS check view while decreasing check value.
 */
function backEPS() {
    if (checkNumber && totalChecks) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/eps/checkpart2-3?check=' + (Number(checkNumber)-1) + '&total=' + totalChecks + '&part=' + currentPart;
        } else {
            window.location.href = '/apps/50k/check/eps?check=' + (Number(checkNumber)-1) + '&total=' + totalChecks + '&part=' + currentPart;
        }
    }
}

////////// Error Category //////////

// Establish variables for the various elements needed.
const errorCategory = document.getElementById('error-category');
const hiddenFields = document.getElementById('hidden-fields');

// Ensure that the elements needed exist.
if (errorCategory != null && hiddenFields != null) {
    // Add an event listener to listen to the change of the input.
    errorCategory.addEventListener('change', updateHiddenFields);

    // Update the selection of the input at the start to make sure saved states are accounted for.
    updateHiddenFields();
}

// Function to update the hidden fields
function updateHiddenFields() {
    // Check if the correct item is selected.
    if (errorCategory.value == "System: Alphanumeric Code Error Generates Incorrect Direct Hit") {
        // Show the hidden fields to both the browser and to screen readers.
        hiddenFields.removeAttribute('hidden');
        hiddenFields.removeAttribute('aria-hidden');
    } else {
        // Hide the hidden fields to both the browser and to screen readers.
        hiddenFields.setAttribute('hidden', 'true');
        hiddenFields.setAttribute('aria-hidden', 'true');
    }
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

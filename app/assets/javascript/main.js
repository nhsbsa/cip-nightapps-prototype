// ES6 or Vanilla JavaScript

// Set zoom limits.
const minZoom  = 1;
const maxZoom  = 3;
const zoomStep = 0.3;

// Get Url Parameters.
const urlParams    = new URLSearchParams(window.location.search);
const currentPart  = urlParams.get('part'); 
let checkedToday   = urlParams.get('checkedToday');

////////// Check Controls //////////
// Set variables for correction views.
let front        = true;
const frontImage = '/images/E000001NE02_side1.jpg';
const backImage  = '/images/E000001NE02_side2.jpg';

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
        document.getElementById('swap-sides').innerHTML   = 'Show Front';
    } else {
        document.getElementById('prescription-image').src = frontImage;
        document.getElementById('swap-sides').innerHTML   = 'Show Back';
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
 * Show confirm.
 */
function showConfirm() {
    document.getElementById('confirm-background').removeAttribute('hidden');
    document.getElementById('confirm-background').removeAttribute('aria-hidden');
}

/**
 * Hide form notes.
 */
function hideFormNotes() {
    document.getElementById('notes-background').setAttribute('hidden', 'true');
    document.getElementById('notes-background').setAttribute('aria-hidden', true);
}

/**
 * Hide confirm.
 */
function hideConfirm() {
    document.getElementById('confirm-background').setAttribute('hidden', 'true');
    document.getElementById('confirm-background').setAttribute('aria-hidden', true);
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
if (currentPart && document.getElementById('current-part')) {
    document.getElementById('current-part').innerHTML = currentPart;
}
if (checkedToday && document.getElementById('checked-today')) {
    document.getElementById('checked-today').innerHTML = checkedToday + " Checked Today";
}


////////// RNG //////////
/**
 * Randomly decide if the next check should be an EPS or a scanned check.
*/
function isNextEPS() {
    var randomValue = Math.random() < 0.9; // Adjust '0.9' to adjust the probability of displaying a scanned check. 
    return randomValue;
}


////////// Navigation Links //////////
/**
 * Redirect to corrections view.
 */
function showCorrections() {
    window.location.href = '/apps/50k/check/corrections?part=' + currentPart + "&checkedToday=" + checkedToday;
}

/**
 * Redirect to check view.
 */
function redirectToCheck() {
    if (currentPart === '2' || currentPart == '3') {
        window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart+ "&checkedToday=" + checkedToday;
    } else {
        window.location.href = '/apps/50k/check?part=' + currentPart + "&checkedToday=" + checkedToday;
    }
}

/**
 * Redirect to corrections view. (For EPS).
 */
function showEPSCorrections() {
    window.location.href = '/apps/50k/check/eps/corrections?part=' + currentPart + "&checkedToday=" + checkedToday;
}

/**
 * Redirect to check view. (For EPS).
 */
function redirectToEPS() {
    if (currentPart === '2' || currentPart === '3') {
        window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + "&checkedToday=" + checkedToday;
    } else {
        window.location.href = '/apps/50k/check/eps?part=' + currentPart + "&checkedToday=" + checkedToday;
    }
}

/**
 * Use RNG to randomly select the next check type.
 */
function processNextCheck() {
    var isEPS = isNextEPS();

    if (checkedToday) {
        checkedToday++;
    }

    if (isEPS) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + "&checkedToday=" + checkedToday;
        } else {
            window.location.href = '/apps/50k/check/eps?part=' + currentPart + "&checkedToday=" + checkedToday;
        }
    } else {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart + "&checkedToday=" + checkedToday;
        } else {
            window.location.href = '/apps/50k/check?part=' + currentPart + "&checkedToday=" + checkedToday;
        }
    }
}

/**
 * Redirect to check view while decreasing check value.
 */
function backCheck() {
    if (currentPart && checkedToday) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart + "&checkedToday=" + checkedToday;
        } else {
            window.location.href = '/apps/50k/check?part=' + currentPart + "&checkedToday=" + checkedToday;
        }
    }
}

/**
 * Redirect to EPS check view while decreasing check value.
 */
function backEPS() {
    if (currentPart && checkedToday) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + "&checkedToday=" + checkedToday;
        } else {
            window.location.href = '/apps/50k/check/eps?part=' + currentPart + "&checkedToday=" + checkedToday;
        }
    }
}

/**
 * Redirect to confirmation screen.
 */
function redirectToConfirmation() {
    window.location.href = '/apps/50k/check/confirmation?part=' + currentPart + "&checkedToday=" + checkedToday;
}


////////// Error Category //////////
// Establish variables for the various elements needed.
const errorCategory = document.getElementById('error-category');
const hiddenFields  = document.getElementById('hidden-fields');

// Ensure that the elements needed exist.
if (errorCategory !== null && hiddenFields !== null) {
    // Add an event listener to listen to the change of the input.
    errorCategory.addEventListener('change', updateHiddenFields);

    // Update the selection of the input at the start to make sure saved states are accounted for.
    updateHiddenFields();
}

// Function to update the hidden fields
function updateHiddenFields() {
    // Check if the correct item is selected.
    if (errorCategory.value === "System: Alphanumeric Code Error Generates Incorrect Direct Hit") {
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
    let parameters           = window['web-flow'];
    let root                 = parameters['root'] || '/';
    let value                = parameters['value'] || 'value';
    let expectedParameters   = parameters['expectedParameters'] || [];
    let readableReplacements = parameters['readableReplacements'] || [];
    let nextView             = parameters['nextView'] || '/';
    let previousView         = parameters['previousView'] || '/';
    let parameterString      = '';

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
                if (eleValue === expectedParameters[j]) {
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
            if (parameters['report'] === 'totals-file') {
                location.replace('/data/example-totals.csv');
            } else {
                window.open('/data/example-report.pdf', '_blank');
            }
        }
    } 
}

////////// Dashboard //////////

if (window['50k-dashboard']) {

    // Apply filter functionality.
    var filterForm = document.getElementById('filter-stats');
    var userSelect = document.getElementById('users');
    if (filterForm && userSelect) {

      // Set filter value.
      var urlParameters = new URLSearchParams(window.location.search);
      var userParam = urlParameters.get('users');
      if (userParam) {
        userSelect.value = userParam;
      } else {
        userSelect.value = 'all';
      }

      // Add redirect to filter application.
      filterForm.addEventListener('submit', function(event) {
        var user = userSelect.value;
        if (userParam){
          if (userParam == user) {
            return false;
          }
        }
        window.location.replace(location.protocol + '//' + location.host + location.pathname + '#individual-stats');
      });

      // Show the relevant content.
      if (userParam && userParam != "all") {
        var statsToShow = document.getElementById(userParam + "-stats");
        if (statsToShow) {
          statsToShow.classList.remove("hide-stats");
        }
      } else {
        var statsToShow = document.getElementById("all-stats");
        if (statsToShow) {
          statsToShow.classList.remove("hide-stats");
        }
      }

    }

}
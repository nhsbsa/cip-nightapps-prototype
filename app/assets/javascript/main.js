// ES6 or Vanilla JavaScript

// See if a web-flow object has been established.
if (window['web-flow']) {

    // Establish variables for substituting into global functions.
    let parameters = window['web-flow'];
    let root = parameters['root'] || '/';
    let value = parameters['value'] || 'value';
    let expectedParameters = parameters['expectedParameters'] || [];
    let readableReplacements = parameters['readableReplacements'] || [];
    let nextView = parameters['nextView'] || '/';
    let parameterString = '';

    // Get URL query.
    const urlParams = new URLSearchParams(window.location.search);
    const isError = urlParams.get('isError');

    // Get the expected parameters - redirect to start if any are missing.
    for (let i = 0; i < expectedParameters.length; i++) {
        let expectedParameter = expectedParameters[i];
        if (expectedParameter === null || expectedParameter === '') {
            location.replace(root);
        }
        parameters[expectedParameter] = urlParams.get(expectedParameter);
        parameterString += expectedParameter + '=' + parameters[expectedParameter] + '&';
    }

    // TODO Substitute in human-readable parameters.

    // Show error message if required.
    if (isError) {
        let alertMessage = document.getElementById('alert-message');
        if (alertMessage) {
            alertMessage.classList.remove('hidden-alert');
        }
    }

    /**
     * Function which redirects on web-flow form submission.
     */
    function onWebFlowFormSubmit() {
        let inputElems = document.getElementsByClassName('nhsuk-radios__input');
        for (let i = inputElems.length - 1; i >= 0; --i) {
            if (inputElems[i].checked) {     
                location.replace(nextView + '?' + parameterString + '&' + value + '=' + inputElems[i].value);
                return false;
            }
        }
        location.replace(window.location.pathname + '?' + parameterString + 'isError=true');
        return false;
    }

    // TODO A go back function which can reselect previous values.
    
}



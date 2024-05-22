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
    document.getElementById('checked-today').innerHTML = checkedToday + ' Checked Today';
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
    window.location.href = '/apps/50k/check/corrections?part=' + currentPart + '&checkedToday=' + checkedToday;
}

/**
 * Redirect to check view.
 */
function redirectToCheck() {
    if (currentPart === '2' || currentPart == '3') {
        window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart+ '&checkedToday=' + checkedToday;
    } else {
        window.location.href = '/apps/50k/check?part=' + currentPart + '&checkedToday=' + checkedToday;
    }
}

/**
 * Redirect to corrections view. (For EPS).
 */
function showEPSCorrections() {
    window.location.href = '/apps/50k/check/eps/corrections?part=' + currentPart + '&checkedToday=' + checkedToday;
}

/**
 * Redirect to check view. (For EPS).
 */
function redirectToEPS() {
    if (currentPart === '2' || currentPart === '3') {
        window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + '&checkedToday=' + checkedToday;
    } else {
        window.location.href = '/apps/50k/check/eps?part=' + currentPart + '&checkedToday=' + checkedToday;
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
            window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + '&checkedToday=' + checkedToday;
        } else {
            window.location.href = '/apps/50k/check/eps?part=' + currentPart + '&checkedToday=' + checkedToday;
        }
    } else {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart + '&checkedToday=' + checkedToday;
        } else {
            window.location.href = '/apps/50k/check?part=' + currentPart + '&checkedToday=' + checkedToday;
        }
    }
}

/**
 * Redirect to check view while decreasing check value.
 */
function backCheck() {
    if (currentPart && checkedToday) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/checkpart2-3?part=' + currentPart + '&checkedToday=' + checkedToday;
        } else {
            window.location.href = '/apps/50k/check?part=' + currentPart + '&checkedToday=' + checkedToday;
        }
    }
}

/**
 * Redirect to EPS check view while decreasing check value.
 */
function backEPS() {
    if (currentPart && checkedToday) {
        if (currentPart === '2' || currentPart === '3') {
            window.location.href = '/apps/50k/check/eps/checkpart2-3?part=' + currentPart + '&checkedToday=' + checkedToday;
        } else {
            window.location.href = '/apps/50k/check/eps?part=' + currentPart + '&checkedToday=' + checkedToday;
        }
    }
}

/**
 * Redirect to confirmation screen.
 */
function redirectToConfirmation() {
    window.location.href = '/apps/50k/check/confirmation?part=' + currentPart + '&checkedToday=' + checkedToday;
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
    if (errorCategory.value === 'System: Alphanumeric Code Error Generates Incorrect Direct Hit') {
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
            var files = {
                'totals': 'yyyy_10k.zip',
                'direct-hits': 'yyyymmDirectHits.xlsx',
                'errors': 'yyymmErrors.xlsx',
                'information-errors': 'yyymmInfoErrors.xlsx',
                'operator-errors': 'yyyymmTagOperatorErrors.xlsx',
                'system-errors': 'yyyymmTagSystemErrors.xlsx',
                'parts': 'yyyymmPart.zip'
            }
            if (files[parameters['report']]) {
                location.replace('/data/' + files[parameters['report']]);
            }
        }
    } 
}

////////// Dashboard //////////
if (window['50k-dashboard']) {

    // Apply filter functionality.
    var userForm = document.getElementById('filter-users');
    var userSelect = document.getElementById('users');
    var periodForm = document.getElementById('filter-periods');
    var periodSelect = document.getElementById('period');
    if (userForm && userSelect && periodForm && periodSelect) {

        // Get parameters.
        var urlParameters = new URLSearchParams(window.location.search);
        var periodParam = urlParameters.get('period');
        var usersParam = urlParameters.get('users');
        if (!usersParam) {
            usersParam = 'all';
        }
        if (!periodParam) {
            periodParam = '202212';
        }

        // Add user options based on year.
        var addUser = function (value, display) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = display;
            userSelect.appendChild(opt);
        }
        if (periodParam == '202212') {
            addUser('adam-azure', 'Adam Azure');
            addUser('bryony-black', 'Bryony Black');
            addUser('charlie-cerulean', 'Charlie Cerulean');
            addUser('david-denim', 'David Denim');
        } else if (periodParam == '202211') {
            addUser('adam-azure', 'Adam Azure');
            addUser('bryony-black', 'Bryony Black');
            if (usersParam == 'charlie-cerulean' || usersParam == 'david-denim') {
                usersParam = 'all';
            }
       }

        // Set filter values.
        periodSelect.value = periodParam;
        userSelect.value = usersParam;

        // Redirect function.
        var redirect = function(event, individualStats) {
            event.preventDefault();
            var paramsToSend = '?period=' + periodParam + '&users=' + usersParam;
            if (individualStats) {
                paramsToSend += '#individual-stats'
            }
            window.location.replace(location.protocol + '//' + location.host + location.pathname + paramsToSend);
       };

        // Add redirect to period filter.
        periodForm.addEventListener('submit', function(event) {
            periodParam = periodSelect.value;
            redirect(event, false);
        });

        // Add redirect to user filter application.
        userForm.addEventListener('submit', function(event) {
            usersParam = userSelect.value;
            redirect(event, true);
        });

        // Show the relevant content.
        var overallStatsToShow = document.getElementsByClassName(periodParam + '-overall');
        for (var i = 0; i < overallStatsToShow.length; i++) {
          overallStatsToShow[i].classList.remove('hide-stats');
        }
        var statsToShow = document.getElementsByClassName(usersParam + '-stats ' + periodParam + '-period');
        for (var i = 0; i < statsToShow.length; i++) {
          statsToShow[i].classList.remove('hide-stats');
        }

    }

}

////////// All Staff Amender Home //////////
if (window['all-staff-amender-home']) {

    // Constant
    const pageSize = 10;
    const maxPages = 3;
    const urlParams = new URLSearchParams(window.location.search);

    // Establish staff members.
    let page = 1;
    let pageParam = urlParams.get('page');
    if (pageParam != null) {
        page = Number(pageParam);
    }
    let staff = [];
    for (let i = ((page - 1) * pageSize) + 1; i <= page * pageSize; i++) {
        staff.push(
            {
                id: '' + i,
                cipher: 'desta' + i,
                staffName: 'Demo Staff Member ' + i,
                jobTitle: 'Demo role',
                managerName: 'Demo Manager',
                managerCipher: 'deman',
                email: 'demo.staff' + i + '@nhsbsa.nhs.uk'
            }
        );
    }

    // Set up pagination buttons for staff details.
    let prevButton = document.getElementById('staff-prev');
    let nextButton = document.getElementById('staff-next');
    if (page === 1) {
        prevButton.classList.add('bulk-hidden');
    } else {
        let prevPage = page - 1;
        prevButton.href = '?page=' + prevPage;
        let prevButtonContent = document.getElementById('staff-prev-content');
        prevButtonContent.innerHTML = prevPage + ' of ' + maxPages;

    }
    if (page === maxPages) {
        nextButton.classList.add('bulk-hidden');
    } else {
        let nextPage = page + 1;
        nextButton.href = '?page=' + nextPage;
        let nextButtonContent = document.getElementById('staff-next-content');
        nextButtonContent.innerHTML = nextPage + ' of ' + maxPages;
    }

    // Filter down staff based on search query.
    let filterParam = urlParams.get('name');
    const filterType = urlParams.get('filterType');
    if (filterParam != null && filterParam != '' && filterType != null && filterType != '') {
        filterParam = decodeURIComponent(filterParam);
        let newStaffMember = [];
        for (i = 0; i < staff.length; i++) {
            let staffMember = staff[i];
            let relevantName = staffMember[filterType];
            if (relevantName.toLowerCase().includes(filterParam.toLowerCase())) {
                newStaffMember.push(staffMember);
            }
        }
        staff = newStaffMember;
        document.getElementById('name').value = filterParam;
        document.getElementById('filterType').value = filterType;
    }

    // Populate table with staff.
    let staffTable = document.getElementById('staff-table');
    for (let staffMember of staff) {
        const row = document.createElement('tr');
        row.className = 'nhsuk-table__row';
        let rowContents = `
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <div class="nhsuk-checkboxes__item">
                                    <input class='staff-member staff-select-box nhsuk-checkboxes__input' type='checkbox' id='check-{{id}}' name='check-{{id}}' onchange='updateStaffCount()'></input>
                                    <label class='nhsuk-label nhsuk-checkboxes__label' for='check-{{id}}'></label>
                                </div>
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading'>Name </span>{{staffName}}
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading'>Cipher </span>{{cipher}}
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading'>Email </span>{{email}}
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading'>Job Title </span>{{jobTitle}}
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading'>Manager </span>{{manager}}
                            </td>
                            <td role='cell' class='nhsuk-table__cell center-table-row'>
                                <span class='nhsuk-table-responsive__heading select-tag'>Action </span>
                                <p class='nhsuk-u-margin-bottom-0'><a class='nhsuk-link nhsuk-link--no-visited-state'
                                                                      href='all-staff-amender/details?staffId={{id}}'>View Details</a></p>
                            </td>
        `;
        rowContents = rowContents.replaceAll('{{id}}', staffMember.id);
        rowContents = rowContents.replaceAll('{{cipher}}', staffMember.cipher);
        rowContents = rowContents.replaceAll('{{jobTitle}}', staffMember.jobTitle);
        rowContents = rowContents.replaceAll('{{staffName}}', staffMember.staffName);
        rowContents = rowContents.replaceAll('{{email}}', staffMember.email);
        rowContents = rowContents.replaceAll('{{manager}}', staffMember.managerName);
        row.innerHTML = rowContents;
        staffTable.appendChild(row);

        function toggleStaffFilter() {
            let filterEle = document.getElementById('staff-filter');
            let toggleFilterEle = document.getElementById('toggle-staff-filter');
            if (filterEle.classList.contains('bulk-hidden')) {
                filterEle.classList.remove('bulk-hidden')
                toggleFilterEle.innerHTML = 'Hide Staff Filter';
            } else {
                filterEle.classList.add('bulk-hidden');
                toggleFilterEle.innerHTML = 'Show Staff Filter';
            }
        }

    }

    // Function for updating staff coumt/
    function updateStaffCount() {

        // Count all the selected staff checkboxes.
        let count = 0;
        let selectBoxes = document.getElementsByClassName('staff-select-box');
        for (let selectBox of selectBoxes) {
            if (selectBox.checked) {
                count++;
            }
        }

        // Update the staff count details.
        let staffSelectedEle = document.getElementById('staff-selected');
        staffSelectedEle.innerHTML = count;

    }

    // Function for checking or unchecking all staff boxes.
    let allSelected = false;
    function staffSelectToggle() {
        let selectStaffEle = document.getElementById('staff-select-toggle');
        let checkboxes = document.getElementsByClassName('staff-member');
        allSelected = !allSelected;
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = allSelected;
        }
        selectStaffEle.innerHTML = allSelected ? 'Select<br>None' : 'Select<br>All';
        updateStaffCount();
    }

}

////////// All Staff Amender Edit Page //////////
if (window['all-staff-amender-edit']) {

    // Get elements to edit.
    let editStaffButton = document.getElementById('edit-staff-button');
    let addBoxes = document.getElementsByClassName('add-box');
    let saveBoxes = document.getElementsByClassName('save-box');

    // Check if add param is present.
    const urlParams = new URLSearchParams(window.location.search);
    let addParam = urlParams.get('add');
    if (addParam != null) {

        // Edit to Add
        for (let addBox of addBoxes) {
            addBox.innerHTML = 'Add New Staff Member';
        }

        // Change Save to Continue.
        for (let saveBox of saveBoxes) {
            saveBox.innerHTML = window['add-action'];
        }

        // Change the URL of the button to be the next page (with ?add=true parameter).
        editStaffButton.href = window['add-next-page'];

    }

    // Change all linked pages to redirect to confirm page when bulk param is set.
    let bulkParam = urlParams.get('bulk');
    if (bulkParam != null) {

        // Change instances of 'Selected Staff Member' to 'Selected Staff Members'.
        for (let addBox of addBoxes) {
            addBox.innerHTML = 'Edit Selected Staff Members';
        }

        // Change the URL of the button to be the bulk confirm page (with the appropriate action parameter).
        editStaffButton.href = '/apps/all-staff-amender/bulk-action/confirmation?action=' + window['bulk-action'];

        // Hide elements not intended for bulk edits.
        let elementsToHide = document.getElementsByClassName('non-bulk');
        for (let elementToHide of elementsToHide) {
            elementToHide.classList.add('bulk-hidden');
        }

    }

    /**
     * Set the standard working pattern values.
     */
    function setStandardWorkingPattern() {
        let weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        let weekEndDays = ['saturday', 'sunday'];
        for (let weekDay of weekDays) {
            let weekDayEle = document.getElementById(weekDay);
            weekDayEle.value = 450;
        }
        for (let weekEndDay of weekEndDays) {
            let weekEndDayEle = document.getElementById(weekEndDay);
            weekEndDayEle.value = 0;
        }
        updatingWorkingHours();
    }

    let workingHoursEle = document.getElementById('working-hours');
    /**
     * Add together all the working minutes in the working patterns form,
     * calculate total working hours and display
     */
    function updatingWorkingHours() {
        let workingMinutesEles = document.getElementsByClassName('working-minutes');
        if (workingMinutesEles.length > 0) {
            let workingMinutes = 0;
            for (let workingMinutesEle of workingMinutesEles) {
                workingMinutes += Number(workingMinutesEle.value);
            }
            let workingHours = workingMinutes / 60;
            workingHoursEle.innerHTML = workingHours.toFixed(2);
        }
    }
    updatingWorkingHours();

    // Establish stream category to show.
    let streamCategory = 'production';
    let streamCategoryDisplay;

    // TODO Function to handle assigning streams (include "None assigned.").

    /**
     * Move stream(s) between fields.
     *
     * @param leftToRight True if moving streams from left to right.
     */
    function transferStream(leftToRight) {
        let source = leftToRight ? 'available' : 'current';
        let target = leftToRight ? 'current' : 'available';

        let sourceEle = document.getElementById(source + '-streams');
        let targetEle = document.getElementById(target + '-streams');

        // Add to target input.
        let toRemove = [];
        for (let option of sourceEle.options) {
            if (option.selected) {
                let newOpt = document.createElement('option');
                newOpt.label = option.label;

                // Add to category if needed (generating the category on the fly as required).
                if (leftToRight) {
                    let targetCatEle = document.getElementById('current-stream-' + streamCategory);
                    if (targetCatEle == null) {
                        targetCatEle = document.createElement('optgroup');
                        targetCatEle.id = 'current-stream-' + streamCategory;
                        targetCatEle.label = streamCategoryDisplay;
                        targetEle.appendChild(targetCatEle);
                    }
                    targetCatEle.appendChild(newOpt);
                } else {
                    if (option.parentElement.id === 'current-stream-' + streamCategory) {
                        targetEle.appendChild(newOpt);
                    }
                }
                toRemove.push(option);
            }
        }

        // Remove from source input.
        for (let option of toRemove) {
            option.parentElement.removeChild(option);
        }

        // Tidy away empty categories.
        if (!leftToRight) {
            let catsToRemove = [];
            for (let catEle of sourceEle.children) {
                if (catEle.children.length === 0) {
                    catsToRemove.push(catEle);
                }
            }
            for (let catToRemove of catsToRemove) {
                sourceEle.removeChild(catToRemove);
            }
        }

        updateStreamCount();
        return false;
    }

    /**
     * Update the stream count.
     */
    function updateStreamCount() {
        let currentStreamsEle = document.getElementById('current-streams');
        if (currentStreamsEle !== null) {
            let optionsCount = currentStreamsEle.options.length;
            document.getElementById('stream-count').innerHTML = optionsCount;
        }
    }
    updateStreamCount();

}

////////// All Staff Amender Edit Page //////////
if (window['all-staff-amender-bulk-action-form']) {

    /**
     * Redirect to the appropriate bulk action page.
     */
    function bulkActionRedirect() {

        // Get selected action.
        let action = '';
        let radioButtons = document.getElementsByTagName('input');
        for (let radioButton of radioButtons){
            if (radioButton.checked){
                action = radioButton.value;
                break;
            }
        }

        // Redirect to appropriate page with the correct query.
        if (action === 'download') {
            window.location.href = '/apps/all-staff-amender/bulk-action/download';
        } else if (action === 'edit-details') {
            window.location.href = '/apps/all-staff-amender/edit/details?bulk=true';
        } else if (action === 'edit-management') {
            window.location.href = '/apps/all-staff-amender/edit/management?bulk=true';
        } else if (action === 'edit-role') {
            window.location.href = '/apps/all-staff-amender/edit/role?bulk=true';
        } else if (action === 'edit-status') {
            window.location.href = '/apps/all-staff-amender/edit/status?bulk=true';
        } else if (action === 'edit-streams') {
            window.location.href = '/apps/all-staff-amender/edit/current-streams?bulk=true';
        } else if (action === 'disable') {
            window.location.href = '/apps/all-staff-amender/disable?bulk=true';
        }

    }

}

////////// All Staff Amender Edit Confirm Page //////////
if (window['all-staff-amender-edit-confirm']) {
    const urlParams = new URLSearchParams(window.location.search);
    let actionParam = urlParams.get('action');
    if (actionParam != null) {
        let changeDiv = document.getElementById('changes-' + actionParam);
        if (changeDiv) {
            changeDiv.classList.remove('bulk-hidden');
        }
    }
}

////////// All Staff Amender Bulk Action Confirm Page //////////
if (window['all-staff-amender-bulk-confirm']) {
    const urlParams = new URLSearchParams(window.location.search);
    let actionParam = urlParams.get('action');
    if (actionParam != null) {
        let changeDiv = document.getElementById('changes-' + actionParam);
        if (changeDiv) {
            changeDiv.classList.remove('bulk-hidden');
        }
    }
}
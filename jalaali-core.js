
function CopyConvertedDate(inpu) {
    let inputDate = convertPersianNumber(inpu);
    let _4char = inputDate.substring(0, 4);
    let year = parseInt(_4char);
    if (isNaN(year))
        return;
    let date;
    if (year < 1500)//is jalali
        date = jToG(inputDate);
    else
        date = gToJ(inputDate);
    copyToClipboard(date);
    showToast(date);
}


function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}
// chrome.contextMenus.onShown.addListener((info, tab) => {
//     if (info.selectionText) {
//         chrome.contextMenus.update("textLength", {
//             title: `View Length of "${info.selectionText}"`
//         });
//     }
// });

function jToG(jDate) {
    const jDateArr = jDate.split(/[^0-9]/);
    const gDate = jalaali.jalaaliToDateObject(parseInt(jDateArr[0]), parseInt(jDateArr[1]), parseInt(jDateArr[2]));
    return formatDate(gDate);
}
function gToJ(gDate) {
    const date = new Date(gDate);
    return new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(date);
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}
function showToast(msg) {

    const toast = document.createElement('div');
    toast.classList = ['jallali-toast'];
    toast.classList.add(isPageDark() ? 'jallali-toast-dark' : 'jallali-toast-light');
    toast.innerText = msg;

    document.body.appendChild(toast);

    const selection = window.getSelection().getRangeAt(0);
    const rect = selection.getBoundingClientRect();

    toast.style.position = 'absolute';
    toast.style.top = `${rect.top + window.scrollY - 30}px`;
    toast.style.left = `${rect.left + window.scrollX}px`;

    setTimeout(() => {
        toast.style.opacity = 1;
    }, 100);

    setTimeout(() => {
        toast.style.opacity = 0; // Fade out
        setTimeout(() => {
            toast.remove(); // Remove from DOM
        }, 500);
    }, 3000);
}

function convertPersianNumber(arabicNumber) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const arabicDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let persianNumber = arabicNumber.split('').map(char => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? arabicDigits[index] : char; // return the character itself if not an Arabic digit
    }).join('');

    return persianNumber;
}

function isPageDark() {
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
    const rgb = backgroundColor.match(/\d+/g); // Get RGB values
    if (!rgb) return false; // Default to false if no color found

    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    // Calculate brightness using a simple formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128; // A threshold can be adjusted according to needs
}
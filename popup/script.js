

function showToast(msg) {
    const toast = document.createElement('div');
    toast.classList = ['jallali-toast'];
    toast.classList.add(isPageDark() ? 'jallali-toast-dark' : 'jallali-toast-light');
    toast.innerText = msg;

    document.body.appendChild(toast);

    const selection = window.getSelection().getRangeAt(0);
    const rect = selection.getBoundingClientRect();

    toast.style.position = 'absolute';
    toast.style.top = `${rect.top + window.scrollY + 15}px`;
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



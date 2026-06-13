// toast.ts
function createToast(message, type, options = {}) {
    var _a;
    const duration = (_a = options.duration) !== null && _a !== void 0 ? _a : 5000;
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });
    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (container && container.childElementCount === 0) {
                container.remove();
            }
        });
    }, duration);
}
export const toast = {
    success: (message, options) => createToast(message, 'success', options),
    error: (message, options) => createToast(message, 'error', options),
    info: (message, options) => createToast(message, 'info', options)
};
//# sourceMappingURL=toast.js.map
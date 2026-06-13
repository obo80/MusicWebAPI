// toast.ts

// Definiujemy dostępne typy powiadomień
type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
    duration?: number;
}


function createToast(message: string, type: ToastType, options: ToastOptions = {}): void {
    const duration = options.duration ?? 5000;

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
    success: (message: string, options?: ToastOptions) => createToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => createToast(message, 'error', options),
    info: (message: string, options?: ToastOptions) => createToast(message, 'info', options)
};

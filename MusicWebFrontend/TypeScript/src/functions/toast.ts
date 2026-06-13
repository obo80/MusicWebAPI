// toast.ts

// Definiujemy dostępne typy powiadomień
type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
    duration?: number;
}

// 1. Główna, uniwersalna funkcja bazowa (wewnętrzna)
function createToast(message: string, type: ToastType, options: ToastOptions = {}): void {
    const duration = options.duration ?? 5000;

    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    // Dynamicznie dodajemy klasy, np. 'toast toast-success' lub 'toast toast-error'
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

// 2. Eksportujemy wygodne funkcje pomocnicze dla programisty
export const toast = {
    success: (message: string, options?: ToastOptions) => createToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => createToast(message, 'error', options),
    info: (message: string, options?: ToastOptions) => createToast(message, 'info', options)
};

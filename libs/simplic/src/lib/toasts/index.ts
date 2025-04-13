import cn from 'classnames';

const TOAST_DURATION = 3000;

const createToastContainer = () => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(container);
  }
  return container;
};

const showToast = ({ message = '', type = 'success' }) => {
  const container = createToastContainer();

  const toast = document.createElement('div');
  toast.role = 'status';
  toast.tabIndex = 0;

  toast.className = cn(
    'px-4 py-3 rounded-lg shadow-md text-white animate-in fade-in slide-in-from-right duration-300',
    {
      'bg-green-600': type === 'success',
      'bg-red-600': type === 'critical',
    }
  );

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('animate-in', 'fade-in', 'slide-in-from-right');
    toast.classList.add('animate-out', 'fade-out', 'slide-out-to-right');

    toast.addEventListener('animationend', () => {
      toast.remove();
      if (!container.hasChildNodes()) {
        container.remove();
      }
    });
  }, TOAST_DURATION);
};

export const toast = {
  success: (msg: string) => showToast({ message: msg, type: 'success' }),
  critical: (msg: string) => showToast({ message: msg, type: 'critical' }),
};

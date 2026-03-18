/**
 * @param {string} message
 * @param {string} type
 */
function showToast(message, type = TOAST_TYPE.SUCCESS) {
  const container = getOrCreateToastContainer();
  const toast = buildToastElement(message, type);

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function getOrCreateToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3 transition-all duration-300';
    document.body.appendChild(container);
  }
  return container;
}

function buildToastElement(message, type) {
  const toast = document.createElement('div');

  const iconSvg = type === TOAST_TYPE.SUCCESS
      ? `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`
      : `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;

  toast.className = 'flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-xl min-w-[300px] border border-gray-100 transform transition-all duration-300 translate-x-0 opacity-100';

  toast.innerHTML = `
        <div class="flex items-center justify-center w-6 h-6 bg-black rounded-full flex-shrink-0">
            ${iconSvg}
        </div>
        <span class="text-gray-800 font-medium text-sm">${message}</span>
    `;

  return toast;
}
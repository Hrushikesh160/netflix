import { useEffect, useState } from 'react';

let toastListener = null;

export const notify = (message, tone = 'success') => {
  window.dispatchEvent(new CustomEvent('streamflix-toast', { detail: { message, tone } }));
};

export function ToastContainer() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      const { message, tone } = event.detail;
      setToast({ message, tone });
      window.setTimeout(() => setToast(null), 2200);
    };

    toastListener = handler;
    window.addEventListener('streamflix-toast', handler);
    return () => window.removeEventListener('streamflix-toast', handler);
  }, []);

  if (!toast) return null;

  return <div className={`toast ${toast.tone}`}>{toast.message}</div>;
}

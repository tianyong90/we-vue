export type ToastOptions = {
  type?: string;
  mask?: boolean;
  message?: string;
  duration?: number;
}

export interface Toast {
  (message: ToastOptions | string, options?: ToastOptions): void;
  loading(options?: ToastOptions): void;
  success(options?: ToastOptions): void;
  fail(options?: ToastOptions): void;
  text(options?: ToastOptions): void;
  close(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

export const Toast: Toast;

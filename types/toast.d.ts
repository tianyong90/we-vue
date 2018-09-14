export type ToastOptions = {
  type?: string;
  mask?: boolean;
  message?: string;
  duration?: number;
}

export interface Toast {
  (message: ToastOptions | string, options?: ToastOptions): void;
  loading(options?: ToastOptions | string): void;
  success(options?: ToastOptions | string): void;
  fail(options?: ToastOptions | string): void;
  text(options?: ToastOptions | string): void;
  close(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

export const Toast: Toast;

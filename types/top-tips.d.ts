export type TopTipsOptions = {
  message?: string;
  duration?: number;
}

export interface TopTips {
  (message: TopTipsOptions | string): void;

  close(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $topTips: TopTips
  }
}

export const TopTips: TopTips;

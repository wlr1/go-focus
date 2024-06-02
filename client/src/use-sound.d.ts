declare module "use-sound" {
  export default function useSound(
    url: string | string[],
    options?: {
      volume?: number;
      playbackRate?: number;
      interrupt?: boolean;
      soundEnabled?: boolean;
      loop?: boolean;
      html5?: boolean;
      onend?: () => void;
    }
  ): [
    () => void,
    { stop: () => void; pause: () => void; duration: number | null }
  ];
}

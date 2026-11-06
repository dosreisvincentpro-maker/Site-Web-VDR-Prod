/**
 * Utility functions for cross-browser Fullscreen API handling
 * Works safely across Desktop (Chrome, Safari, Firefox, Edge) and Mobile (Android, iOS)
 */

export const requestFullScreenSafe = (element?: HTMLElement | null): void => {
  try {
    const target = element || document.documentElement;
    const anyTarget = target as any;

    if (target.requestFullscreen) {
      target.requestFullscreen().catch(() => {});
    } else if (anyTarget.webkitRequestFullscreen) {
      anyTarget.webkitRequestFullscreen();
    } else if (anyTarget.mozRequestFullScreen) {
      anyTarget.mozRequestFullScreen();
    } else if (anyTarget.msRequestFullscreen) {
      anyTarget.msRequestFullscreen();
    }
  } catch {
    // Graceful fallback for mobile browsers (e.g. iOS Safari) without Element.requestFullscreen support
  }
};

export const exitFullScreenSafe = (): void => {
  try {
    const doc = document as any;
    if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  } catch {
    // Ignore
  }
};

export const isFullScreenActive = (): boolean => {
  try {
    const doc = document as any;
    return !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
  } catch {
    return false;
  }
};

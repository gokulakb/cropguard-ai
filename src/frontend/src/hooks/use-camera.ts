import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types (mirror @caffeineai/camera interface) ──────────────────────────────

export interface CameraConfig {
  facingMode?: "user" | "environment";
  width?: number;
  height?: number;
  quality?: number;
  format?: "image/jpeg" | "image/png" | "image/webp";
}

export interface CameraError {
  type: "permission" | "not-supported" | "not-found" | "unknown" | "timeout";
  message: string;
}

export interface UseCameraReturn {
  isActive: boolean;
  isSupported: boolean | null;
  error: CameraError | null;
  isLoading: boolean;
  currentFacingMode: "user" | "environment";
  startCamera: () => Promise<boolean>;
  stopCamera: () => Promise<void>;
  capturePhoto: () => Promise<File | null>;
  switchCamera: (newFacingMode?: "user" | "environment") => Promise<boolean>;
  retry: () => Promise<boolean>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCamera(config: CameraConfig = {}): UseCameraReturn {
  const {
    facingMode: initialFacingMode = "environment",
    quality = 0.92,
    format = "image/jpeg",
  } = config;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const [currentFacingMode, setCurrentFacingMode] = useState<
    "user" | "environment"
  >(initialFacingMode);

  // Detect support on mount
  useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function",
    );
    return () => {
      // Cleanup stream on unmount
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
    };
  }, []);

  const stopCamera = useCallback(async (): Promise<void> => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const startCamera = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    setIsLoading(true);
    setError(null);
    try {
      // Stop any existing stream first
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      return true;
    } catch (err) {
      const e = err as { name?: string };
      let cameraError: CameraError;
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        cameraError = {
          type: "permission",
          message:
            "Camera access denied. Please allow camera permission in your browser settings.",
        };
      } else if (
        e.name === "NotFoundError" ||
        e.name === "DevicesNotFoundError"
      ) {
        cameraError = {
          type: "not-found",
          message: "No camera found on this device.",
        };
      } else if (e.name === "NotSupportedError") {
        cameraError = {
          type: "not-supported",
          message: "Camera is not supported in this browser.",
        };
      } else {
        cameraError = {
          type: "unknown",
          message:
            "Unable to access camera. Please check your device settings.",
        };
      }
      setError(cameraError);
      setIsActive(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, currentFacingMode]);

  const capturePhoto = useCallback(async (): Promise<File | null> => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise<File | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          const ext =
            format === "image/png"
              ? "png"
              : format === "image/webp"
                ? "webp"
                : "jpg";
          resolve(
            new File([blob], `crop-capture-${Date.now()}.${ext}`, {
              type: format,
            }),
          );
        },
        format,
        quality,
      );
    });
  }, [isActive, format, quality]);

  const switchCamera = useCallback(
    async (newFacingMode?: "user" | "environment"): Promise<boolean> => {
      const next =
        newFacingMode ??
        (currentFacingMode === "user" ? "environment" : "user");
      setCurrentFacingMode(next);
      if (isActive) {
        if (streamRef.current) {
          for (const track of streamRef.current.getTracks()) track.stop();
        }
        setIsLoading(true);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: next,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
          return true;
        } catch {
          setIsActive(false);
          return false;
        } finally {
          setIsLoading(false);
        }
      }
      return true;
    },
    [isActive, currentFacingMode],
  );

  const retry = useCallback((): Promise<boolean> => {
    setError(null);
    return startCamera();
  }, [startCamera]);

  return {
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    videoRef,
    canvasRef,
  };
}

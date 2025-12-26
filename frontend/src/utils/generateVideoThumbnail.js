export function generateVideoThumbnail(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);

    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const cleanup = () => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    };

    const clamp = (t, d) => {
      if (!Number.isFinite(t)) return 0.5;
      if (!Number.isFinite(d) || d <= 0) return Math.max(0.1, t);
      return Math.max(0.1, Math.min(t, Math.max(0.1, d - 0.1)));
    };

    // Detecta “casi negro” muestreando el centro (rápido)
    const isMostlyBlack = (ctx, w, h) => {
      const sw = Math.min(64, w);
      const sh = Math.min(64, h);
      const x = Math.floor((w - sw) / 2);
      const y = Math.floor((h - sh) / 2);

      const data = ctx.getImageData(x, y, sw, sh).data;
      let bright = 0;
      const total = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (lum > 20) bright++;
      }

      return bright / total < 0.06; // <6% de pixeles “no negros”
    };

    const captureToObjectUrl = () => {
      const w = video.videoWidth || 320;
      const h = video.videoHeight || 180;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return { ok: false, url: null };

      ctx.drawImage(video, 0, 0, w, h);

      // si es negro, señalamos fallo para reintento
      if (isMostlyBlack(ctx, w, h)) return { ok: false, url: null };

      return { ok: true, canvas };
    };

    const blobFromCanvas = (canvas) =>
      new Promise((res) => {
        canvas.toBlob(
          (blob) => res(blob || null),
          "image/jpeg",
          0.82
        );
      });

    const waitEventOnce = (el, event) =>
      new Promise((res) => el.addEventListener(event, res, { once: true }));

    const tryTimes = async (times) => {
      for (const t0 of times) {
        const t = clamp(t0, video.duration);

        try {
          // 1) seek
          video.currentTime = t;
          await waitEventOnce(video, "seeked");

          // 2) deja que decodifique frame (esto evita muchos negros)
          await new Promise((r) => setTimeout(r, 60));

          // 3) captura
          const shot = captureToObjectUrl();
          if (!shot.ok) continue;

          const blob = await blobFromCanvas(shot.canvas);
          if (!blob) continue;

          cleanup();
          return resolve(URL.createObjectURL(blob));
        } catch {
          // sigue probando
        }
      }

      // fallback: aunque sea negro, intenta capturar en el tiempo actual
      try {
        const w = video.videoWidth || 320;
        const h = video.videoHeight || 180;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          cleanup();
          return resolve(null);
        }
        ctx.drawImage(video, 0, 0, w, h);
        const blob = await blobFromCanvas(canvas);
        cleanup();
        return resolve(blob ? URL.createObjectURL(blob) : null);
      } catch {
        cleanup();
        return resolve(null);
      }
    };

    video.addEventListener(
      "loadedmetadata",
      async () => {
        const d = Number.isFinite(video.duration) ? video.duration : 0;

        // tiempos buenos (evitan caer entre keyframes)
        const times = [
          0.8,
          1.6,
          3.0,
          d * 0.1,
          d * 0.2,
          d * 0.35,
        ].filter((x) => Number.isFinite(x) && x > 0);

        await tryTimes(times);
      },
      { once: true }
    );

    video.addEventListener(
      "error",
      () => {
        cleanup();
        resolve(null);
      },
      { once: true }
    );
  });
}

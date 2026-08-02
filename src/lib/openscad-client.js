import workerUrl from "./openscad-worker.js?worker&url";

function resolveRuntimeUrl() {
  let baseUri = typeof document !== "undefined" && document.baseURI ? document.baseURI : window.location.href;
  if (!baseUri.endsWith("/")) {
    baseUri += "/";
  }
  const rawBase = import.meta.env.BASE_URL || "/";
  const baseUrl = new URL(rawBase.startsWith("/") ? rawBase : `/${rawBase}`, baseUri);
  let baseUrlStr = baseUrl.toString();
  if (!baseUrlStr.endsWith("/")) {
    baseUrlStr += "/";
  }
  return new URL("vendor/openscad/openscad.js", baseUrlStr).toString();
}

export function runOpenScad(job) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerUrl, { type: "module" });

    worker.addEventListener("message", (event) => {
      const { data } = event;
      worker.terminate();

      if (data.ok) {
        resolve(data.result);
        return;
      }

      reject(new Error(data.error || "OpenSCAD worker failed."));
    });

    worker.addEventListener("error", (event) => {
      worker.terminate();
      reject(event.error || new Error("OpenSCAD worker crashed."));
    });

    worker.postMessage({
      runtimeUrl: resolveRuntimeUrl(),
      ...job,
    });
  });
}

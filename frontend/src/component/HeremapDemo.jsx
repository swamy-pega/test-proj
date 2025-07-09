import { useEffect } from "react";

export default function HeremapDemo() {
  useEffect(() => {
    const loadMap = async () => {
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

      if (window.H && document.getElementById("map")) {
        const platform = new window.H.service.Platform({
          apikey: "DlqeuMym9uodgxow7dJBpcLJypNMo3p5WbukDvfSW8I"
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new window.H.Map(
          document.getElementById("map"),
          defaultLayers.vector.normal.map,
          {
            center: { lat: 52.5, lng: 13.4 },
            zoom: 10,
            pixelRatio: window.devicePixelRatio || 1
          }
        );
      }
    };

    loadMap();
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

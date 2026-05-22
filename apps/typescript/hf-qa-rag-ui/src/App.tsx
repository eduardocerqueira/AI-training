import { useEffect, useState } from "react";

import { API_URL, fetchHealth } from "@/api/chat";
import { Thread } from "@/components/assistant-ui/thread";
import { RuntimeProvider } from "@/runtime/RuntimeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

function useSystemDarkMode() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      root.classList.toggle("dark", media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
}

export default function App() {
  useSystemDarkMode();

  const [apiError, setApiError] = useState<string | null>(
    "Connecting to API…",
  );

  useEffect(() => {
    let cancelled = false;
    fetchHealth()
      .then((data) => {
        if (cancelled) return;
        setApiError(data.ok ? null : `API at ${API_URL} returned an error.`);
      })
      .catch(() => {
        if (!cancelled) {
          setApiError(
            `Cannot reach API at ${API_URL}. Start hf-qa-rag-api (npm run dev in apps/node/hf-qa-rag-api).`,
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TooltipProvider>
      <RuntimeProvider>
        <div className="h-svh">
          <Thread apiError={apiError} />
        </div>
      </RuntimeProvider>
    </TooltipProvider>
  );
}

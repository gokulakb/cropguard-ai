import { Globe } from "lucide-react";
import { useEffect } from "react";

interface GoogleTranslateElement {
  readonly pageLanguage: string;
}

interface GoogleTranslateOptions {
  pageLanguage: string;
  layout?: number;
  autoDisplay?: boolean;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => undefined;
    google?: {
      translate: {
        TranslateElement: new (
          options: GoogleTranslateOptions,
          elementId: string,
        ) => GoogleTranslateElement;
      };
    };
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: 1,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div
        id="google_translate_element"
        className="text-sm [&_.goog-te-gadget]:!font-body [&_.goog-te-combo]:rounded-md [&_.goog-te-combo]:border [&_.goog-te-combo]:border-border [&_.goog-te-combo]:bg-background [&_.goog-te-combo]:text-foreground [&_.goog-te-combo]:text-sm [&_.goog-te-combo]:px-2 [&_.goog-te-combo]:py-1 [&_.goog-logo-link]:hidden [&_.goog-te-gadget>span]:hidden"
      />
    </div>
  );
}

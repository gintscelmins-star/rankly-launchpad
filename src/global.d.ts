declare interface Window {
  dataLayer: Record<string, unknown>[];
  gtag_report_conversion: (url?: string) => boolean;
}

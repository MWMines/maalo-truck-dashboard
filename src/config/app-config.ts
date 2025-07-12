import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Maalo Truck",
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    title: "Maalo Truck Owner Dashboard",
    description:
      "Maalo Truck Owner Dashboard is a comprehensive platform designed for truck owners to manage their fleet, track shipments, and optimize operations.",
    keywords: "truck, fleet management, logistics, shipment tracking, operations",
  },
};

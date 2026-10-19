const WHATSAPP_NUMBER = "919666039444";

export interface WhatsAppProductParams {
  productName: string;
  modelNumber?: string | null;
  productUrl?: string;
}

export function getProductWhatsAppUrl(params: WhatsAppProductParams): string {
  let message = `Hello Prakash Agri Tools, I am interested in ${params.productName}`;
  if (params.modelNumber) {
    message += ` (Model: ${params.modelNumber})`;
  }
  message += `. Please share the latest price, availability, specifications and delivery details.`;

  if (params.productUrl) {
    message += `\nProduct Link: ${params.productUrl}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || "Hello Prakash Agri Tools, I would like to enquire about your agricultural equipment and machinery.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const BUSINESS_INFO = {
  name: "Prakash Agri Tools",
  phoneDisplay: "+91 96660 39444",
  phoneRaw: "+919666039444",
  whatsappNumber: WHATSAPP_NUMBER,
  location: "LB Nagar, Hyderabad, Telangana, India",
  establishedYear: "2009",
  categories: [
    { name: "Agricultural Implements", slug: "agricultural-implements" },
    { name: "Spraying Equipment", slug: "spraying-equipment" },
    { name: "Garden & Power Equipment", slug: "garden-power-equipment" },
    { name: "Fodder Equipment", slug: "fodder-equipment" },
    { name: "Spare Parts", slug: "spare-parts" },
  ],
};

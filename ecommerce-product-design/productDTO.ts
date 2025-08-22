export type ProductType =
  | "simple"
  | "variable"
  | "group"
  | "bundle"
  | "downloadable"
  | "subscription";

export interface VariantDTO {
  attributeName: string;
  attributeValue: string;
  sku: string;
  price: number;
}

export interface ProductDTO {
  name: string;
  description: string;
  type: ProductType;
  price?: number;
  sku?: string;
  variants?: VariantDTO[];
  groupProductIds?: number[];
  bundleComponents?: { productId: number; quantity: number }[];
  fileUrl?: string;
  subscriptionDetails?: {
    billingPeriod: "weekly" | "monthly" | "yearly";
    durationMonths: number;
  };
}

import type { ProductDTO, AddProductDTO } from "@/services/product";
import { Brand, NullableBrand } from "./brand";

const getStringFrom = (data: string | undefined): string => {
  return data || "";
};

export class Product {
  isNull: boolean;
  constructor(private product: ProductDTO) {
    this.isNull = false;
  }

  get id(): string {
    return getStringFrom(this.product.id);
  }

  get name(): string {
    return getStringFrom(this.product.name);
  }

  set name(name: string) {
    this.product.name = name;
  }

  get description(): string {
    return getStringFrom(this.product.description);
  }

  set description(description: string) {
    this.product.description = description;
  }

  get createdAt(): string {
    return getStringFrom(this.product.createdAt);
  }

  get brand(): Brand {
    if (this.product.brand) {
      return new Brand(this.product.brand);
    }
    return NullableBrand();
  }

  set brand(brand: Brand) {
    this.product.brand = brand.DTO;
  }

  get editionDates(): string[] {
    return this.product.editionDates ? this.product.editionDates : [];
  }

  get DTO(): ProductDTO {
    return this.product;
  }

  static build(state: Builder): AddProductDTO {
    return {
      brand: state.brand.DTO,
      description: state.description,
      name: state.name,
    };
  }
}

export const NullableProduct = (): Product => {
  const product = new Product({});
  product.isNull = true;
  return product;
};

export type Builder = {
  name: string;
  brand: Brand;
  description: string;
};

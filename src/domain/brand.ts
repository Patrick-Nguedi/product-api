import type { BrandDTO, AddBrandDTO } from "@/services/product";

const getStringFrom = (data: string | undefined): string => {
  return data || "";
};

export class Brand {
  isNull: boolean;

  constructor(private brand: BrandDTO) {
    this.isNull = false;
  }

  get id(): string {
    return getStringFrom(this.brand.id);
  }

  get name(): string {
    return getStringFrom(this.brand.name);
  }

  set name(name: string) {
    this.brand.name = name;
  }

  get description(): string {
    return getStringFrom(this.brand.description);
  }

  set description(description: string) {
    this.brand.description = description;
  }

  get DTO(): BrandDTO {
    return this.brand;
  }

  static build(state: Builder): AddBrandDTO {
    return {
      description: state.description,
      name: state.name,
    };
  }
}

export const NullableBrand = (): Brand => {
  const brand = new Brand({});
  brand.isNull = true;
  return brand;
};

export type Builder = {
  name: string;
  description: string;
};

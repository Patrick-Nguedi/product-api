import type { Brand } from "@/domain/brand";

export interface ListItem<T> {
  get id(): string;
  get item(): T;
  get text(): string;
}

export class BrandItem implements ListItem<Brand> {
  constructor(private brand: Brand) {}

  get id(): string {
    return this.brand.id;
  }

  get item(): Brand {
    return this.brand;
  }

  get text(): string {
    return this.brand.name;
  }
}

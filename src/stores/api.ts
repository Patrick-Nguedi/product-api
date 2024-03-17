import { defineStore } from "pinia";

import {
  Brand,
  NullableBrand,
  type Builder as BrandBuilder,
} from "@/domain/brand";
import {
  NullableProduct,
  Product,
  type Builder as ProductBuilder,
} from "@/domain/product";
import { BrandService, ProductService } from "@/services/product";

export const useApiStore = defineStore("api", () => {
  const getAllProducts = async (): Promise<Product[]> => {
    let products: Product[] = [];
    try {
      const productsList = await ProductService.getAllProducts();
      products = productsList.map((product) => new Product(product));
    } catch (error) {
      console.log(error);
    }
    return products;
  };

  const getProductById = async (productId: string): Promise<Product> => {
    try {
      const product = await ProductService.getProductById({
        productId,
      });
      return new Product(product);
    } catch (error) {
      console.log(error);
      return NullableProduct();
    }
  };

  const editProduct = async (product: Product): Promise<void> => {
    try {
      await ProductService.editProduct({
        productId: product.id,
        requestBody: product.DTO,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (
    builder: ProductBuilder,
  ): Promise<string | undefined> => {
    try {
      const productId = await ProductService.createProduct({
        requestBody: Product.build(builder),
      });
      return productId;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    try {
      await ProductService.deleteProductById({
        productId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editBrand = async (brand: Brand): Promise<void> => {
    try {
      await BrandService.createBrand({
        requestBody: brand,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createBrand = async (
    builder: BrandBuilder,
  ): Promise<string | undefined> => {
    try {
      const brandId = await BrandService.createBrand({
        requestBody: Brand.build(builder),
      });
      return brandId;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const getAllBrands = async (): Promise<Brand[]> => {
    let brands: Brand[] = [];
    try {
      const brandsList = await BrandService.getAllBrands();
      brands = brandsList.map((brand) => new Brand(brand));
    } catch (error) {
      console.log(error);
    }
    return brands;
  };

  const getBrandById = async (brandId: string): Promise<Brand> => {
    try {
      const brand = await BrandService.getBrandById({ brandId });
      return new Brand(brand);
    } catch (error) {
      console.log(error);
      return NullableBrand();
    }
  };

  const deleteBrand = async (brandId: string): Promise<void> => {
    try {
      await ProductService.deleteBrandById({
        brandId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    editProduct,
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    editBrand,
    createBrand,
    getAllBrands,
    getBrandById,
    deleteBrand,
  };
});

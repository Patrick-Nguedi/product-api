/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddProductDTO } from '../models/AddProductDTO';
import type { ProductDTO } from '../models/ProductDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
    /**
     * get all products
     * use to get the list of available products
     * @returns ProductDTO successful operation
     * @throws ApiError
     */
    public static getAllProducts(): CancelablePromise<Array<ProductDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
        });
    }
    /**
     * create product
     * use to add a new product
     * @returns string successful operation
     * @throws ApiError
     */
    public static createProduct({
        requestBody,
    }: {
        /**
         * Data need to perfom the creation of product
         */
        requestBody: AddProductDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/product',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Product by id
     * use to retreive a product base its id
     * @returns ProductDTO successful operation
     * @throws ApiError
     */
    public static getProductById({
        productId,
    }: {
        /**
         * product ID
         */
        productId: string,
    }): CancelablePromise<ProductDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product/{productId}',
            path: {
                'productId': productId,
            },
        });
    }
    /**
     * update a Product
     * update a Product
     * @returns any successful operation
     * @throws ApiError
     */
    public static editProduct({
        productId,
        requestBody,
    }: {
        /**
         * product ID
         */
        productId: string,
        /**
         * Product content that need to be update
         */
        requestBody: ProductDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/product/{productId}',
            path: {
                'productId': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete product by id
     * Delete product by id
     * @returns void
     * @throws ApiError
     */
    public static deleteProductById({
        productId,
    }: {
        /**
         * The id of the product to delete
         */
        productId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/product/{productId}',
            path: {
                'productId': productId,
            },
        });
    }
    /**
     * Delete brand by id
     * Delete brand by id
     * @returns void
     * @throws ApiError
     */
    public static deleteBrandById({
        brandId,
    }: {
        /**
         * The id of the brand to delete
         */
        brandId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/brand/{brandId}',
            path: {
                'brandId': brandId,
            },
        });
    }
}

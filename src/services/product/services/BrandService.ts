/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddBrandDTO } from '../models/AddBrandDTO';
import type { BrandDTO } from '../models/BrandDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BrandService {
    /**
     * get all Brands
     * use to get all brands
     * @returns BrandDTO successful operation
     * @throws ApiError
     */
    public static getAllBrands(): CancelablePromise<Array<BrandDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands',
        });
    }
    /**
     * create a brand
     * use to add a new brand
     * @returns string successful operation
     * @throws ApiError
     */
    public static createBrand({
        requestBody,
    }: {
        /**
         * Data need to perfom the creation of brand
         */
        requestBody: AddBrandDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/brand',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Brand by id
     * use to retreive a brand base its id
     * @returns BrandDTO successful operation
     * @throws ApiError
     */
    public static getBrandById({
        brandId,
    }: {
        /**
         * brand ID
         */
        brandId: string,
    }): CancelablePromise<BrandDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brand/{brandId}',
            path: {
                'brandId': brandId,
            },
        });
    }
    /**
     * update a Brand
     * update a Brand
     * @returns any successful operation
     * @throws ApiError
     */
    public static editBrand({
        brandId,
        requestBody,
    }: {
        /**
         * brand ID
         */
        brandId: string,
        /**
         * brand content that need to be update
         */
        requestBody: BrandDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/brand/{brandId}',
            path: {
                'brandId': brandId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

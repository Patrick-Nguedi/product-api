/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Array } from './Array';
import type { BrandDTO } from './BrandDTO';
export type ProductDTO = {
    /**
     * product identifier
     */
    id?: string;
    /**
     * product name
     */
    name?: string;
    brand?: BrandDTO;
    /**
     * short description of product
     */
    description?: string;
    /**
     * when the product has been registered
     */
    createdAt?: string;
    editionDates?: Array;
};


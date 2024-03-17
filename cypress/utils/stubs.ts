/// <reference types="cypress" />
import { brands, products } from "./index";


export const utilsMocks = () => {
  
  const useMobileViewport = () => {
    cy.viewport("iphone-xr");
  };

  const stubProductsList = () => {
    cy.intercept({
      url: "/products",
      method: "GET",
  }, {
      statusCode: 200,
      body: products,
  }).as("products-list");
  };

  const stubProductAdd = () => {
    cy.intercept(
      {
        url:"/product",
        method: "POST",
      },
      {
        statusCode: 204,
      },
    ).as("add-product");
  };

  const stubProductDetails = () => {
    cy.intercept(
      {
        url: "product/ffb243e4-f52a-4ed8-9f9c-000690ddc319",
        method: "GET",
      },
      {
        statusCode: 200,
        body: products[0],
      },
    );
  };

  return {
    useMobileViewport,
    stubProductsList,
    stubProductAdd,
    stubProductDetails,
    assertProductListHas
  };
};

type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
};
const assertProductListHas = (product: Product): void => {
  cy.get("[data-test$='-product']");
  cy.get(`[data-test='${product.id}-product']`).within(() => {
    cy.get("[data-test='product-name']").should("have.text", product.name);
    cy.get("[data-test='product-brand']").should(
      "have.text",
      product.brand
    );
    cy.get("[data-test='product-description']").should(
      "have.text",
      product.description
    );
  });
};

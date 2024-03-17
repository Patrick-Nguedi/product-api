
import { utilsMocks } from "../../utils/stubs";

const {
  stubProductsList,
  assertProductListHas,
} = utilsMocks();

describe("List of product", () => {
    it("should display empty page when products list is not availble", () => {
        cy.intercept({
            url: "/products",
            method: "GET",
        }, {
            statusCode: 200,
            body: [],
        }).as("empty-products-list");
        cy.visit("/");
        cy.get("[data-test='empty-description']").should(
            "contain.text",
            "Empty list"
          );
    })

    it("should display the available procucts list", () => {
        stubProductsList();
        cy.visit("/");
        cy.wait("@products-list");

        assertProductListHas({
            id: "ffb243e4-f52a-4ed8-9f9c-000690ddc319",
            name: "Sac a main",
            brand: "channel",
            description: "new bag",
        })
    })
})
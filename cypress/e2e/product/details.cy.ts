
import { utilsMocks } from "../../utils/stubs";

const {
  stubProductsList,
  stubProductDetails,
  assertProductDetailsHas,
} = utilsMocks();

const productId = "ffb243e4-f52a-4ed8-9f9c-000690ddc319";

describe("Product details", () => {

    it("should display the procuct details successfully", () => {
        stubProductsList();
        cy.visit("/");
        cy.wait("@products-list");
        stubProductDetails();
        cy.get(`[data-test='${productId}-product']`).click();
        cy.wait("@product-details");
        assertProductDetailsHas({
            id: "ffb243e4-f52a-4ed8-9f9c-000690ddc319",
            name: "Sac a main",
            brand: "channel",
            createdAt: "Friday, February 16, 2024 4:31 PM",
            description: "new bag",
        })
    })
})
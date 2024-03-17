import { createRouter, createWebHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    tag: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/products",
      redirect: to => {
        return { path: "/", query: { page: "products" } }
      },
    },
    {
      path: "/",
      name: "products list page",
      component: () => import("@/views/product/ProductsListPage.vue"),
      meta: {
        tag: "product",
      },
    },
    {
      path: "/products/:productId",
      name: "product details page",
      props: true,
      component: () => import("@/views/product/ProductDetailsPage.vue"),
      meta: {
        tag: "product",
      },
    },
    {
      path: "/brands",
      name: "brands list page",
      component: () => import("@/views/brand/BrandsListPage.vue"),
      meta: {
        tag: "brand",
      },
    },
    {
      path: "/brands/:brandId",
      props: true,
      name: "brand details page",
      component: () => import("@/views/brand/BrandDetailsPage.vue"),
      meta: {
        tag: "brand",
      },
    },
  ],
});

export default router;

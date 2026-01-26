import { ApiClient } from "@/lib/api-client";

export interface ProductFilters {
    limit?:number;
    skip?:number;
    sortBy?:string;
    order?: 'asc' | 'desc';
}

export interface Product {
      id: number;
      title: string;
      description: string;
      brand: string;
      price: number;
      stock: number;
      rating: number;
      thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productService = {
    getProducts:async (filters:ProductFilters={}): Promise<ProductsResponse> => {
        const {limit=10, skip=0, sortBy='id',order='desc'}=filters;
        const queryParams = `?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
        return ApiClient.get(`products${queryParams}`);
    },

    getProductById: async (id: number): Promise<Product> => {
    return ApiClient.get(`/products/${id}`);
  },

  // deleteProduct: async (id: number) => {
  //   return ApiClient.delete(`/products/${id}`);
  // },

  // addProduct: async (product: Partial<Product>) => {
  //   return ApiClient.post('/products/add', product);
  // },

  // updateProduct: async (id: number, product: Partial<Product>) => {
  //   return ApiClient.put(`/products/${id}`, product);
  // },
}


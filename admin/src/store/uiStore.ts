import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Products table state
  productsPageIndex: number;
  productsPageSize: number;
  productsSortBy: string;
  productsSortOrder: 'asc' | 'desc';
  
  // Actions
  setProductsPage: (pageIndex: number) => void;
  setProductsPageSize: (pageSize: number) => void;
  setProductsSorting: (sortBy: string, order: 'asc' | 'desc') => void;
  resetProductsFilters: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
   
      productsPageIndex: 0,
      productsPageSize: 10,
      productsSortBy: 'id',
      productsSortOrder: 'desc',
      
      
      setProductsPage: (pageIndex) => set({ productsPageIndex: pageIndex }),
      
      setProductsPageSize: (pageSize) => set({ 
        productsPageSize: pageSize,
        productsPageIndex: 0, 
      }),
      
      setProductsSorting: (sortBy, order) => set({ 
        productsSortBy: sortBy,
        productsSortOrder: order,
      }),
      
      resetProductsFilters: () => set({
        productsPageIndex: 0,
        productsPageSize: 10,
        productsSortBy: 'id',
        productsSortOrder: 'desc',
      }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
'use client';
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useUIStore } from "@/store/uiStore";
import { useProducts } from "@/hooks/useProducts";


const ProductsPage =  () => {
 const { 
    productsPageIndex, 
    productsPageSize, 
    productsSortBy, 
    productsSortOrder 
  } = useUIStore();

 const { data, isLoading, error } = useProducts({
    limit: productsPageSize,
    skip: productsPageIndex * productsPageSize,
    sortBy: productsSortBy,
    order: productsSortOrder,
  });

   if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
    if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading products</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }
 return (
    <div>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex justify-between items-center">
        <h1 className="font-semibold">All Products</h1>
        <p className="text-sm text-muted-foreground">
          Total: {data?.total || 0} products
        </p>
      </div>
      
      <DataTable 
        columns={columns} 
        data={data?.products || []}
        total={data?.total || 0}
      />
    </div>
  );
};

export default ProductsPage;

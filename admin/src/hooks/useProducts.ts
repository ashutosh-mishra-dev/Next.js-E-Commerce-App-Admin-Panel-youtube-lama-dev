import { ProductFilters, productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export function useProducts(filters: ProductFilters={} ){
    return useQuery({
        queryKey: ['products',filters],
        queryFn: () => productService.getProducts(filters),
        staleTime: 30 * 1000,
    });
}
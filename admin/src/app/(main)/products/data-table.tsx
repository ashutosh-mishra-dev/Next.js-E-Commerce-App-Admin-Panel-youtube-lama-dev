"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Trash2 } from "lucide-react";
//import { useDeleteProducts } from "@/hooks/useProducts";
import { useUIStore } from "@/store/uiStore";
import { DataTablePagination } from "@/components/TablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  // UI state from Zustand
  const {
    productsPageIndex,
    productsPageSize,
    productsSortBy,
    productsSortOrder,
    setProductsPage,
    setProductsPageSize,
    setProductsSorting,
  } = useUIStore();

  // Delete mutation from React Query
  //const { mutate: deleteProducts, isPending } = useDeleteProducts();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(total / productsPageSize),
    state: {
      rowSelection,
      pagination: {
        pageIndex: productsPageIndex,
        pageSize: productsPageSize,
      },
      sorting: [{ id: productsSortBy, desc: productsSortOrder === 'desc' }],
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater({ pageIndex: productsPageIndex, pageSize: productsPageSize })
          : updater;
      setProductsPage(newState.pageIndex);
      if (newState.pageSize !== productsPageSize) {
        setProductsPageSize(newState.pageSize);
      }
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function'
          ? updater([{ id: productsSortBy, desc: productsSortOrder === 'desc' }])
          : updater;
      if (newSorting[0]) {
        setProductsSorting(newSorting[0].id, newSorting[0].desc ? 'desc' : 'asc');
      }
    },
  });

  const handleDelete = () => {
    //const selectedRows = table.getFilteredSelectedRowModel().rows;
    //const ids = selectedRows.map((row: any) => row.original.id);

    // if (confirm(`Delete ${ids.length} product(s)?`)) {
    //   deleteProducts(ids, {
    //     onSuccess: () => {
    //       setRowSelection({});
    //     },
    //   });
    // }
  };

  return (
    <div className="rounded-md border">
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            //disabled={isPending}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-3 py-2 m-4 text-sm rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {/* {isPending
              ? 'Deleting...'
              : `Delete ${Object.keys(rowSelection).length} Product(s)`} */}
          </button>
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <DataTablePagination table={table} totalRows={total} /> */}
      <DataTablePagination table={table}  />
    </div>
  );
}
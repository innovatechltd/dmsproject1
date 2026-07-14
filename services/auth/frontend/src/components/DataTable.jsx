import React, { useState } from 'react';
import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Minus,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  AlertTriangle,
  User,
  Calendar,
  FileText,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search
} from 'lucide-react';

export function DataTable({
  columns = [],
  data = [],
  itemsPerPage = 5,
  onEdit,
  onDelete,
  onAdd
}) {
  const [sorting, setSorting] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });
  const [deleteItem, setDeleteItem] = useState(null);

  // Extend columns with S.No, Expand, and Actions
  const tableColumns = React.useMemo(() => {
    return [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        ),
      },
      {
        id: 'sno',
        header: 'S.No',
        cell: ({ row, table }) => {
          return (
            <span className="font-medium text-muted-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1}
            </span>
          );
        },
      },
      ...columns,
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          return (
            <div className="flex justify-end gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-blue-500 hover:text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => onEdit(row.original)}
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                  onClick={() => setDeleteItem(row.original)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        },
      },
    ];
  }, [columns, onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      expanded,
      globalFilter,
      pagination,
    },
  });

  const handleDeleteConfirm = () => {
    if (deleteItem && onDelete) {
      onDelete(deleteItem);
    }
    setDeleteItem(null);
  };

  const renderPaginationButtons = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    
    return Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      ) {
        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(page - 1)}
            className={`h-8 w-8 p-0 ${currentPage === page ? '' : 'text-muted-foreground'}`}
          >
            {page}
          </Button>
        );
      } else if (
        page === currentPage - 2 ||
        page === currentPage + 2
      ) {
        return <MoreHorizontal key={page} className="h-4 w-4 text-muted-foreground" />;
      }
      return null;
    });
  };

  return (
    <div className="space-y-4 w-full">
      {/* Top Controls: Show entries & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[70px] h-9">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-9 w-full bg-card/60 backdrop-blur-xl shadow-soft"
            />
          </div>
          {onAdd && (
            <Button onClick={onAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Record
            </Button>
          )}
        </div>
      </div>
      
      <div className="rounded-md border border-border/50 bg-card/60 backdrop-blur-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm whitespace-nowrap">
            <TableHeader className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase tracking-wider text-[11px] font-semibold">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    const isSortable = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();
                    
                    let sortIcon = null;
                    if (isSortable && header.id !== 'expander' && header.id !== 'actions' && header.id !== 'sno') {
                       if (isSorted === 'asc') sortIcon = <ArrowUp className="ml-1 h-3 w-3" />;
                       else if (isSorted === 'desc') sortIcon = <ArrowDown className="ml-1 h-3 w-3" />;
                       else sortIcon = <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />;
                    }

                    return (
                      <TableHead 
                        key={header.id} 
                        className={`px-6 py-4 ${isSortable ? 'cursor-pointer select-none hover:text-foreground' : ''}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className={`flex items-center ${header.id === 'actions' ? 'justify-end' : ''}`}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {sortIcon}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            
            <TableBody className="divide-y divide-border/40">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-6 py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {row.getIsExpanded() && (
                      <TableRow className="bg-muted/5 hover:bg-muted/5 border-b border-border/40">
                        <TableCell colSpan={tableColumns.length} className="p-0">
                          <div className="px-14 py-6 space-y-5">
                            {row.original.description && (
                              <div>
                                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                                  <FileText className="w-4 h-4 text-primary" /> Details
                                </h4>
                                <p className="text-sm text-muted-foreground bg-background p-3 rounded-lg border border-border/50 whitespace-normal">
                                  {row.original.description}
                                </p>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                                <Clock className="w-4 h-4 text-primary" /> Audit History
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground bg-background rounded-lg border border-border/50 p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <span className="block font-medium text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Added By</span>
                                    <div className="flex flex-col">
                                      <span className="text-foreground font-medium">{row.original.audit?.addedBy || 'System Administrator'}</span>
                                      <span className="text-xs text-muted-foreground">{row.original.audit?.role || 'Admin'}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-info/10 rounded-full text-info">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <span className="block font-medium text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Action Date</span>
                                    <span className="text-foreground font-medium">{row.original.audit?.createdAt || new Date().toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-warning/10 rounded-full text-warning">
                                    <Clock className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <span className="block font-medium text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Last Modified</span>
                                    <span className="text-foreground font-medium">{row.original.audit?.updatedAt || new Date().toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-success/10 rounded-full text-success">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <span className="block font-medium text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Action Notes</span>
                                    <span className="text-foreground font-medium whitespace-normal">{row.original.audit?.notes || 'Initial record creation.'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                data.length
              )}
            </span>{' '}
            of <span className="font-medium">{data.length}</span> results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {renderPaginationButtons()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex gap-4 mb-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mt-1">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <AlertDialogTitle className="text-xl">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="mt-1.5">
                  You are about to delete the following record. This action cannot be undone and the data will be permanently removed.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          {/* Record Details Snippet */}
          {deleteItem && (
            <div className="bg-muted/30 p-3.5 rounded-lg border border-border/60 my-2 text-sm shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-muted-foreground font-medium">Record ID</span>
                <span className="font-semibold text-foreground px-2 py-0.5 bg-background rounded border border-border/50">{deleteItem.id || 'N/A'}</span>
              </div>
              {deleteItem.department && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium text-foreground">{deleteItem.department}</span>
                </div>
              )}
              {deleteItem.category && (
                <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-border/30">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{deleteItem.category}</span>
                </div>
              )}
            </div>
          )}

          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

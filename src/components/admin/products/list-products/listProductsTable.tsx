"use client";

import React, { useState, useMemo } from "react";
import { useGetProducts } from "@/hooks/admin/products/list-products/useGetProducts";
import { Product } from "@/types/admin/products/Product";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
} from "@heroui/react";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/loader";
import ProductActionDropdown from "./productActionsDropdown";
import DeleteProductModal from "./modals/deleteProductModal";
import EditProductModal from "./modals/editProductModal";
import FiltersProductModal from "./modals/filtersProductModal";
import { Table } from "flowbite-react";
import Breadcrumb from "@/components/breadcrumbs/breadcrumb";

export default function ListProductsTable() {
  const router = useRouter();

  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Búsqueda local
  const [searchValue, setSearchValue] = useState("");

  // Modales
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Hook para obtener productos
  const { products, loading, error, refetch } = useGetProducts();

  // Filtro local con useMemo
  const filteredProducts = useMemo(() => {
    if (!searchValue) return products;
    return products.filter((p) =>
      p.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, products]);

  // Cálculo de paginación local
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Slice local para la página actual
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = filteredProducts.slice(startIndex, endIndex);

  const handleSearch = () => {
    // Aquí podrías aplicar filtros en el backend
  };

  const handleGoToAdd = () => {
    router.push("/admin/products/add-product");
  };

  const removeLocalProduct = () => {
    refetch(); // Simple: vuelve a obtener la lista del backend
  };
  const updateLocalProduct = () => {
    refetch();
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-19">
    <Breadcrumb  backPageName='Inicio' backPageRoute='/' pageName='Lista de productos'/>
      {/* Contenedor principal */}
      <div className="rounded-lg border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark shadow-sm p-4">
        {/* Encabezado con búsqueda y paginación */}
     
        <div className="flex flex-wrap md:flex-nowrap justify-between items-end gap-4 mb-4">
          {/* Barra de búsqueda */}
          <div className="flex flex-1 gap-2">
            <Input
              isClearable
              placeholder="Buscar producto..."
              startContent={<FaSearch />}
              value={searchValue}
              onClear={() => setSearchValue("")}
              onValueChange={setSearchValue}
            />
            <Button color="primary" onPress={handleSearch}>
              Buscar
            </Button>
          </div>

          {/* Dropdown para pageSize */}
          <Dropdown backdrop="opaque">
            <DropdownTrigger>
              <Button variant="flat">{pageSize} por página</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Seleccionar cantidad por página"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={new Set([String(pageSize)])}
              onSelectionChange={(keys) =>
                setPageSize(Number(Array.from(keys).join("")))
              }
            >
              <DropdownItem key="5">5</DropdownItem>
              <DropdownItem key="10">10</DropdownItem>
              <DropdownItem key="15">15</DropdownItem>
              <DropdownItem key="20">20</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Botones Filtros y Agregar */}
          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<FaFilter />}
              onPress={() => setShowFiltersModal(true)}
            >
              Filtros
            </Button>
            <Button
              color="primary"
              startContent={<FaPlus />}
              onPress={handleGoToAdd}
            >
              Agregar Producto
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500">Error: {error.message}</div>
        ) : (
          <>
            {/* Tabla */}
            <div className="overflow-x-auto h-auto overflow-scroll rounded-md">
              <Table
                hoverable
                className="[&_td]:px-2 [&_td]:py-2 [&_th]:px-2 [&_th]:py-3 text-sm"
              >
                <Table.Head>
                  <Table.HeadCell>Imagen</Table.HeadCell>
                  <Table.HeadCell>Nombre</Table.HeadCell>
                  <Table.HeadCell>Descripción</Table.HeadCell>
                  <Table.HeadCell>Precio</Table.HeadCell>
                  <Table.HeadCell>Descuento</Table.HeadCell>
                  <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {pageItems.map((prod) => (
                    <Table.Row key={prod.id} className="bg-white dark:bg-gray-800">
                      <Table.Cell>
                        {prod.imagenUrl ? (
                          <img
                            src={prod.imagenUrl}
                            alt={prod.nombre}
                            className="w-14 h-14 object-cover rounded"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                            Sin imagen
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell className="font-medium text-dark-7 dark:text-white">
                        {prod.nombre}
                      </Table.Cell>
                      <Table.Cell className="text-gray-7 dark:text-gray-400">
                        {prod.descripcion}
                      </Table.Cell>
                      <Table.Cell className="text-gray-7 dark:text-gray-400">
                        ${prod.precio.toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        {prod.descuento ? (
                          <Chip color="success" size="sm">
                            {prod.porcentajeDescuento ?? 0}%
                          </Chip>
                        ) : (
                          <Chip color="danger" size="sm">
                            No
                          </Chip>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <ProductActionDropdown
                          product={prod}
                          onDelete={() => setProductToDelete(prod)}
                          onEdit={() => setProductToEdit(prod)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Paginación */}
            <div className="py-4 flex justify-between items-center">
              <span className="text-sm text-default-400">
                Total {totalItems} productos
              </span>
              <Pagination
                page={page}
                total={totalPages}
                onChange={setPage}
                showControls
              />
            </div>
          </>
        )}
      </div>

      {/* MODALES */}
      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
          onDeleted={() => {
            setProductToDelete(null);
            removeLocalProduct();
          }}
          removeLocalProduct={removeLocalProduct}
        />
      )}
      {productToEdit && (
        <EditProductModal
          product={productToEdit}
          onClose={() => setProductToEdit(null)}
          onUpdated={() => {
            setProductToEdit(null);
            updateLocalProduct();
          }}
        />
      )}
      {showFiltersModal && (
        <FiltersProductModal
          initialFilters={{}}
          onClose={() => setShowFiltersModal(false)}
          onApply={(filters) => {
            console.log("Filters => ", filters);
            setShowFiltersModal(false);
          }}
        />
      )}
    </div>
  );
}

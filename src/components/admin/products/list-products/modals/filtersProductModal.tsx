"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { ProductsFilters } from "@/hooks/admin/products/list-products/useGetProductosFilters";

interface FiltersProductModalProps {
  initialFilters: ProductsFilters;
  onClose: () => void;
  onApply: (filters: ProductsFilters) => void;
}

export default function FiltersProductModal({
  initialFilters,
  onClose,
  onApply,
}: FiltersProductModalProps) {
  const [descuento, setDescuento] = useState<boolean | undefined>(
    initialFilters.descuento
  );
  const [priceMin, setPriceMin] = useState<number | undefined>(
    initialFilters.priceMin
  );
  const [priceMax, setPriceMax] = useState<number | undefined>(
    initialFilters.priceMax
  );
  const [sortBy, setSortBy] = useState<string | undefined>(
    initialFilters.sortBy
  );
  const [sortOrder, setSortOrder] = useState<string | undefined>(
    initialFilters.sortOrder
  );

  const handleApply = () => {
    onApply({
      ...initialFilters,
      descuento,
      priceMin,
      priceMax,
      sortBy,
      sortOrder,
    });
  };

  return (
    <Modal isOpen={true} onOpenChange={onClose}>
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Filtros de Productos</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={descuento === true}
                    onChange={(e) =>
                      setDescuento(e.target.checked ? true : undefined)
                    }
                  />
                  <span>Sólo con Descuento</span>
                </div>
                <Input
                  label="Precio Mínimo"
                  type="number"
                  value={priceMin ? String(priceMin) : ""}
                  onValueChange={(val) => setPriceMin(parseFloat(val))}
                />
                <Input
                  label="Precio Máximo"
                  type="number"
                  value={priceMax ? String(priceMax) : ""}
                  onValueChange={(val) => setPriceMax(parseFloat(val))}
                />
                <Input
                  label="Ordenar por (ej. precio, createdAt)"
                  value={sortBy || ""}
                  onValueChange={(val) => setSortBy(val)}
                />
                <Input
                  label="Orden (asc o desc)"
                  value={sortOrder || ""}
                  onValueChange={(val) => setSortOrder(val)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onModalClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleApply}>
                Aplicar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

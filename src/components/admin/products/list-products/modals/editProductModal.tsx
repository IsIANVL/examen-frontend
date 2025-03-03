"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useToast } from "@chakra-ui/toast";
import { Product } from "@/types/admin/products/Product";
import { useUpdateProduct } from "@/hooks/admin/products/list-products/useUpdateProduct";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdated: (updated: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onUpdated,
}: EditProductModalProps) {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const toast = useToast();
  const { updateProduct, loading, error } = useUpdateProduct();

  // Form states
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descuento, setDescuento] = useState(false);
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");

  useEffect(() => {
    setNombre(product.nombre);
    setDescripcion(product.descripcion);
    setPrecio(product.precio);
    setDescuento(product.descuento);
    setPorcentajeDescuento(product.porcentajeDescuento || 0);
    setImagenUrl(product.imagenUrl);
  }, [product]);

  const handleSave = async () => {
    if (!product.id) return;
    const updatedData: Product = {
      ...product,
      nombre,
      descripcion,
      precio,
      descuento,
      porcentajeDescuento,
      imagenUrl,
    };

    try {
      const updated = await updateProduct(updatedData);
      toast({
        title: "Producto actualizado",
        description: `Cambios guardados en "${updated.nombre}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onUpdated(updated);
    } catch (err) {
      toast({
        title: "Error al actualizar",
        description: error?.message || "Error desconocido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  label="Nombre"
                  value={nombre}
                  onValueChange={setNombre}
                />
                <Input
                  label="Descripción"
                  value={descripcion}
                  onValueChange={setDescripcion}
                />
                <Input
                  label="Precio"
                  type="number"
                  value={String(precio)}
                  onValueChange={(val) => setPrecio(parseFloat(val))}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={descuento}
                    onChange={(e) => setDescuento(e.target.checked)}
                  />
                  <span>{descuento ? "Con Descuento" : "Sin Descuento"}</span>
                </div>
                {descuento && (
                  <Input
                    label="Porcentaje Descuento"
                    type="number"
                    value={String(porcentajeDescuento)}
                    onValueChange={(val) => setPorcentajeDescuento(parseFloat(val))}
                  />
                )}
                <Input
                  label="Imagen URL"
                  value={imagenUrl}
                  onValueChange={setImagenUrl}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onModalClose} disabled={loading}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                isDisabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

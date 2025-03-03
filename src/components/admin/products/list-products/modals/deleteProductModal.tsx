"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useToast } from "@chakra-ui/toast";
import { Product } from "@/types/admin/products/Product";
import { useDeleteProduct } from "@/hooks/admin/products/list-products/useDeleteProduct";

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
  onDeleted: () => void;
  removeLocalProduct: (id: string) => void;
}

export default function DeleteProductModal({
  product,
  onClose,
  onDeleted,
  removeLocalProduct,
}: DeleteProductModalProps) {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const toast = useToast();
  const { deleteProduct, loading, error } = useDeleteProduct();

  const handleDelete = async () => {
    if (!product.id) return;
    const success = await deleteProduct(product.id);
    if (success) {
      removeLocalProduct(product.id);
      toast({
        title: "Producto eliminado",
        description: `El producto "${product.nombre}" se ha eliminado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onDeleted();
    } else {
      toast({
        title: "Error al eliminar",
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
            <ModalHeader>Eliminar Producto</ModalHeader>
            <ModalBody>
              ¿Estás seguro de eliminar el producto <b>{product.nombre}</b>?
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={onModalClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isDisabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

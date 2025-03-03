"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import { Product } from "@/types/admin/products/Product";

interface ProductActionsDropdownProps {
  product: Product;
  onDelete: () => void;
  onEdit: () => void;
}

export default function ProductActionsDropdown({
  product,
  onDelete,
  onEdit,
}: ProductActionsDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat">
          <FaEllipsisV />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Acciones del producto">
        <DropdownItem
          key="edit"
          startContent={<FaEdit />}
          onPress={onEdit}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<FaTrash />}
          className="text-danger"
          onPress={onDelete}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

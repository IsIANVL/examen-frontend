"use client";

import React, { useState } from "react";
import { useAddProduct } from "@/hooks/admin/products/add-product/useAddProduct";
import { Product } from "@/types/admin/products/Product";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import { Input, Button, Checkbox } from "@heroui/react";
import Breadcrumb from "@/components/breadcrumbs/breadcrumb";

export default function AddProductForm() {
  const router = useRouter();
  const toast = useToast();
  const { addProduct, loading, error } = useAddProduct();

  // Estados del form
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number>(0);
  const [descuento, setDescuento] = useState(false);
  const [porcentajeDescuento, setPorcentajeDescuento] = useState<number>(0);
  const [imagenUrl, setImagenUrl] = useState("");

  // Maneja submit del form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: Product = {
      nombre,
      descripcion,
      precio,
      descuento,
      porcentajeDescuento,
      imagenUrl,
    };

    try {
      const newP = await addProduct(payload);
      toast({
        title: "Producto creado",
        description: `Se creó el producto "${newP.nombre}" exitosamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/admin/products/list-products");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-19">
    <Breadcrumb  backPageName='lista de productos' backPageRoute='/admin/products/list-products' pageName='Agregar productos'/>
      {/* Contenedor principal */}
      <div className="rounded-lg border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark shadow-sm p-4">
        {/* Encabezado con búsqueda y paginación */}
      <h2 className="text-lg font-semibold mb-4 text-dark-7 dark:text-white">
        Datos del Producto
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          label="Nombre"
          placeholder="Ej. Celular Samsung"
          value={nombre}
          onValueChange={setNombre}
          isRequired
          fullWidth
        />
        <Input
          label="Descripción"
          placeholder="Ej. Celular de gama alta"
          value={descripcion}
          onValueChange={setDescripcion}
          isRequired
          fullWidth
        />
        <Input
          label="Precio"
          type="number"
          value={String(precio)}
          onValueChange={(val) => setPrecio(parseFloat(val))}
          placeholder="100"
          isRequired
          fullWidth
        />

        <div className="flex items-center gap-2">
          <Checkbox
            isSelected={descuento}
            onValueChange={() => setDescuento((prev) => !prev)}
          >
            ¿Tiene Descuento?
          </Checkbox>
        </div>

        {descuento && (
          <Input
            label="Porcentaje Descuento"
            type="number"
            value={String(porcentajeDescuento)}
            onValueChange={(val) => setPorcentajeDescuento(parseFloat(val))}
            placeholder="15"
            fullWidth
          />
        )}

        <Input
          label="URL de Imagen"
          value={imagenUrl}
          onValueChange={setImagenUrl}
          placeholder="https://example.com/img.png"
          isRequired
          fullWidth
        />

        <Button type="submit" color="primary" isDisabled={loading} className="w-full md:w-auto">
          {loading ? "Creando..." : "Crear Producto"}
        </Button>

        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
    </div>
  );
}

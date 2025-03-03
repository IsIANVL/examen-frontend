import { Metadata } from "next";
import AddProductForm from "@/components/admin/products/add-products/addProductForm";

export const metadata: Metadata = {
  title: "Agregar Producto",
};

export default function AddProductPage() {
  return (
    <div className="p-4">
      <AddProductForm />
    </div>
  );
}

import { Metadata } from "next";
import ListProductsTable from "@/components/admin/products/list-products/listProductsTable";

// (Opcional) Metadata para la página
export const metadata: Metadata = {
  title: "Lista de Productos",
};

export default function ListProductsPage() {
  return (
    <div className="p-4">
      <ListProductsTable />
    </div>
  );
}

"use client";
import { useEffect, useState, useMemo, Suspense } from "react";
import { useProductStore } from "@/store/productsStore";
import { getAllProducts, deleteProduct } from "@/app/axios/ProductosApi";
import ProductList from "@/components/admin/Products/ProductList";
import { IProduct } from "@/interfaces/productInterface";
import { toast } from "react-toastify";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ProductEditModal from "@/components/admin/Products/ProductEditModal";
import { useSearchParams } from "next/navigation";

const cleanString = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const { products, setProducts } = useProductStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, [setProducts]);

  const filteredProducts = useMemo(() => {
    if (!currentSearch) {
      return products;
    }

    const cleanedSearch = cleanString(currentSearch);

    return products.filter((product) => {
      const nameMatch = cleanString(product.name).includes(cleanedSearch);
      const descriptionMatch = cleanString(product.description || "").includes(
        cleanedSearch
      );

      return nameMatch || descriptionMatch;
    });
  }, [products, currentSearch]);

  const handleDelete = (product: IProduct) => {
    Modal.confirm({
      title: "Borrar producto",
      icon: <ExclamationCircleOutlined />,
      content: `¿Seguro querés borrar ${product.name}?`,
      okText: "Eliminar",
      okButtonProps: { danger: true },
      cancelText: "Cancelar",
      async onOk() {
        try {
          await deleteProduct(product.id);
          setProducts(products.filter((p) => p.id !== product.id));
          toast.success("Producto eliminado 😎");
        } catch {
          toast.error("Error al eliminar el producto");
        }
      },
    });
  };

  const handleEdit = (product: IProduct) => {
    setProductToEdit(product);
    setModalOpen(true);
  };

  return (
    <div>
      <h1 className="mb-6 font-semibold text-primary text-4xl text-center">
        Productos
      </h1>

      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {productToEdit && (
        <ProductEditModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
        />
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

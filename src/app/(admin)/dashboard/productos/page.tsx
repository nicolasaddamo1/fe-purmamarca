"use client";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productsStore";
import { getAllProducts, deleteProduct } from "@/app/axios/ProductosApi";
import ProductList from "@/components/admin/Products/ProductList";
import { IProduct } from "@/interfaces/productInterface";
import { toast } from "react-toastify";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ProductEditModal from "@/components/admin/Products/ProductEditModal";

export default function ProductsPage() {
  const { products, setProducts } = useProductStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, [setProducts]);

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
        products={products}
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

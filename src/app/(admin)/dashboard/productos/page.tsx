"use client";
import { useEffect } from "react";
import { useProductStore } from "@/store/productsStore";
import { getAllProducts, deleteProduct } from "@/app/axios/ProductosApi";
import ProductList from "@/components/admin/Products/ProductList";
import { IProduct } from "@/interfaces/productInterface";
import { toast } from "react-toastify";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { div } from "framer-motion/client";

export default function ProductsPage() {
  const { products, setProducts } = useProductStore();

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
      onOk: async () => {
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
    console.log("Editar producto:", product);
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
    </div>
  );
}

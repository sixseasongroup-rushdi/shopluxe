import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { productDetails, getProductGallery } from "@/data/product-details";
import { ProductDetailView } from "@/components/product/ProductDetailView";

type Props = { params: Promise<{ productId: string }> };
export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);
  if (!product) return { title: "Product not found | SHOPLUXE" };
  return {
    title: `${product.name} | SHOPLUXE`,
    description: productDetails[product.id].subtitle,
    openGraph: {
      title: `${product.name} | SHOPLUXE`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);
  if (!product) notFound();
  const related = [
    ...products.filter(
      (item) => item.category === product.category && item.id !== product.id,
    ),
    ...products.filter((item) => item.category !== product.category),
  ].slice(0, 4);
  return (
    <ProductDetailView
      key={product.id}
      product={product}
      detail={productDetails[product.id]}
      images={getProductGallery(product)}
      related={related}
    />
  );
}

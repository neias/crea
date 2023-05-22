import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";

import ProductList from "../../components/product-list";

import ErrorSchema from "@/types/Error";
import ProductSchema from "@/types/Product";
const ProductListSchema = z.array(ProductSchema);

const apiHost = process.env.API_HOST;

const ProductsPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useQuery("products", async () => {
    const res = await fetch(`${apiHost}/products`, {
      credentials: "include",
      method: "GET",
    });

    if (res.status === 401) {
      throw { auth: false, message: "No token provided." };
    }

    const jsonData = await res.json();

    return jsonData.products;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    const validationResult = ErrorSchema.safeParse(error);
    if (validationResult.success) {
      const mathedError = validationResult.data;
      if (!mathedError.auth) {
        router.push("/login");
      }
    }
  }

  return (
    <>
      <h2 className="mt-10 text-lg font-medium">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Product List */}

        {data?.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
        {/* BEGIN: Product List */}
      </div>
    </>
  );
};

export default ProductsPage;

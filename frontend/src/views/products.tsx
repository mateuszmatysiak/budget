/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { FullPageError } from "../components/Error";
import { FullPageLoader } from "../components/Loader";
import { Product } from "../components/Product/Product";
import { ProductListItems } from "../components/Product/ProductListItems";
import { Section } from "../components/Section";
import { useApi } from "../hooks/useApi";
import { IProduct } from "../types/product";

const ProductsView = () => {
  const params = useParams();

  const { data: products, error } = useApi<IProduct[]>("products");

  const isParamExist = Object.values(params)[0]?.length;

  if (error) return <FullPageError error={error} />;

  if (!products) return <FullPageLoader />;

  return (
    <>
      <ProductListItems products={products} />

      {!isParamExist ? (
        <Section />
      ) : (
        <Routes>
          <Route path="/:productId" element={<Product products={products} />} />
        </Routes>
      )}
    </>
  );
};

export default ProductsView;

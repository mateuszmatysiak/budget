/** @jsxRuntime classic */
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { FormIcon } from "../../icons/form";
import { IShopping } from "../../types/shopping";
import { client } from "../../utils/api-client";
import { Divider } from "../Divider";
import { Section } from "../Section";
import { ShoppingForm } from "./ShoppingForm";
import { ShoppingHeader } from "./ShoppingHeader";
import { formatShoppingData } from "./utils";

interface ShoppingProps {
  shopping?: IShopping[];
}

const Shopping = ({ shopping }: ShoppingProps) => {
  const { shoppingId } = useParams();
  const shoppingItem = shopping?.find((item) => String(item.id) === shoppingId);

  const editShopping = (data: IShopping) =>
    client(`shopping/${shoppingId}`, {
      customConfig: { method: "PATCH" },
      body: formatShoppingData(data),
    })
      .then(() => {
        mutate("shopping");
        mutate("last");
        toast.success("Edytowano liste zakupową");
      })
      .catch((err) => toast.error(err.error));

  return (
    <Section aria-label="Sekcja wybranych zakupów">
      <ShoppingHeader shoppingItem={shoppingItem} />

      <Divider icon={<FormIcon />} />

      <ShoppingForm shoppingItem={shoppingItem} onSubmit={editShopping} />
    </Section>
  );
};

export { Shopping };

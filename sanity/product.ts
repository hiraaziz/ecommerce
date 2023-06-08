export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    },
    {
      name: "type",
      title: "Product Type",
      type: "string",
    },
    {
      name: "description",
      title: "Product Description",
      type: "string",
    },

    {
      name: "price",
      title: "Product Price",
      type: "number",
    },
    {
      name: "prodcare",
      title: "Product Care",
      type: "string",
    },
    {
      name: "images",
      title: "Product Image",
      type: "array",
      of: [
        {
          name: "image",
          type: "image",
          title: "images",
        },
      ],
    },
  ],
};

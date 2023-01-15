import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetailPage = (props) => {
  const { product } = props;

  if (!product) {
    return <p>Loading ...</p>;
  }
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummyBackend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};
export const getStaticProps = async (context) => {
  const data = await getData();

  const { params } = context;
  const productId = params.pid;
  const selectedProduct = data.products.find(
    (product) => product.id === productId
  );

  if (!selectedProduct) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: selectedProduct,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => {
    return {
      params: {
        pid: id,
      },
    };
  });
  return {
    paths: pathsWithParams,
    fallback: false, // true, false, 'blocking'
  };
};

export default ProductDetailPage;

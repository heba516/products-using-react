import { Products } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface Props {
  product: Products;
}
const ProductCard = ({ product }: Props) => {
  const { imgUrl, title, description, price, colors, category } = product;

  const colorsList = colors.map((color) => (
    <CircleColor bg={color} key={`k-${color}`} />
  ));
  return (
    <div className="m-auto max-w-sm md:max-w-lg flex flex-col border rounded-md p-3">
      <Image
        src={imgUrl}
        alt="product"
        className="rounded-md mb-2 h-52 lg:object-cover"
      />

      <h3>{title}</h3>
      <p>{txtSlicer(description, 50)}</p>

      <div className="flex items-center space-x-2 my-4">
        {colors.map((color) => (
          <span
            key={`${color}1`}
            className={`w-4 h-4 rounded-full cursor-pointer bg-${color}`}
          ></span>
        ))}
      </div>

      <span>${price}</span>
      <div className="flex items-center justify-between">
        <h4>{category.name}</h4>
        <Image
          src={category.imgUrl}
          alt="product"
          className="w-10 h-10 rounded-full object-center"
        />
      </div>

      <div className="flex flex-wrap items-center space-x-2 my-4">
        {colorsList}
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Button
          width="w-full"
          onClick={() => console.log("Delete")}
          className="bg-red-600"
        >
          DELETE
        </Button>
        <Button
          width="w-full"
          onClick={() => console.log("Edit")}
          className="bg-blue-800"
        >
          EDIT
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

import { Products } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface Props {
  product: Products;
  updateProduct: (product: Products) => void;
  openEditModal: () => void;
  openRemoveModal: () => void;
  index: number;
  setIndex: (indx: number) => void;
}
const ProductCard = ({
  product,
  updateProduct,
  openEditModal,
  openRemoveModal,
  index,
  setIndex,
}: Props) => {
  const { imgUrl, title, description, price, colors, category } = product;

  const colorsList = colors.map((color) => (
    <CircleColor bg={color} key={`k-${color}`} />
  ));

  const handleEdit = () => {
    openEditModal();
    updateProduct(product);
    setIndex(index);
  };

  const handleRemove = () => {
    updateProduct(product);
    openRemoveModal();
  };

  return (
    <div className="h-[486px] m-auto max-w-sm md:max-w-lg space-y-2 flex flex-col border rounded-md p-3">
      <Image
        src={imgUrl}
        alt="product"
        className="rounded-md mb-2 h-52 lg:object-cover"
      />

      <h3 className="font-semibold">{title}</h3>
      <p className="h-12">{txtSlicer(description, 50)}</p>

      <span>${price}</span>

      <div className="flex flex-wrap items-center space-x-2">{colorsList}</div>

      <div className="flex items-center justify-between">
        <h4>{category.name}</h4>
        <Image
          src={category.imgUrl}
          alt="product"
          className="w-10 h-10 rounded-full object-center"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Button width="w-full" onClick={handleRemove} className="bg-red-600">
          DELETE
        </Button>
        <Button width="w-full" className="bg-blue-800" onClick={handleEdit}>
          EDIT
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

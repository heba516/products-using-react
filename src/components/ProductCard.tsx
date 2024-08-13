// interface IProps {}
import Image from "./Image";
import Button from "./ui/Button";
const ProductCard = () => {
  return (
    <div className="flex flex-col border rounded-md p-3">
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        alt="product"
        className="rounded-md mb-2"
      />

      <h3>Nike</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

      <div className="flex items-center space-x-2 my-4">
        <span className="w-4 h-4 rounded-full cursor-pointer bg-blue-800"></span>
        <span className="w-4 h-4 rounded-full cursor-pointer bg-red-600"></span>
        <span className="w-4 h-4 rounded-full cursor-pointer bg-green-600"></span>
      </div>

      <div className="flex items-center justify-between">
        <span>$500.000</span>
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
          alt="product"
          className="w-10 h-10 rounded-full object-center"
        />
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

import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react";
import { formInputs, productList, colors, categories } from "./data";
import { Products } from "./interfaces";
import { productValidation } from "./validation";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import ErrMsg from "./components/ErrMsg";
import CircleColor from "./components/ui/CircleColor";
import SelectMenu from "./components/ui/selectMenu";

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imgUrl: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imgUrl: "",
    },
  };
  const [products, setProducts] = useState<Products[]>(productList);
  const [productValues, setProductValues] = useState<Products>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [errorsMsg, setErrors] = useState({
    title: "",
    description: "",
    imgUrl: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log(tempColors);

  /** Handlers */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleCancel = () => {
    setProductValues(defaultProduct);
    setErrors({
      title: "",
      description: "",
      imgUrl: "",
      price: "",
      colors: "",
    });
    setTempColors([]);
    closeModal();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductValues({ ...productValues, [name]: value });
    setErrors({
      ...errorsMsg,
      [name]: "",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imgUrl, price, colors } = productValues;
    e.preventDefault();
    const errors = productValidation({
      title,
      description,
      imgUrl,
      price,
      colors,
    });

    const hasError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!hasError) {
      setErrors(errors);
      console.log({ errorsMsg });
      return;
    }

    setProducts((prev) => [
      {
        ...productValues,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProductValues(defaultProduct);
    setTempColors([]);
    closeModal();
  };

  /* Renders */
  const productListCards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const formInputsList = formInputs.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={productValues[input.name]}
        onChange={onChange}
      />
      <ErrMsg msg={errorsMsg[input.name]} />
    </div>
  ));

  const colorsList = colors.map((color) => (
    <CircleColor
      bg={color}
      key={`k-${color}`}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container">
      <Button className="bg-blue-800 hover:bg-blue-900" onClick={openModal}>
        ADD
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 p-6 m-6 rounded-xl">
        {productListCards}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {formInputsList}

          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="space-y-1">
            <div className="flex items-center space-x-2">{colorsList}</div>
            {tempColors.length === 0 && <ErrMsg msg={errorsMsg.colors} />}
          </div>
          <div className="flex flex-wrap items-center">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="p-1 mr-2 mb-2 text-xs rounded-md text-white"
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-blue-800 hover:bg-blue-900">Submit</Button>
            <Button
              type="button"
              className="bg-gray-400 hover:bg-gray-500"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;

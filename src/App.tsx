import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputs, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Products } from "./interfaces";
import { productValidation } from "./validation";
import ErrMsg from "./components/ErrMsg";

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
  const [isOpen, setIsOpen] = useState(false);
  const [errorsMsg, setErrors] = useState({
    title: "",
    description: "",
    imgUrl: "",
    price: "",
  });
  const [productValues, setProductValues] = useState<Products>(defaultProduct);

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
    });
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
    const { title, description, imgUrl, price } = productValues;
    e.preventDefault();
    const errors = productValidation({
      title,
      description,
      imgUrl,
      price,
    });

    const hasError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!hasError) {
      setErrors(errors);
      console.log({ errorsMsg });
      return;
    }

    console.log("no error");
  };

  /* Renders */
  const products = productList.map((product) => (
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

  return (
    <main className="container">
      <Button className="bg-blue-800 hover:bg-blue-900" onClick={openModal}>
        ADD
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 p-6 m-6 rounded-xl">
        {products}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {formInputsList}
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

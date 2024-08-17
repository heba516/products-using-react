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
import { productNameTypes } from "./types";

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
  const [editedProduct, setEditedProduct] = useState<Products>(defaultProduct);
  const [products, setProducts] = useState<Products[]>(productList);
  const [productValues, setProductValues] = useState<Products>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productIndex, setProductIndex] = useState<number>(0);
  const [errorsMsg, setErrors] = useState({
    title: "",
    description: "",
    imgUrl: "",
    price: "",
    colors: "",
  });

  /** Handlers */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openEditModal = () => setEditIsOpen(true);
  const closeEditModal = () => setEditIsOpen(false);
  const closeRemoveModal = () => setRemoveIsOpen(false);
  const openRemoveModal = () => setRemoveIsOpen(true);

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

  // Edit Handlers
  const handleCancelEdit = () => {
    setEditedProduct(defaultProduct);
    setErrors({
      title: "",
      description: "",
      imgUrl: "",
      price: "",
      colors: "",
    });
    setTempColors([]);
    closeEditModal();
  };

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    setErrors({
      ...errorsMsg,
      [name]: "",
    });
  };

  const handleSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imgUrl, price, colors } = editedProduct;
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

    const updatesProducts = [...products];
    updatesProducts[productIndex] = {
      ...editedProduct,
      colors: tempColors.concat(editedProduct.colors),
    };
    setProducts(updatesProducts);
    setEditedProduct(defaultProduct);
    setTempColors([]);
    closeEditModal();
  };

  // Delete Handlers
  const onRemoveProduct = () => {
    const filterd = products.filter(
      (product) => product.id !== editedProduct.id
    );
    setProducts(filterd);
    closeRemoveModal();
  };
  const onCancelRemove = () => {
    closeRemoveModal();
  };

  /* Renders */
  const renderProductCards = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      updateProduct={setEditedProduct}
      openEditModal={openEditModal}
      openRemoveModal={openRemoveModal}
      index={index}
      setIndex={setProductIndex}
    />
  ));

  const renderFormInputs = formInputs.map((input) => (
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

  const renderColors = colors.map((color) => (
    <CircleColor
      bg={color}
      key={`k-${color}`}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (editedProduct.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderEditInputs = (
    id: string,
    label: string,
    name: productNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input
          type="text"
          name={name}
          id="title"
          value={editedProduct[name]}
          onChange={onEdit}
        />
        <ErrMsg msg={errorsMsg[name]} />
      </div>
    );
  };

  return (
    <main className="container">
      <Button
        className="mt-5 bg-blue-800 hover:bg-blue-900"
        onClick={openModal}
      >
        ADD
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 p-6 m-6 rounded-xl">
        {renderProductCards}
      </div>

      {/* Add product modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {renderFormInputs}

          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="space-y-1">
            <div className="flex items-center space-x-2">{renderColors}</div>
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

      {/* Edit Modal */}
      <Modal
        isOpen={editIsOpen}
        closeModal={closeEditModal}
        title="EDIT PRODUCT"
      >
        <form className="space-y-3" onSubmit={handleSubmitEdit}>
          {renderEditInputs("title", "Product Title", "title")}
          {renderEditInputs(
            "description",
            "Product Description",
            "description"
          )}
          {renderEditInputs("imgUrl", "Product Image Url", "imgUrl")}
          {renderEditInputs("price", "Product Price", "price")}
          <SelectMenu
            selected={editedProduct.category}
            setSelected={(value) =>
              setEditedProduct({ ...editedProduct, category: value })
            }
          />

          <div className="space-y-1">
            <div className="flex items-center space-x-2">{renderColors}</div>
          </div>
          <div className="flex flex-wrap items-center">
            {tempColors.concat(editedProduct.colors).map((color) => (
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
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={removeIsOpen}
        closeModal={closeRemoveModal}
        title="Are You Sure You Want to Remove This Product?"
      >
        <p>
          Deleting this product will remove it permanently from your inventory.
          Any associated data, sales history, and other related information will
          also be deleted. Please make sure this is the intended action.
        </p>
        <div className="flex space-x-2 mt-3">
          <Button
            className="bg-red-600  hover:bg-red-700"
            onClick={onRemoveProduct}
          >
            Remove
          </Button>
          <Button
            className="bg-gray-400  hover:bg-gray-500"
            onClick={onCancelRemove}
            type="button"
          >
            CANCEL
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;

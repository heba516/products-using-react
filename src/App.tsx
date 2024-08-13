import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputs, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const products = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const formInputsList = formInputs.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input type={input.type} name={input.name} id={input.id} />
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
        {formInputsList}
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-800 hover:bg-blue-900">Submit</Button>
          <Button
            className="bg-gray-300 hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;

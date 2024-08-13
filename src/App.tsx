import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const products = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 p-6 m-6 rounded-xl">
        {products}
      </div>
    </main>
  );
}

export default App;

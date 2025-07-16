import Product from "../../../../components/SingleProduct/product";

export default function GamePage({ params }: any) {
  return (
    <div>
      <Product id={params.id}></Product>
      {/* Altri dettagli del gioco */}
    </div>
  );
}

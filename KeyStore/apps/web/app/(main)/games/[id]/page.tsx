import Product from "../../../../components/SingleProduct/product";

export default function GamePage({ params }: any) {
  return (
    <div>
      <h1>Game ID: {params.id}</h1>
      <Product></Product>
      {/* Altri dettagli del gioco */}
    </div>
  );
}

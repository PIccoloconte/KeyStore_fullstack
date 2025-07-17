import Product from "../../../../components/SingleProduct/product";

export default function GamePage({ params }: any) {
  return (
    <div className="pt-20">
      <Product id={params.id}></Product>
      {/* Altri dettagli del gioco */}
    </div>
  );
}

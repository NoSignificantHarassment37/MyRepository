type ProductInfoParams = {
  nombre: string;
  precio: number;
};
export default function ProductInfo({ nombre, precio }: ProductInfoParams) {
  return (
    <>
      <p>
        {nombre}, {precio}
      </p>
    </>
  );
}

import CryptoDetails from '../../components/CryptoDetails';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    return { props: { crypto: data } };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return { props: { crypto: null } };
  }
}

export default function CryptoDetailPage({ crypto }) {
  if (!crypto) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold text-red-500">Crypto not found or failed to fetch.</h1>
      </div>
    );
  }

  return <CryptoDetails data={crypto} />;
}

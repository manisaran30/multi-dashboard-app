import Link from "next/link";
export default function CryptoCard({ crypto }) {
  return (
    <Link href={`/crypto/${crypto.id}`}>
      <div className="bg-yellow-100 p-4 rounded-xl shadow hover:shadow-md">
        <h2 className="text-lg font-bold">{crypto.name}</h2>
        <p>Price: ${crypto.price}</p>
        <p>24h Change: {crypto.change}%</p>
        <p>Market Cap: ${crypto.marketCap}</p>
      </div>
    </Link>
  );
}

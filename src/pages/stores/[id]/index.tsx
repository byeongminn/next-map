import { useRouter } from 'next/router';

export default function StorePage() {
  const { query } = useRouter();
  const { id } = query;

  return <div>Store Detail: {id}</div>;
}

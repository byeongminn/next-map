import { useRouter } from 'next/router';

export default function StoreEditPage() {
  const { query } = useRouter();
  const { id } = query;

  return <div>Store Edit: {id}</div>;
}

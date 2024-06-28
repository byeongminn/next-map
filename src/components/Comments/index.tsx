import { useSession } from 'next-auth/react';
import { CommentForm } from './CommentForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CommentApiResponse } from '@/interface';
import { useQuery } from 'react-query';
import { CommentList } from './CommentList';
import { Pagination } from '..';

interface CommentProps {
  storeId: number;
}

export const Comments = ({ storeId }: CommentProps) => {
  const { status } = useSession();
  const router = useRouter();
  const { page = '1' }: { page?: string } = router.query;

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${page}`,
    );

    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}-${page}`,
    fetchComments,
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {/* comment form */}
      {status === 'authenticated' && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      {/* comment list */}
      <CommentList comments={comments} />
      {/* pagination */}
      <Pagination
        total={comments?.totalPage}
        page={page}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
};
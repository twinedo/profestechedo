// usePagination.ts
import {useEffect, useState} from 'react';
import {_useAxios} from './useAxios';

export interface IUsersList {
  id: string;
  username: null;
  email: string;
  phone_number: null;
  is_verified: boolean;
  last_login: string;
  profile: Profile;
  avatar: null;
}

export interface Profile {
  code: string;
  full_name: string;
  avatar: null;
}

interface PaginatedResponse {
  data: IUsersList[];
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  message: string;
  success: string;
  error: string;
}

type IParams = {
  initialPage?: number;
  pageSize?: number;
  search?: string;
};

const usePagination = (props: IParams) => {
  const {initialPage = 1, pageSize = 10, search = ''} = props;
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<IUsersList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, pageSize, search]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await _useAxios({
        url: '/users/get-list',
        method: 'get',
        params: {
          page,
          page_size: pageSize,
          search,
        },
      });
      const resData = response?.data as PaginatedResponse;
      setData(resData.data);
      setTotalPages(Math.ceil(resData.count / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const refetch = () => {
    // Trigger a manual refetch for the current page by re-setting the page number
    fetchData();
  };

  return {
    data,
    totalPages,
    currentPage: page,
    goToNextPage,
    goToPreviousPage,
    refetch,
    isLoading,
    error,
  };
};

export default usePagination;

import { ref, watch, onMounted, Ref } from '@vue/composition-api';
import axios, { CancelToken } from 'axios';

export interface Position {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}

export interface Params {
  description?: string;
  location?: string;
  lat?: number;
  long?: number;
  full_time?: boolean;
}

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

export function useFetchJobs(params: Ref<Params>, page: Ref<number>) {
  const loading = ref(true);
  const error = ref(null);
  const jobs = ref<Position[]>([]);
  const hasNextPage = ref(false);

  let fetchCancelToken: CancelToken | undefined;
  let nextPageCancelToken: CancelToken | undefined;

  const fetchJobs = async () => {
    loading.value = true;
    hasNextPage.value = false;
    jobs.value = [];
    try {
      const mainRequest = axios.get<Position[]>(BASE_URL, {
        cancelToken: fetchCancelToken,
        params: {
          markdown: true,
          page: page.value,
          ...params.value,
        },
      });

      // Check if there are more items
      const checkNextPageRequest = axios.get<Position[]>(BASE_URL, {
        cancelToken: nextPageCancelToken,
        params: {
          markdown: true,
          page: page.value + 1,
          ...params.value,
        },
      });

      const [{ data }, { data: nextItems }] = await Promise.all([
        mainRequest,
        checkNextPageRequest,
      ]);

      jobs.value = data;
      hasNextPage.value = nextItems.length !== 0;
    } catch (e) {
      if (axios.isCancel(e)) return;
      error.value = e;
    }

    loading.value = false;
  };

  onMounted(() => {
    fetchJobs();
  });

  watch([params, page], (_oldVal, _newVal, onInvalidate) => {
    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();
    fetchCancelToken = cancelToken1.token;
    nextPageCancelToken = cancelToken2.token;

    fetchJobs();

    onInvalidate(() => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    });
  });

  return {
    jobs,
    loading,
    error,
    hasNextPage,
  };
}

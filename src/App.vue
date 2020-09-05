<template>
  <b-container class="my-4">
    <h1 class="mb-4">GitHub Jobs</h1>
    <search-form @params-change="handleParamsChange" />
    <jobs-pagination :page="page" :hasNextPage="hasNextPage" @page-update="pageUpdate" />
    <h1 v-if="loading">Loading...</h1>
    <job v-for="job in jobs" :key="job.id" :job="job" />
    <jobs-pagination :page="page" :hasNextPage="hasNextPage" @page-update="pageUpdate" />
  </b-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { Params, useFetchJobs } from './useFetchJobs';
import Job from './components/Job.vue';
import JobsPagination from './components/JobsPagination.vue';
import SearchForm from './components/SearchForm.vue';

export default defineComponent({
  components: {
    Job,
    JobsPagination,
    SearchForm,
  },
  setup() {
    const page = ref(1);
    const params = ref<Params>({});
    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

    const pageUpdate = (val: number) => {
      page.value = val;
    };

    const handleParamsChange = (val: Params) => {
      params.value = {
        ...params.value,
        ...val,
      };
    };

    return {
      page,
      params,
      jobs,
      loading,
      error,
      hasNextPage,
      pageUpdate,
      handleParamsChange,
    };
  },
});
</script>

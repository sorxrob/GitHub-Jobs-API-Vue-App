<template>
  <b-pagination
    class="mt-4"
    :value="page"
    aria-controls="jobs-table"
    :per-page="perPage"
    :total-rows="totalRows"
    :hide-goto-end-buttons="true"
    @change="(pageNo) => $emit('page-update', pageNo)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    page: {
      required: true,
      type: Number,
      default: 1,
    },
    hasNextPage: {
      required: true,
      type: Boolean,
    },
  },
  setup(props) {
    const perPage = ref(50);

    const totalRows = computed(() => props.page * 50 + (props.hasNextPage ? 50 : 0));

    return {
      perPage,
      totalRows,
    };
  },
});
</script>

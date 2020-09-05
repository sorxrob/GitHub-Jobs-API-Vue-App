<template>
  <b-card class="mb-3">
    <b-card-body>
      <div class="d-flex justify-content-between">
        <div>
          <b-card-title>
            {{ job.title }} -
            <span class="text-muted font-weight-light">{{ job.company }}</span>
          </b-card-title>
          <b-card-sub-title class="text-muted mb-2">{{
            new Date(job.created_at).toLocaleDateString()
          }}</b-card-sub-title>
          <b-badge variant="secondary" v-text="job.type"></b-badge>
          <b-badge class="ml-2" variant="secondary" v-text="job.location"></b-badge>
          <div style="word-break: break-all;">
            <vue-simple-markdown :source="job.how_to_apply"></vue-simple-markdown>
          </div>
        </div>
        <img class="d-none d-md-block" height="50" :src="job.company_logo" :alt="job.company" />
      </div>
      <b-card-text>
        <b-button class="mt-3" @click="open = !open" variant="primary">{{
          open ? 'Hide Details' : 'View Details'
        }}</b-button>
      </b-card-text>
      <b-collapse v-model="open" class="mt-4">
        <vue-simple-markdown :source="job.description"></vue-simple-markdown>
      </b-collapse>
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { Position } from '../useFetchJobs';

export default defineComponent({
  props: {
    job: Object as () => Position,
  },
  setup() {
    const open = ref(false);

    return {
      open,
    };
  },
});
</script>

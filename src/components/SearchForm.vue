<template>
  <b-form>
    <b-form-row class="align-items-end">
      <b-col>
        <b-form-group label="Description">
          <b-form-input
            trim
            name="description"
            v-model="params.description"
            debounce="500"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Location">
          <b-form-input
            trim
            name="location"
            v-model="params.location"
            debounce="500"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="ml-2">
        <b-form-group>
          <b-form-checkbox trim class="mb-2" v-model="params.full_time" name="full_time"
            >Only Full Time</b-form-checkbox
          >
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';

import { Params } from '@/useFetchJobs';

export default defineComponent({
  setup(_props, ctx) {
    const params = ref<Params>({
      description: '',
      location: '',
      // eslint-disable-next-line @typescript-eslint/camelcase
      full_time: false,
    });

    watch(
      params,
      (_, newVal) => {
        ctx.emit('params-change', newVal);
      },
      {
        deep: true,
      },
    );

    return {
      params,
    };
  },
});
</script>

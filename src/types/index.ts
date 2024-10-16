export interface EosResponse {
    actions: {
      action_trace: {
        trx_id: string;
        block_time: string;
        block_num: number;
      };
    }[];
  }
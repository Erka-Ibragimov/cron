import axios from "axios";
import { Action } from "./model";
import https from "https";

interface EosResponse {
  actions: {
    action_trace: {
      trx_id: string;
      block_time: string;
      block_num: number;
    };
  }[];
}

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const axiosInstance = axios.create({ httpsAgent });

export const fetchEosActions = async () => {
  try {
    const response = await axiosInstance.post<EosResponse>(
      "https://eos.greymass.com/v1/history/get_actions",
      {
        account_name: "eosio",
        pos: -1,
        offset: -100,
      }
    );

    const actions = response.data.actions;

    for (const action of actions) {
      const { trx_id, block_time, block_num } = action.action_trace;

      await Action.findOneAndUpdate(
        { trx_id },
        { block_time, block_num },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Error fetching EOS actions:", error);
  }
};

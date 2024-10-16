import * as dotenv from "dotenv";
import axios from "axios";
import { Action } from "../entity/model";
import https from "https";
import { EosResponse } from "../types";

dotenv.config();

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const axiosInstance = axios.create({ httpsAgent });

export const fetchEosActions = async (): Promise<void> => {
  const eosUrl = process.env.EOS_URL!;

  try {
    const response = await axiosInstance.post<EosResponse>(eosUrl, {
      account_name: "eosio",
      pos: -1,
      offset: -100,
    });

    const actions = response.data.actions;

    if (!actions || actions.length === 0) return;

    const bulkOps = actions.map((action) => {
      const { trx_id, block_time, block_num } = action.action_trace;

      return {
        updateOne: {
          filter: { trx_id },
          update: { block_time, block_num },
          upsert: true,
        },
      };
    });

    if (bulkOps.length > 0) {
      await Action.bulkWrite(bulkOps);
    }
  } catch (error) {
    console.error("Ошибка при получении действий EOS:", error);
  }
};

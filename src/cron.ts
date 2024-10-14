import cron from 'node-cron';
import { fetchEosActions } from './service';

export const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Running cron job...');
    await fetchEosActions();
  });
};

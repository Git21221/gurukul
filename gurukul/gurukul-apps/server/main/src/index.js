import { connectionDB } from '@gurukul/shared-server';
import { app } from './app.js';

const PORT = process.env.PORT || 3000;

connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});
import app from './src/app/app.js';

const PORT = process.env.POT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
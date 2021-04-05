import app from './app';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Callmap API listening at http://localhost:${PORT}`);
});
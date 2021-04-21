import App from './app';

const PORT = process.env.PORT || 3000;
const app = new App().app;

app.listen(PORT, () => {
    console.log(`Callmap API running at http://localhost:${PORT}`);
});
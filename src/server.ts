import App from './app';

const PORT = 8080;
const app = new App().app;

app.listen(PORT, () => {
    console.log(`Callmap API running at http://localhost:${PORT}`);
});
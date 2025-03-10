import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        supportFile: "cypress/support/component.tsx",
    },
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: "http://localhost:3000"
    },
});

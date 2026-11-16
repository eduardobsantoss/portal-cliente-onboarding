// vite.config.ts
import tailwindcss from "file:///C:/Users/eduardo.santos/dev/portal-cliente-onboarding/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///C:/Users/eduardo.santos/dev/portal-cliente-onboarding/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/eduardo.santos/dev/portal-cliente-onboarding/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\eduardo.santos\\dev\\portal-cliente-onboarding";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      port: 3e3,
      host: "0.0.0.0",
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlZHVhcmRvLnNhbnRvc1xcXFxkZXZcXFxccG9ydGFsLWNsaWVudGUtb25ib2FyZGluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZWR1YXJkby5zYW50b3NcXFxcZGV2XFxcXHBvcnRhbC1jbGllbnRlLW9uYm9hcmRpbmdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2VkdWFyZG8uc2FudG9zL2Rldi9wb3J0YWwtY2xpZW50ZS1vbmJvYXJkaW5nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7ZGVmaW5lQ29uZmlnLCBsb2FkRW52fSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7bW9kZX0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCAnLicsICcnKTtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgLy8gSE1SIGlzIGRpc2FibGVkIGluIEFJIFN0dWRpbyB2aWEgRElTQUJMRV9ITVIgZW52IHZhci5cbiAgICAgIC8vIERvIG5vdCBtb2RpZnlcdTAwRTJcdTAwODBcdTAwOTRmaWxlIHdhdGNoaW5nIGlzIGRpc2FibGVkIHRvIHByZXZlbnQgZmxpY2tlcmluZyBkdXJpbmcgYWdlbnQgZWRpdHMuXG4gICAgICBobXI6IHByb2Nlc3MuZW52LkRJU0FCTEVfSE1SICE9PSAndHJ1ZScsXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixPQUFPLGlCQUFpQjtBQUNuWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVEsY0FBYyxlQUFjO0FBSHBDLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUMsS0FBSSxNQUFNO0FBQ3RDLFFBQU0sTUFBTSxRQUFRLE1BQU0sS0FBSyxFQUFFO0FBQ2pDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQUEsSUFDaEMsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUdOLEtBQUssUUFBUSxJQUFJLGdCQUFnQjtBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

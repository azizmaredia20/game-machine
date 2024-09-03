// vite.config.ts
import { defineConfig } from "file:///Users/azizmaredia/Documents/code/JScode/game-machine/node_modules/vite/dist/node/index.js";
import react from "file:///Users/azizmaredia/Documents/code/JScode/game-machine/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/azizmaredia/Documents/code/JScode/game-machine";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  ssr: {
    noExternal: ["react-helmet-async"]
  },
  resolve: {
    alias: {
      "@assets": path.join(__vite_injected_original_dirname, "./src/assets"),
      "@public": path.join(__vite_injected_original_dirname, "./public"),
      "@core": path.join(__vite_injected_original_dirname, "./src/core"),
      "@screens": path.join(__vite_injected_original_dirname, "./src/screens"),
      "@components": path.join(__vite_injected_original_dirname, "./src/components"),
      "@utils": path.join(__vite_injected_original_dirname, "./src/utils"),
      "@hooks": path.join(__vite_injected_original_dirname, "./src/hooks"),
      "@lib": path.join(__vite_injected_original_dirname, "./src/lib"),
      "@types": path.join(__vite_injected_original_dirname, "./src/types"),
      "@client": path.join(__vite_injected_original_dirname, "./src"),
      "@server": path.join(__vite_injected_original_dirname, "./server"),
      "@loaders": path.join(__vite_injected_original_dirname, "./src/loaders")
    }
  },
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: `@import "./src/assets/styles/Global.scss";`,
      // },
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXppem1hcmVkaWEvRG9jdW1lbnRzL2NvZGUvSlNjb2RlL2dhbWUtbWFjaGluZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2F6aXptYXJlZGlhL0RvY3VtZW50cy9jb2RlL0pTY29kZS9nYW1lLW1hY2hpbmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2F6aXptYXJlZGlhL0RvY3VtZW50cy9jb2RlL0pTY29kZS9nYW1lLW1hY2hpbmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpXG4gIF0sXG4gIHNzcjoge1xuICAgIG5vRXh0ZXJuYWw6IFsncmVhY3QtaGVsbWV0LWFzeW5jJ10sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0Bhc3NldHMnOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzJyksXG4gICAgICAnQHB1YmxpYyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3B1YmxpYycpLFxuICAgICAgJ0Bjb3JlJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2NvcmUnKSxcbiAgICAgICdAc2NyZWVucyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9zY3JlZW5zJyksXG4gICAgICAnQGNvbXBvbmVudHMnOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpLFxuICAgICAgJ0B1dGlscyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgICAgJ0Bob29rcyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpLFxuICAgICAgJ0BsaWInOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvbGliJyksXG4gICAgICAnQHR5cGVzJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL3R5cGVzJyksXG4gICAgICAnQGNsaWVudCc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgJ0BzZXJ2ZXInOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zZXJ2ZXInKSxcbiAgICAgICdAbG9hZGVycyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9sb2FkZXJzJyksXG4gICAgfVxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAvLyBzY3NzOiB7XG4gICAgICAvLyAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zdHlsZXMvR2xvYmFsLnNjc3NcIjtgLFxuICAgICAgLy8gfSxcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixTQUFTLG9CQUFvQjtBQUM5VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxZQUFZLENBQUMsb0JBQW9CO0FBQUEsRUFDbkM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFdBQVcsS0FBSyxLQUFLLGtDQUFXLGNBQWM7QUFBQSxNQUM5QyxXQUFXLEtBQUssS0FBSyxrQ0FBVyxVQUFVO0FBQUEsTUFDMUMsU0FBUyxLQUFLLEtBQUssa0NBQVcsWUFBWTtBQUFBLE1BQzFDLFlBQVksS0FBSyxLQUFLLGtDQUFXLGVBQWU7QUFBQSxNQUNoRCxlQUFlLEtBQUssS0FBSyxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN0RCxVQUFVLEtBQUssS0FBSyxrQ0FBVyxhQUFhO0FBQUEsTUFDNUMsVUFBVSxLQUFLLEtBQUssa0NBQVcsYUFBYTtBQUFBLE1BQzVDLFFBQVEsS0FBSyxLQUFLLGtDQUFXLFdBQVc7QUFBQSxNQUN4QyxVQUFVLEtBQUssS0FBSyxrQ0FBVyxhQUFhO0FBQUEsTUFDNUMsV0FBVyxLQUFLLEtBQUssa0NBQVcsT0FBTztBQUFBLE1BQ3ZDLFdBQVcsS0FBSyxLQUFLLGtDQUFXLFVBQVU7QUFBQSxNQUMxQyxZQUFZLEtBQUssS0FBSyxrQ0FBVyxlQUFlO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlyQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

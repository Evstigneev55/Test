import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: '/src/pages/to-do/components/',
      controllers: '/src/pages/to-do/controllers/',
      styles: '/src/pages/to-do/styles/'
		},
	},
});

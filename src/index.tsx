import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import routes from '@core/routes'
import StoreContextProvider from '@core/contexts/StoreContext'

const router = createBrowserRouter(routes);

const context = {}

ReactDOM.hydrateRoot(
	document.getElementById("app") as HTMLElement,
	<HelmetProvider context={context}>
		<StoreContextProvider>
			<App>
				<RouterProvider router={router} fallbackElement={null} />
			</App>
		</StoreContextProvider>
	</HelmetProvider>
)

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import routes from '@core/routes'
import AppContextProvider from '@core/contexts/AppContext'

const router = createBrowserRouter(routes);

const context = {}

ReactDOM.hydrateRoot(
	document.getElementById("app") as HTMLElement,
	<HelmetProvider context={context}>
		<AppContextProvider>
			<App>
				<RouterProvider router={router} fallbackElement={null} />
			</App>
		</AppContextProvider>
	</HelmetProvider>
)

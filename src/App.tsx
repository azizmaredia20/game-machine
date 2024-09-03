import { Helmet } from 'react-helmet-async'
import HelmetProvider from '@core/contexts/HelmetContext'
import { BUSINESS_NAME } from './config'

function App(props: any) {

	return (
		<>
			<Helmet>
				<title>{ BUSINESS_NAME }</title>
			</Helmet>

			<HelmetProvider>
				{props.children}
			</HelmetProvider>
		</>
	)
}

export default App

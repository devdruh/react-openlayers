import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Index';
import Home from './pages/Home';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<Home />} />
					{/* <Route path='data-and-map' element={<DataAndMap />}>
						<Route path='filter/:year?/:month?' element={<ErrorBoundary />} />
					</Route>
					<Route path='about' element={<About/>} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
  	);
}

export default App;

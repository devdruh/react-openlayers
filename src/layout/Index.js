import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DarkThemeProvider } from '../components/DarkThemeContext'

const Index = () => {
    return (
        <DarkThemeProvider>
            <div className="dark:bg-slate-900 bg-gray-100">
                <Navbar />
                <div className='h-16'></div>
                <Outlet />
                <Footer />
            </div>
        </DarkThemeProvider>
    )
}

export default Index
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Index = () => {
    return (
        <div className="dark:bg-slate-900">
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Index
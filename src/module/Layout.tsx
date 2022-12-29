import Style from './LayoutStyle.module.css'
import GlobalNav from './GlobalNav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return <>
        <div className={Style.header}>
            <div className={Style["header-top"]}>
                <header>Contact Manager</header>
            </div>
            <div className={Style["header-bottom"]}>
                <input className={Style["searchbar"]} type="text" placeholder='Search' />
                <GlobalNav />
            </div>
        </div>

        <section className={Style["content-section"]}>
            <main className={Style["main-content"]}>
                <Outlet />
            </main>
        </section>

    <ToastContainer />

    </>
}

export default Layout
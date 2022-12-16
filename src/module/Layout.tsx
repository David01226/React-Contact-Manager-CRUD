import Style from './LayoutStyle.module.css'
import GlobalNav from './GlobalNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return <>
        <article className={Style.header}>
            <header>
            Welcome !
            </header>
        </article>

        <section className={Style["content-section"]}>
            <GlobalNav />
            <main>
                <Outlet />
            </main>
        </section>
    </>
}

export default Layout
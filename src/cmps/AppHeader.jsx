import Logo from '../img/svg/logo.svg'

export function AppHeader() {
    return (
        <header className="app-header">
            <div className="logo-container">
                <a href="/">
                    <img
                        className="logo"
                        src={Logo}
                        alt="logo"
                        title="Instagram"
                    />
                </a>
            </div>
        </header>
    )
}

// Updated color constants
const bgGradient = 'bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200'
const bgButtonHover = 'hover:bg-blue-800/20'

// Example menu options
const menuOptions = [
    { to: '/main-page', children: 'Main page', key: 'MenuLinkButton1' },
    { to: '/counter', children: 'Counter', key: 'MenuLinkButton3' },
]

function MenuMobile({ key = 'MenuMobile' } = {}) {
    const { useRef, useRegisterCallbackOnELement } = useRegisterComponent(key)
    const isOpenRef = useRef(false)
    const menuId = "hamburguer-menu"

    const handleToogleMenu = () => {
        isOpenRef.current = !isOpenRef.current
        
        if (isOpenRef.current) {
            document.getElementById(menuId).classList.remove('is-closed')
            document.getElementById(menuId).classList.add('is-open')
            return
        }

        document.getElementById(menuId).classList.remove('is-open')
        document.getElementById(menuId).classList.add('is-closed')
    }

    const handleClickMenuHamburger = useRegisterCallbackOnELement(handleToogleMenu)
    const handleClickMenuBackdrop = useRegisterCallbackOnELement(handleToogleMenu)
    const handleClickCloseMenu = useRegisterCallbackOnELement(handleToogleMenu)

    return (
        html`
            <div id="${menuId}" class="flex flex-row group ${isOpenRef.current ? 'is-open' : 'is-closed'} ${bgGradient}">
                <div
                    class="border border-blue-500/60 rounded m-3 p-1 hover:cursor-pointer ${bgButtonHover}"
                    onclick=${handleClickMenuHamburger}
                >
                    ${HamburgerIcon({ size: '32px' })}
                </div>
                <div
                    class="
                        fixed top-0 left-0 w-full h-full bg-blue-900/50 z-10 transition-opacity duration-300
                        opacity-0
                        group-[.is-open]:opacity-100
                        group-[.is-open]:translate-x-0
                        group-[.is-closed]:-translate-x-full
                    "
                    onclick=${handleClickMenuBackdrop}
                ></div>
                <div
                    class="
                        ${bgGradient}
                        fixed top-0 left-0 w-3/4 h-full bg-white z-20 flex flex-col transition-transform duration-300
                        group-[.is-open]:translate-x-0
                        group-[.is-closed]:-translate-x-full
                    "
                >
                    <div class="flex flex-row m-4 items-center">
                        <h1 class="text-xl font-bold">
                            React clone
                        </h1>
                        <div class="flex flex-1 justify-end">
                            <div
                                class="border border-blue-500/60 rounded p-1 hover:cursor-pointer ${bgButtonHover}"
                                onclick=${handleClickCloseMenu}
                            >
                                ${CloseIcon({ size: '32px' })}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-4 p-4 pt-1 flex-1">
                        ${menuOptions.map((option) => MenuLinkButton({ ...option, key: option.key + '-mobile', onClick: handleToogleMenu }))}
                    </div>
                </div>
            </div>
        `
    )
}

function MenuLinkButton({ key, to, children, onClick, showBorder = false }) {
    const { useRegisterCallbackOnELement } = useRegisterComponent(key)
    const { setCurrentPage } = usePageHistoryStore()

    const handleClick = useRegisterCallbackOnELement((e) => {
        e.preventDefault()

        setCurrentPage(to)
        onClick?.()
    })

    return (
        html`
            <a
                href="${to}"
                class="
                    ${bgButtonHover}
                    rounded
                    px-3
                    py-2
                    non-draggable
                    ${showBorder && 'border border-blue-500'}
                "
                onclick=${handleClick}
            >
                ${children}
            </a>
        `
    )
}

function MenuDesktop() {
    return (
        html`
            <div class="flex flex-row p-4 items-center ${bgGradient}">
                <h1 class="text-xl font-bold">
                    React clone
                </h1>
                <div class="flex flex-row flex-1 justify-center gap-x-8 font-bold items-center">
                    ${menuOptions.map((option) => MenuLinkButton({ ...option, key: option.key + '-desktop' }))}
                </div>
            </div>
        `
    )
}

function Menu() {
    return (
        html`
            <div>
                <div class="sm:hidden">
                    ${MenuMobile()}
                </div>
                <div class="hidden sm:block">
                    ${MenuDesktop()}
                </div>
            </div>
        `
    )
}

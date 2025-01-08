const usePageHistoryStore = createStore((set) => ({
    currentPage: '/main-page',
    data: null,
    setCurrentPage: (currentPage, data = null) => set({ currentPage, data }),
}))

function App() {
    const { currentPage } = usePageHistoryStore()

    return html`
        <div>
            ${Menu()}
            ${currentPage === '/main-page' && MainPage()}
            ${currentPage === '/counter' && CounterPage()}
        </div>
    `
}

render(document.getElementById('root'), App)

function CounterPage({ key = 'CounterPage' } = {}) {
    const { useState, useRegisterCallbackOnELement } = useRegisterComponent(key)

    const [count, setCount] = useState(0)

    const handleIncrement = useRegisterCallbackOnELement(() => {
        setCount((prev) => prev + 1)
    })

    const handleDecrement = useRegisterCallbackOnELement(() => {
        setCount((prev) => prev - 1)
    })

    return html`
        <div class="flex flex-1 items-center justify-center">
            <div class="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg mt-20">
                <h2 class="text-3xl font-bold mb-4 text-blue-600">Counter</h2>
                
                <p class="text-2xl mb-6 font-semibold">${count}</p>
                
                <div class="flex space-x-4">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1"
                        onclick=${handleIncrement}
                    >
                        Increment
                    </button>
                    <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1"
                        onclick=${handleDecrement}
                    >
                        Decrement
                    </button>
                </div>
            </div>
        </div>
    `;
}

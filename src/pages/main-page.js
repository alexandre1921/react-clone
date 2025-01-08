function WelcomeTitle() {
    return html`
        <h1 class="text-4xl font-bold mb-4 text-blue-700">
            Welcome!
        </h1>
    `;
}

function ExplanationText() {
    return html`
        <p class="text-gray-700 text-lg mb-4">
            This is a simple clone of React, created to demonstrate
            how a simple component-based structure can work in JavaScript.
            We've also added a small clock to show an example of running
            live JavaScript logic in this environment.
        </p>
    `;
}

function FeaturesList() {
    return html`
        <ul class="list-disc list-inside text-left text-gray-700 mx-auto max-w-lg mt-6">
            <li>Basic component system</li>
            <li>Router for page transitions</li>
            <li>Flexible way to include JS logic inside each component</li>
        </ul>
    `;
}

function Clock({ key = 'Clock' } = {}) {
    const { useState, useEffect } = useRegisterComponent(key)

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return html`
        <div class="mt-4">
            <span class="block text-gray-600 text-xl">
                Current Time:
            </span>
            <span class="block text-2xl font-mono font-semibold text-blue-700">
                ${time.toLocaleTimeString()}
            </span>
        </div>
    `;
}

function MainPage({ key = 'MainPage' } = {}) {
    useRegisterComponent(key)

    return html`
        <div class="mt-20 bg-gradient-to-br flex items-center justify-center p-6">
            <div class="w-full max-w-3xl bg-white rounded-lg p-8 text-center">
                ${WelcomeTitle()}
                ${ExplanationText()}
                ${Clock()}
                ${FeaturesList()}
            </div>
        </div>
    `;
}

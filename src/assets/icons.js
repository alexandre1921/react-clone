function WithIconWrapper(Icon) {
    return function IconWrapper({ className = 'fill-black', size = '24px' }) {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" height="${size}" viewBox="0 -960 960 960" width="${size}" class="${className}">
                ${Icon()}
            </svg>
        `
    }
}

const CloseIcon = WithIconWrapper(function CloseIcon() {
    return html`<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>`
})

const HamburgerIcon = WithIconWrapper(function HamburgerIcon() {
    return html`<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>`
})

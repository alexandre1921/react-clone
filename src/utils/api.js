const callbacks = []
let cleanups = []
const cleanupsToExecute = []
const refs = new Map()

function processNewDataOrCallback(dataOrCallback, parameters) {
    if (typeof dataOrCallback === 'function') {
        return dataOrCallback(parameters)
    }

    return dataOrCallback
}

function executeEffects() {
    cleanups.push(
        ...callbacks
            .map(({ callback, hookId }) => ({ cleanup: callback?.(), hookId }))
            .filter(({ cleanup }) => !!cleanup)
    )
    callbacks.length = 0
}

function executeCleanups() {
    cleanups
        .filter(({ hookId }) => cleanupsToExecute.some(id => id === hookId))
        .forEach(({ cleanup }) => cleanup())
    cleanups = cleanups.filter(({ hookId }) => !cleanupsToExecute.some(id => id === hookId))
}

function genKey() {
    return Math.random().toString(36)
}

function useRef(key, initialValue) {
    const ref = refs.get(key) ?? { current: processNewDataOrCallback(initialValue) }

    !refs.has(key) && refs.set(key, ref)

    return ref
}

function useState(key, initialValue) {
    const ref = useRef(key, initialValue)

    function setValue(newState) {
        ref.current = processNewDataOrCallback(newState, ref.current)
        batchedRender(document.getElementById('root'), App)
    }

    return [ref.current, setValue]
}

function useRegisterCallbackOnELement(useEffect, useRef, key, callback) {
    const eventId = useRef(genKey()).current

    useEffect(() => {
        const lastNode = document.getElementById(key)

        if (!lastNode) return

        const regexToGetEvent = /\bon(\w+)="f-[0-9a-z.]+"/;
        const matches = lastNode.outerHTML.match(regexToGetEvent)

        if (!matches) return

        const event = matches[0].replace(regexToGetEvent, '$1');

        lastNode.outerHTML = lastNode.outerHTML.replace(new RegExp(` on${event}="f-${eventId}+"`), '')

        const currentNode = document.getElementById(key)

        currentNode.addEventListener(event, callback)

        return () => {
            currentNode.removeEventListener(event, callback)
        }
    })

    return `"f-${eventId}" id="${key}"`
}

function useInput(useRegisterCallbackOnELement, useRef, callback) {
    const elementId = useRef(genKey()).current
    const handleKeyDown = useRegisterCallbackOnELement(callback, elementId)
    const handleKeyUp = useRegisterCallbackOnELement(callback, elementId)

    return `onkeydown=${handleKeyDown} onkeyup=${handleKeyUp}`
}

function useEffect(key, callback, deps) {
    const depsRef = useRef(key, { isFirstRender: true, deps })

    if (depsRef.current.isFirstRender) {
        callbacks.push({ callback, hookId: key })
        depsRef.current.isFirstRender = false
        return
    }

    const hasNoDeps = !deps
    const hasChangedDeps = !!deps && depsRef.current.deps.some((dep, i) => dep !== deps[i])

    if (hasNoDeps || hasChangedDeps) {
        cleanupsToExecute.push(key)
        callbacks.push({ callback, hookId: key })
        return
    }
}

function useRegisterComponent(key) {
    let hookIndex = 0;

    return {
        useState: (initialState) => useState(key + hookIndex++, initialState),
        useEffect: (callback, deps) => useEffect(key + hookIndex++, callback, deps),
        useRef: (initialValue) => useRef(key + hookIndex++, initialValue),
        useRegisterCallbackOnELement: (callback, optionalKey) => useRegisterCallbackOnELement(
            (callback, deps) => useEffect(key + hookIndex++, callback, deps),
            (initialValue) => useRef(key + hookIndex++, initialValue),
            optionalKey ?? key + hookIndex++,
            callback
        ),
        useInput: (callback) => useInput(
            (callback, optionalKey) => useRegisterCallbackOnELement(
                (callback, deps) => useEffect(key + hookIndex++, callback, deps),
                (initialValue) => useRef(key + hookIndex++, initialValue),
                optionalKey ?? key + hookIndex++,
                callback
            ),
            (initialValue) => useRef(key + hookIndex++, initialValue),
            callback
        ),
    }
}

let wasRenderedOnce = false

function render(root, App) {
    if (wasRenderedOnce) {
        executeCleanups()
    }

    wasRenderedOnce = true

    root.innerHTML = App()()
    executeEffects()
}

function batchedRender(root, App) {
    return new Promise(r => setTimeout(r, 10))
        .then(() => render(root, App))
}

function createStore(initialState) {
    let state = initialState(setState, getState)

    function setState(newState) {
        state = { ...state, ...processNewDataOrCallback(newState, state) }
        batchedRender(document.getElementById('root'), App)
    }

    function getState() {
        return state
    }

    function listener() {
        return state
    }

    listener.setState = setState
    listener.getState = getState

    return listener
}

function treatPossibleFalseKey(key) {
    if (key === false) return ''

    return key
}

function treatPossibleArrayFunctionKey(key) {
    const isKeyArray = Array.isArray(key)

    if (!isKeyArray) return treatPossibleFalseKey(key)

    const componentsJoined = key.map(component => component()).join('')

    return componentsJoined
}

function treatPossibleFunctionKey(key) {
    const isKeyFunction = typeof key === 'function'

    if (isKeyFunction) {
        return key()
    }

    return treatPossibleArrayFunctionKey(key)
}

function html(strings, ...keys) {
    return (...values) => {
        const firstString = strings[0]
        const lastValue = values[values.length - 1]
        const stringPieces = keys.flatMap((key, i) => [
                lastValue?.[key] ?? treatPossibleFunctionKey(key),
                strings[i + 1],
        ])
        const finalString = [
          firstString,
          ...stringPieces,
        ].join('')
        return finalString
    }
}

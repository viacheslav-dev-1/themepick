/* PUBLIC */

/**
 * Inits the set of defined themes. It should be used at the start of application
 * @param {{ themeName: { ref: string, cssVariableName: string }}} themesObject Themes object with css variables represents the set of themes
 * @param {string} defaultTheme Default theme name that will be choosen during initialization. If defaultTheme is undefined, theme manager will pick the first from themes object
 * @param { {key: string, storage: string}} saveOption If this parameter is not undefined - it's used to set applied theme name to the local or session storage
*/
export function initThemes(themesObject, defaultTheme, saveOption) {
    if (themesObject === null || themesObject === undefined) {
        console.warn(`Themes object cannot be null or undefined and must contains at least one theme object`)
        return
    }

    _saveOption = saveOption
    _themes = themesObject

    const defaultT = getStorage()?.getItem(_saveOption.key) ?? defaultTheme
    applyTheme(defaultT ?? _themes[0])
}


/**
 * Provides the ability to dynamically add a new theme to existing ones. Theme name should be unique and theme object can not be empty, otherwise an error will be thrown
 * @param {string} name Theme name
 * @param {{ ref: string, cssVariableName: string }} themeObject Theme object with css variables
 */
export function addTheme(name, themeObject) {
    if (isBlank(name)) {
        console.warn('Theme name cannot be empty')
        return
    }

    if (Object.keys(_themes).findIndex(k => k === name) > -1) {
        console.warn(`Theme with name '${name}' already exist`)
        return
    }

    if (themeObject === undefined || themeObject === null) {
        console.warn('Theme object cannot be null or undefined')
        return
    }

    _themes[name] = themeObject
}


/**
 * Applies choosen theme to application.
 * @param {string | {ref: string, cssVariableName: string}} themeObjOrName Theme name or object with css variables
 */
export function applyTheme(themeObjOrName) {
    if (themeObjOrName === undefined || themeObjOrName === null) {
        console.warn('Theme Object or Theme name cannot be null or undefined')
        return
    }

    let themeToApply = undefined
    if (typeof themeObjOrName === 'string') {
        themeToApply = _themes[themeObjOrName]
        if (themeToApply === undefined || themeToApply === null) {
            console.warn(`Theme with name '${themeObjOrName}' does not exist.`)
            return
        }
    } else {
        themeToApply = themeObjOrName
    }

    const root = document.querySelector(':root')
    Object.entries(themeToApply).forEach(it => {
        if (it[0] === 'ref') {
            const refTheme = _themes[it[1]]
            if (!refTheme) {
                console.warn(`Cannot apply theme values by reference because theme '${it[0]}' does not exist`)
            } else {
                Object.entries(refTheme).forEach(it2 => {
                    root.style.setProperty(it2[0], it2[1])
                })
            }
        } else {
            root.style.setProperty(it[0], it[1])
        }
    })

    if (typeof themeObjOrName === 'string') {
        const storage = getStorage()
        storage && storage.setItem(_saveOption.key, themeObjOrName)
    }
}


/**
 * Returns the theme object that was saved to theme manager while initialization
 * @param {string} name Theme name
 * @returns {{ref: string, cssVariableName: string}} Theme object
 */
export function getTheme(name) {
    if (isBlank(name)) {
        console.warn('Theme name cannot be empty')
        return
    }

    return _themes[name]
}


/**
 * Returns the current value of CSS Variable by name
 * @param {string} name CSS Variable name
 * @returns {string} CSS Variable value
 */
export function getVarValue(name) {
    if (isBlank(name)) {
        console.warn('CSS Variable name cannot be empty')
        return
    }

    const styles = getComputedStyle(document.querySelector(':root'));
    return styles.getPropertyValue(name);
}

/**
 * Sets the value to CSS Variable
 * @param {string} name CSS Variable name
 * @param {string} value CSS Variable value
 */
export function setVarValue(name, value) {
    if (isBlank(name)) {
        console.warn('CSS Variable name cannot be empty')
        return
    }

    if (isBlank(value)) {
        console.warn('CSS Variable value cannot be empty')
        return
    }

    document.querySelector(':root').style.setProperty(name, value)
}


/**
 * Removes the specified theme
 * @param {string} name Theme name
 */
export function removeTheme(name) {
    if (isBlank(name)) {
        console.warn('Theme name cannot be empty')
        return
    }

    delete _themes[name]
}


/* PRIVATE */

let _themes = undefined
let _saveOption = undefined

function isBlank(str) {
    !str || /^\s*$/.test(str)
}

function getStorage() {
    switch (_saveOption.storage) {
        case 'localStorage': return localStorage
        case 'sessionStorage': return sessionStorage
        default: return undefined
    }
}

# Themepick
Themepick is based on CSS variables and provides a mechasinm of switching between different themes in the application.

<h3>Installation</h3>
To install this library type the following command into the terminal:

```
npm i themepick
```
<h3>Hot to use Themepick</h3>

Themepick provides several functions for theme management in the application.
<hr>
<h4>initThemes</h4>
Inits the set of defined themes. It should be used at the start of application.

```javascript
import { initThemes } from 'themepick'
```

```javascript
const themes = {
  darkBlue: {
    "--main-background": "blue",
    "--main-font-color": "black"
  },
  lightBlue: {
   "--main-background": "cyan",
   "--main-font-color": "white"
  }
}

initThemes(themes, 'lightBlue')

```
Themes object is a simple javascript object that contains default property and theme set. Themes object can not be empty and must contain at list one theme, otherwise an error will be thrown. Second argument - default theme that will be choosen automatically after application starts. If it is empty - first theme from the object will be picked.

<hr>
<h4>addTheme</h4>
Provides the ability to dynamically add a new theme to existing ones. Theme name should be unique and theme object can not be empty, otherwise an error will be thrown.

```javascript
import { addTheme } from 'themepick'
```

```javascript
addTheme('pinkIndigo', {
   "--main-background": "purple",
   "--main-font-color": "pink"
})
```

<hr>
<h4>applyTheme</h4>
Applies choosen theme to application. Pass the theme name to the method that you specified when initializing the theme manager.

```javascript
import { applyTheme } from 'themepick'
```

```javascript
applyTheme('darkBlue')
```
If you don't want to initialize theme manager, you can provide theme object dirrectly to <b>applyTheme</b> method:

```javascript
applyTheme({
   "--main-background": "turquoise",
   "--main-font-color": "white"
})
```

<hr>
<h4>getTheme</h4>
Returns the theme object that was saved to theme manager while initialization

```javascript
import { getTheme } from 'themepick'
```

```javascript
const themeObject = getTheme('darkBlue')
```

<hr>
<h4>getVarValue</h4>
Returns the current value of css variable by name

```javascript
import { getVarValue } from 'themepick'
```

```javascript
const bgColor = getVarValue('--main-background')
```

<hr>
<h4>setVarValue</h4>
Sets the value to css variable

```javascript
import { setVarValue } from 'themepick'
```

```javascript
const bgColor = setVarValue('--main-background', '#00ff00')
```

<hr>
<h4>removeTheme</h4>
Removes the specified theme

```javascript
import { removeTheme } from 'themepick'
```

```javascript
removeTheme('darkBlue')
```

<hr>
<h4>Shared variables</h4>
Sometimes several themes can use the common css variables and there is not good to repeat them in every theme objects. Library provides a functionality to get rid of this. You should splecify a <b>ref</b> property as listed below:

```javascript
const themes = {
  whiteColors: {
    "--main-background": "white",
    "--modal-shadow-color": "pink"
  },
  whiteIcecream: {
    "ref": "whiteColors"
    "--main-font-color": "black"
  },
  whiteIce: {
   "ref": "whiteColors"
   "--main-font-color": "cyan"
  }
}

initThemes(themes, 'whiteIce')
```
The <b>ref</b> property means the reference to the shared styles. References point theme manager to use shared styles specified in the themes object. In the case above <b>whiteIcecream</b> and <b>whiteIce</b> themes use the shared <b>whiteColors</b> theme.

<hr>
<h4>Using local storage / session storage to save selected theme</h4>
To activate actual theme saving to local or session storage you should specify the last argument of <b>initThemes</b> method.
For local storage:

```javascript
initThemes(themes, 'whiteIce', { key: 'selected', storage: 'localStorage' })
```
For session storage:

```javascript
initThemes(themes, 'whiteIce', { key: 'selected', storage: 'sessionStorage' })
```

<hr>
Themepick fits perfectly to all types of front-end applications and static websites.<br>
Since the library uses a CSS Variables it may not work in older browsers.<br>
Here the list of CSS Variables support:<br>
https://caniuse.com/css-variables
<br>
If yoor application supports old browsers and you want to use this library, you can use pollyfills or ponyfills to fix this issue. Here some popular: <br>
https://jhildenbiddle.github.io/css-vars-ponyfill/#/ <br>
https://github.com/nuxodin/ie11CustomProperties <br>

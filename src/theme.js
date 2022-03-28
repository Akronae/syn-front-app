import String from '@/utils/StringUtils'
import DOMUtils from '@/utils/DOMUtils'
import DeviceUtils from '@/utils/deviceUtils'
import Vue from 'vue'

function shadeColor (color, percent)
{
    let R = parseInt(color.substring(1, 3), 16)
    let G = parseInt(color.substring(3, 5), 16)
    let B = parseInt(color.substring(5, 7), 16)

    R = parseInt(R * (100 + percent) / 100)
    G = parseInt(G * (100 + percent) / 100)
    B = parseInt(B * (100 + percent) / 100)

    R = (R < 255) ? R : 255
    G = (G < 255) ? G : 255
    B = (B < 255) ? B : 255

    let RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16))
    let GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16))
    let BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16))

    return '#' + RR + GG + BB
}

let currentTheme
const themes =
{
    get current () { return currentTheme || this.auto },
    set current (value)
    {
        currentTheme = value
        applyTheme()
    },

    default:
    {
        name: 'default',
        dominant: 'white',
        backgroundColor: '#F2F3F7',
        contentBackgroundColor: 'white',
        titleOverAccentColor: 'white',
        textColor: '#212030',
        textColorDark: 'black',
        textColorLighter : '#383838',
        textColorLight: '#686a6d',
        textColorExtraLight: '#a7a6b3',
        backgroundTextColor: '#00000026',
        backgroundTextColorSoft: '#0000001a',
        backgroundTextColorHeavy: '#0000004d',
        backgroundTextColorExtraLight: 'rgba(255, 255, 255, 0.8)',
        searchBarGrayBackground: 'rgba(212, 212, 212, .30)',
        invert: 'invert(0)',
        backgroundImageFilter: 'grayscale(1)',
        borderColor: '#e8e9ed',
        borderColorStrong: '#e0e0e1',
        borderColorExtraStrong: '#d3d3d3',
        borderColorLight: '#EAEBEF',
        borderColorExtraLight: '#EBEDF2',
        borderColorMegaLight: '#F7F7F7',
        borderColorHyperLight: '#fbfbfb',
        statusBarBackgroundColor: 'rgba(0,0,0,0.05)',
        boxShadowSharp: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        boxShadowSoft: '0px 1px 1px rgba(0, 0, 0, 0.06)',
        boxShadowSharpDiffuse: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0px -12px 20px 0px #0000000d',
        boxShadowDiffuse: '2px 4px 10px #00000022',
        boxShadowIcon: '2px 4px 6px #00000020',
        nominativeColor: '#ffffff08',
        genitiveColor: '#89ff6412',
        accusativeColor: '#ffffff08',
        dativeColor: '#ffffff08',
        vocativeColor: '#ffffff08',
    },

    blueberry:
    {
        name: 'blueberry',
        accentColor: '#5C64EE',
    },

    twilight:
    {
        name: 'twilight',
        dominant: 'black',
        accentColor: '#684FA3',
        accentColorText: '#8e73d0',
        backgroundColor: '#222222',
        contentBackgroundColor: '#312e36',
        get titleOverAccentColor () { return this.textColorDark },
        textColorDark: '#e0e0e0',
        textColor: '#b8b8b8',
        textColorLighter: '#cccccc',
        textColorLight: '#b2b2b2',
        textColorExtraLight: '#707070',
        backgroundTextColor: '#ffffff26',
        backgroundTextColorSoft: '#ffffff1a',
        backgroundTextColorHeavy: '#ffffff4d',
        backgroundTextColorExtraLight: 'rgba(0, 0, 0, 0.1)',
        searchBarGrayBackground: 'rgba(43, 43, 43, .30)',
        invert: 'invert(0.82)',
        get backgroundImageFilter () { return themes.default.backgroundImageFilter + ' ' + themes.twilight.invert },
        borderColor: '#383838',
        borderColorStrong: '#e0e0e157',
        borderColorExtraStrong: '#636363',
        borderColorLight: '#9696960d',
        borderColorExtraLight: '#ffffff08',
        borderColorMegaLight: '#6d6d6d06',
        borderColorHyperLight: '#303030',
        statusBarBackgroundColor: 'rgba(0,0,0,0.1)',
        boxShadowSharp: '0 1px 3px 0 rgba(255, 255, 255, 0.03), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
        boxShadowSoft: '0px 1px 1px rgba(255, 255, 255, 0.03)',
        boxShadowSharpDiffuse: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06), 0px -12px 20px 0px #FFFFFF0d',
        boxShadowDiffuse: '1px 2px 10px #ffffff1a',
        boxShadowIcon: '2px 4px 6px #000000aa'
    },

    get auto ()
    {
        //const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        var isDarkMode = true
        var theme = isDarkMode ? this.twilight : this.blueberry
        theme = JSON.parse(JSON.stringify(theme))
        theme.name = 'auto'

        return theme
    }
}

const properties =
{
    dangerColor: '#E94E3C',
    loveColor: 'rgb(243, 62, 88)',
    successColor: '#63b47c',
    backgroundColorSuccess: '#d4edda',
    borderColorSuccess: '#c3e6cb',
    textColorSuccess: '#155724',
    verticalMenuMarginLeft: '2vw',
    verticalMenuBorderRadius: '10px',
    screenXsMin: '480px',
    screenSmMin: '682px',
    screenMdMin: '1025px',
    screenLgMin: '1500px',
    keyboardHeight: '40vh',
    get dominant () { return themes.current.dominant || themes.default.dominant },
    get accentColor () { return themes.current.accentColor || themes.default.accentColor },
    get backgroundColor () { return themes.current.backgroundColor || themes.default.backgroundColor },
    get contentBackgroundColor () { return themes.current.contentBackgroundColor || themes.default.contentBackgroundColor },
    get titleOverAccentColor () { return themes.current.titleOverAccentColor || themes.default.titleOverAccentColor },
    get textColor () { return themes.current.textColor || themes.default.textColor },
    get textColorDark () { return themes.current.textColorDark || themes.default.textColorDark },
    get textColorLight () { return themes.current.textColorLight || themes.default.textColorLight },
    get textColorLighter () { return themes.current.textColorLighter || themes.default.textColorLighter },
    get textColorExtraLight () { return themes.current.textColorExtraLight || themes.default.textColorExtraLight },
    get backgroundTextColor () { return themes.current.backgroundTextColor || themes.default.backgroundTextColor },
    get backgroundTextColorSoft () { return themes.current.backgroundTextColorSoft || themes.default.backgroundTextColorSoft },
    get backgroundTextColorHeavy () { return themes.current.backgroundTextColorHeavy || themes.default.backgroundTextColorHeavy },
    get backgroundTextColorExtraLight () { return themes.current.backgroundTextColorExtraLight || themes.default.backgroundTextColorExtraLight },
    get searchBarGrayBackground () { return themes.current.searchBarGrayBackground || themes.default.searchBarGrayBackground },
    get invert () { return themes.current.invert || themes.default.invert },
    get backgroundImageFilter () { return themes.current.backgroundImageFilter || themes.default.backgroundImageFilter },
    get borderColor () { return themes.current.borderColor || themes.default.borderColor },
    get borderColorLight () { return themes.current.borderColorLight || themes.default.borderColorLight },
    get borderColorHyperLight () { return themes.current.borderColorHyperLight || themes.default.borderColorHyperLight },
    get borderColorExtraLight () { return themes.current.borderColorExtraLight || themes.default.borderColorExtraLight },
    get borderColorMegaLight () { return themes.current.borderColorMegaLight || themes.default.borderColorMegaLight },
    get borderColorStrong () { return themes.current.borderColorStrong || themes.default.borderColorStrong },
    get borderColorExtraStrong () { return themes.current.borderColorExtraStrong || themes.default.borderColorExtraStrong },
    get accentColorText() { return themes.current.accentColorText || this.accentColorLight },
    get statusBarBackgroundColor () { return themes.current.statusBarBackgroundColor || themes.default.statusBarBackgroundColor },
    get boxShadowSharp () { return themes.current.boxShadowSharp || themes.default.boxShadowSharp },
    get boxShadowSoft () { return themes.current.boxShadowSoft || themes.default.boxShadowSoft },
    get boxShadowSharpDiffuse () { return themes.current.boxShadowSharpDiffuse || themes.default.boxShadowSharpDiffuse },
    get boxShadowDiffuse () { return themes.current.boxShadowDiffuse || themes.default.boxShadowDiffuse },
    get boxShadowIcon () { return themes.current.boxShadowIcon || themes.default.boxShadowIcon },
    get nominativeColor () { return themes.current.nominativeColor || themes.default.nominativeColor },
    get genitiveColor () { return themes.current.genitiveColor || themes.default.genitiveColor },
    get dativeColor () { return themes.current.dativeColor || themes.default.dativeColor },
    get vocativeColor () { return themes.current.vocativeColor || themes.default.vocativeColor },
    get accentColorLight() { return shadeColor(this.accentColor, 20) },
    get accentColorLight30Percent() { return shadeColor(this.accentColor, 30) },
    get accentColorLight50Percent() { return shadeColor(this.accentColor, 50) },
    get accentColorLight70Percent() { return shadeColor(this.accentColor, 70) },
    get accentColorLight100Percent() { return shadeColor(this.accentColor, 100) },
    get accentColor10Percent() { return this.accentColor + '10' },
    get accentColor60Percent() { return this.accentColor + '60' },
    get accentColor90Percent() { return this.accentColor + '90' },
    get accentColorDark() { return shadeColor(this.accentColor, -20) },
    get selectionColor() { return this.accentColor + '40' },
    get verticalMenuTotalVerticalSpace() { return `calc(${this.verticalMenuWidth} + ${this.verticalMenuMarginLeft})` },
    get verticalMenuWidth ()
    {
        return DOMUtils.isLargeDesktop() ? '15vw' : '18vw'
    },
    get horizontalMenuHeight()
    {
        if (DOMUtils.getMatchingMediaName() == 'mobile')
        {
            if (DeviceUtils.isIphoneXOrNewer)
            {
                return '9.5vh'
            }
            else if (DOMUtils.isSmallMobile())
            {
                return '9vh'
            }
            else return '8vh'
        }
        else return '6vh'
    },
    get horizontalMenuItemMargin ()
    {
        return DeviceUtils.isIphoneXOrNewer ? '1.5vh auto auto auto' : 'auto'
    },
}

function applyTheme ()
{
    console.log('Applying theme to document')
    for (const property in properties)
    {
        document.documentElement.style.setProperty(`--theme-${String.toKebabCase(property)}`, properties[property])
    }
    if (window.NavigationBar) window.NavigationBar.backgroundColorByName(properties.dominant);
}

export default
{
    get current () { return this.themes.current },
    set current (value) { this.themes.current = value },

    themes: Vue.observable(themes),
    properties,
    applyTheme,
    shadeColor
}
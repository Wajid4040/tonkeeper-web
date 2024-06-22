import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
    textPrimary: '#1B5853', // Updated black text
    textSecondary: '#4D4D4D', // Dark grey text for secondary elements
    textTertiary: '#808080', // Grey text for tertiary elements
    textAccent: '#1B5853', // Updated black accent text
    textPrimaryAlternate: '#FFFFFF', // Updated white alternate text

    backgroundPage: '#FFFFFF', // Updated white page background
    backgroundTransparent: 'rgba(210, 221, 222, 0.92)', // Updated transparent white background
    backgroundContent: '#F0F0F0', // Light grey content background
    backgroundContentTint: '#FFFFFF', // Slightly darker grey for content tint
    backgroundContentAttention: '#CCCCCC', // Attention-grabbing grey background
    backgroundOverlayStrong: 'rgba(210, 221, 222, 0.72)', // Updated strong white overlay
    backgroundOverlayLight: 'rgba(210, 221, 222, 0.48)', // Updated light white overlay
    backgroundOverlayExtraLight: 'rgba(210, 221, 222, 0.24)', // Updated extra light white overlay
    backgroundHighlighted: 'rgba(27, 88, 83, 0.24)', // Updated highlighted background in black

    iconPrimary: '#1B5853', // Updated black primary icons
    iconSecondary: '#4D4D4D', // Dark grey secondary icons
    iconTertiary: '#808080', // Grey tertiary icons
    iconPrimaryAlternate: '#FFFFFF', // Updated white alternate icons

    buttonPrimaryBackground: '#1B5853', // Updated black primary button background
    buttonPrimaryForeground: '#FFFFFF', // Updated white primary button text
    buttonSecondaryBackground: '#FFFFFF', // Updated secondary button background color
    buttonSecondaryForeground: '#1B5853', // Updated black secondary button text
    buttonTertiaryBackground: '#FFFFFF', // Darker grey tertiary button background
    buttonTertiaryForeground: '#1B5853', // Updated black tertiary button text
    buttonPrimaryBackgroundDisabled: '#999999', // Disabled state for primary button
    buttonSecondaryBackgroundDisabled: '#CCCCCC', // Disabled state for secondary button
    buttonTertiaryBackgroundDisabled: '#FFFFFF', // Disabled state for tertiary button

    buttonTertiaryForegroundDisabled: 'rgba(27, 88, 83, 0.48)', // Updated disabled state text in black
    buttonSecondaryForegroundDisabled: 'rgba(27, 88, 83, 0.48)', // Updated disabled state text in black
    buttonPrimaryForegroundDisabled: 'rgba(27, 88, 83, 0.48)', // Updated disabled state text in black

    buttonPrimaryBackgroundHighlighted: 'rgba(27, 88, 83, 0.24)', // Updated highlighted primary button background
    buttonSecondaryBackgroundHighlighted: 'rgba(27, 88, 83, 0.24)', // Updated highlighted secondary button background
    buttonTertiaryBackgroundHighlighted: 'rgba(27, 88, 83, 0.24)', // Updated highlighted tertiary button background

    fieldBackground: '#F0F0F0', // Light grey field background
    fieldActiveBorder: '#1B5853', // Updated black active border
    fieldErrorBorder: '#FF0000', // Red error border
    fieldErrorBackground: 'rgba(255, 0, 0, 0.08)', // Light red error background

    fieldBorderColor: '#1B5853', // Updated field border color
    fieldTextColor: '#1B5853', // Updated field text color

    accentBlue: '#1B5853', // Updated black accent color for blue
    accentGreen: '#1B5853', // Updated black accent color for green
    accentRed: '#1B5853', // Updated black accent color for red
    accentOrange: '#1B5853', // Updated black accent color for orange
    accentPurple: '#1B5853', // Updated black accent color for purple

    tabBarActiveIcon: '#1B5853', // Updated black active tab icon
    tabBarInactiveIcon: '#4D4D4D', // Dark grey inactive tab icon

    separatorCommon: 'rgba(27, 88, 83, 0.24)', // Updated common separator in black
    separatorAlternate: 'rgba(27, 88, 83, 0.04)', // Updated alternate separator in black

    gradientBackgroundTop: 'linear-gradient(180deg, #FFFFFF 0%, rgba(210, 221, 222, 0.991353) 6.67%, rgba(210, 221, 222, 0.96449) 13.33%, rgba(210, 221, 222, 0.91834) 20%, rgba(210, 221, 222, 0.852589) 26.67%, rgba(210, 221, 222, 0.768225) 33.33%, rgba(210, 221, 222, 0.668116) 40%, rgba(210, 221, 222, 0.557309) 46.67%, rgba(210, 221, 222, 0.442691) 53.33%, rgba(210, 221, 222, 0.331884) 60%, rgba(210, 221, 222, 0.231775) 66.67%, rgba(210, 221, 222, 0.147411) 73.33%, rgba(210, 221, 222, 0.0816599) 80%, rgba(210, 221, 222, 0.03551) 86.67%, rgba(210, 221, 222, 0.0086472) 93.33%, rgba(210, 221, 222, 0) 100%)',
    gradientBackgroundBottom: 'linear-gradient(360deg, #FFFFFF 0%, rgba(210, 221, 222, 0.991353) 6.67%, rgba(210, 221, 222, 0.96449) 13.33%, rgba(210, 221, 222, 0.91834) 20%, rgba(210, 221, 222, 0.852589) 26.67%, rgba(210, 221, 222, 0.768225) 33.33%, rgba(210, 221, 222, 0.668116) 40%, rgba(210, 221, 222, 0.557309) 46.67%, rgba(210, 221, 222, 0.442691) 53.33%, rgba(210, 221, 222, 0.331884) 60%, rgba(210, 221, 222, 0.231775) 66.67%, rgba(210, 221, 222, 0.147411) 73.33%, rgba(210, 221, 222, 0.0816599) 80%, rgba(210, 221, 222, 0.03551) 86.67%, rgba(210, 221, 222, 0.0086472) 93.33%, rgba(210, 221, 222, 0) 100%)',
    gradientBlueTop: 'linear-gradient(180deg, #1B5853 0%, rgba(27, 88, 83, 0.991353) 6.67%, rgba(27, 88, 83, 0.96449) 13.33%, rgba(27, 88, 83, 0.91834) 20%, rgba(27, 88, 83, 0.852589) 26.67%, rgba(27, 88, 83, 0.768225) 33.33%, rgba(27, 88, 83, 0.668116) 40%, rgba(27, 88, 83, 0.557309) 46.67%, rgba(27, 88, 83, 0.442691) 53.33%, rgba(27, 88, 83, 0.331884) 60%, rgba(27, 88, 83, 0.231775) 66.67%, rgba(27, 88, 83, 0.147411) 73.33%, rgba(27, 88, 83, 0.0816599) 80%, rgba(27, 88, 83, 0.03551) 86.67%, rgba(27, 88, 83, 0.0086472) 93.33%, rgba(27, 88, 83, 0) 100%)',
    gradientBlueBottom: 'linear-gradient(0deg, #1B5853 0%, rgba(27, 88, 83, 0.991353) 6.67%, rgba(27, 88, 83, 0.96449) 13.33%, rgba(27, 88, 83, 0.91834) 20%, rgba(27, 88, 83, 0.852589) 26.67%, rgba(27, 88, 83, 0.768225) 33.33%, rgba(27, 88, 83, 0.668116) 40%, rgba(27, 88, 83, 0.557309) 46.67%, rgba(27, 88, 83, 0.442691) 53.33%, rgba(27, 88, 83, 0.331884) 60%, rgba(27, 88, 83, 0.231775) 66.67%, rgba(27, 88, 83, 0.147411) 73.33%, rgba(27, 88, 83, 0.0816599) 80%, rgba(27, 88, 83, 0.03551) 86.67%, rgba(27, 88, 83, 0.0086472) 93.33%, rgba(27, 88, 83, 0) 100%)',
    gradientGreen: 'linear-gradient(180deg, #1B5853 0%, rgba(27, 88, 83, 0.991353) 6.67%, rgba(27, 88, 83, 0.96449) 13.33%, rgba(27, 88, 83, 0.91834) 20%, rgba(27, 88, 83, 0.852589) 26.67%, rgba(27, 88, 83, 0.768225) 33.33%, rgba(27, 88, 83, 0.668116) 40%, rgba(27, 88, 83, 0.557309) 46.67%, rgba(27, 88, 83, 0.442691) 53.33%, rgba(27, 88, 83, 0.331884) 60%, rgba(27, 88, 83, 0.231775) 66.67%, rgba(27, 88, 83, 0.147411) 73.33%, rgba(27, 88, 83, 0.0816599) 80%, rgba(27, 88, 83, 0.03551) 86.67%, rgba(27, 88, 83, 0.0086472) 93.33%, rgba(27, 88, 83, 0) 100%)',
    gradientRed: 'linear-gradient(180deg, #1B5853 0%, rgba(27, 88, 83, 0.991353) 6.67%, rgba(27, 88, 83, 0.96449) 13.33%, rgba(27, 88, 83, 0.91834) 20%, rgba(27, 88, 83, 0.852589) 26.67%, rgba(27, 88, 83, 0.768225) 33.33%, rgba(27, 88, 83, 0.668116) 40%, rgba(27, 88, 83, 0.557309) 46.67%, rgba(27, 88, 83, 0.442691) 53.33%, rgba(27, 88, 83, 0.331884) 60%, rgba(27, 88, 83, 0.231775) 66.67%, rgba(27, 88, 83, 0.147411) 73.33%, rgba(27, 88, 83, 0.0816599) 80%, rgba(27, 88, 83, 0.03551) 86.67%, rgba(27, 88, 83, 0.0086472) 93.33%, rgba(27, 88, 83, 0) 100%)',

    constantBlack: '#1B5853', // Updated constant black color
    constantWhite: '#FFFFFF', // Updated constant white color
    blue: '#1B5853', // Updated black for blue accent
    red: '#1B5853', // Updated black for red accent

    corner3xSmall: '8px', // More rounded corners for extra small elements
    corner2xSmall: '8px', // More rounded corners for 2x small elements
    cornerExtraSmall: '8px', // More rounded corners for extra small elements
    cornerSmall: '12px', // More rounded corners for small elements
    cornerMedium: '16px', // More rounded corners for medium elements
    cornerLarge: '24px', // More rounded corners for large elements
    cornerFull: '9999px', // Fully rounded corners for full corner size
    fontMono: 'ui-monospace, SF Mono, monospace, Roboto Mono, Menlo, Consolas, Courier', // Monospace font
    displayType: 'compact' // Display type
};

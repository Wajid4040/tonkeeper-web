import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
    textPrimary: '#000000', // Black text
    textSecondary: '#4D4D4D', // Dark grey text for secondary elements
    textTertiary: '#808080', // Grey text for tertiary elements
    textAccent: '#000000', // Black accent text
    textPrimaryAlternate: '#FFFFFF', // White alternate text

    backgroundPage: '#FFFFFF', // White page background
    backgroundTransparent: 'rgba(255, 255, 255, 0.92)', // Transparent white background
    backgroundContent: '#F0F0F0', // Light grey content background
    backgroundContentTint: '#E0E0E0', // Slightly darker grey for content tint
    backgroundContentAttention: '#CCCCCC', // Attention-grabbing grey background
    backgroundOverlayStrong: 'rgba(255, 255, 255, 0.72)', // Strong white overlay
    backgroundOverlayLight: 'rgba(255, 255, 255, 0.48)', // Light white overlay
    backgroundOverlayExtraLight: 'rgba(255, 255, 255, 0.24)', // Extra light white overlay
    backgroundHighlighted: 'rgba(0, 0, 0, 0.24)', // Highlighted background in black

    iconPrimary: '#000000', // Black primary icons
    iconSecondary: '#4D4D4D', // Dark grey secondary icons
    iconTertiary: '#808080', // Grey tertiary icons
    iconPrimaryAlternate: '#FFFFFF', // White alternate icons

    buttonPrimaryBackground: '#000000', // Black primary button background
    buttonPrimaryForeground: '#FFFFFF', // White primary button text
    buttonSecondaryBackground: '#F0F0F0', // Light grey secondary button background
    buttonSecondaryForeground: '#000000', // Black secondary button text
    buttonTertiaryBackground: '#E0E0E0', // Darker grey tertiary button background
    buttonTertiaryForeground: '#000000', // Black tertiary button text
    buttonPrimaryBackgroundDisabled: '#999999', // Disabled state for primary button
    buttonSecondaryBackgroundDisabled: '#CCCCCC', // Disabled state for secondary button
    buttonTertiaryBackgroundDisabled: '#E0E0E0', // Disabled state for tertiary button

    buttonTertiaryForegroundDisabled: 'rgba(0, 0, 0, 0.48)', // Disabled state text in black
    buttonSecondaryForegroundDisabled: 'rgba(0, 0, 0, 0.48)', // Disabled state text in black
    buttonPrimaryForegroundDisabled: 'rgba(0, 0, 0, 0.48)', // Disabled state text in black

    buttonPrimaryBackgroundHighlighted: 'rgba(0, 0, 0, 0.24)', // Highlighted primary button background
    buttonSecondaryBackgroundHighlighted: 'rgba(0, 0, 0, 0.24)', // Highlighted secondary button background
    buttonTertiaryBackgroundHighlighted: 'rgba(0, 0, 0, 0.24)', // Highlighted tertiary button background

    fieldBackground: '#F0F0F0', // Light grey field background
    fieldActiveBorder: '#000000', // Black active border
    fieldErrorBorder: '#FF0000', // Red error border
    fieldErrorBackground: 'rgba(255, 0, 0, 0.08)', // Light red error background

    accentBlue: '#000000', // Black accent color for blue
    accentGreen: '#000000', // Black accent color for green
    accentRed: '#000000', // Black accent color for red
    accentOrange: '#000000', // Black accent color for orange
    accentPurple: '#000000', // Black accent color for purple

    tabBarActiveIcon: '#000000', // Black active tab icon
    tabBarInactiveIcon: '#4D4D4D', // Dark grey inactive tab icon

    separatorCommon: 'rgba(0, 0, 0, 0.24)', // Common separator in black
    separatorAlternate: 'rgba(0, 0, 0, 0.04)', // Alternate separator in black

    gradientBackgroundTop: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.991353) 6.67%, rgba(255, 255, 255, 0.96449) 13.33%, rgba(255, 255, 255, 0.91834) 20%, rgba(255, 255, 255, 0.852589) 26.67%, rgba(255, 255, 255, 0.768225) 33.33%, rgba(255, 255, 255, 0.668116) 40%, rgba(255, 255, 255, 0.557309) 46.67%, rgba(255, 255, 255, 0.442691) 53.33%, rgba(255, 255, 255, 0.331884) 60%, rgba(255, 255, 255, 0.231775) 66.67%, rgba(255, 255, 255, 0.147411) 73.33%, rgba(255, 255, 255, 0.0816599) 80%, rgba(255, 255, 255, 0.03551) 86.67%, rgba(255, 255, 255, 0.0086472) 93.33%, rgba(255, 255, 255, 0) 100%)',
    gradientBackgroundBottom: 'linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.991353) 6.67%, rgba(255, 255, 255, 0.96449) 13.33%, rgba(255, 255, 255, 0.91834) 20%, rgba(255, 255, 255, 0.852589) 26.67%, rgba(255, 255, 255, 0.768225) 33.33%, rgba(255, 255, 255, 0.668116) 40%, rgba(255, 255, 255, 0.557309) 46.67%, rgba(255, 255, 255, 0.442691) 53.33%, rgba(255, 255, 255, 0.331884) 60%, rgba(255, 255, 255, 0.231775) 66.67%, rgba(255, 255, 255, 0.147411) 73.33%, rgba(255, 255, 255, 0.0816599) 80%, rgba(255, 255, 255, 0.03551) 86.67%, rgba(255, 255, 255, 0.0086472) 93.33%, rgba(255, 255, 255, 0) 100%)',
    gradientBlueTop: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.991353) 6.67%, rgba(0, 0, 0, 0.96449) 13.33%, rgba(0, 0, 0, 0.91834) 20%, rgba(0, 0, 0, 0.852589) 26.67%, rgba(0, 0, 0, 0.768225) 33.33%, rgba(0, 0, 0, 0.668116) 40%, rgba(0, 0, 0, 0.557309) 46.67%, rgba(0, 0, 0, 0.442691) 53.33%, rgba(0, 0, 0, 0.331884) 60%, rgba(0, 0, 0, 0.231775) 66.67%, rgba(0, 0, 0, 0.147411) 73.33%, rgba(0, 0, 0, 0.0816599) 80%, rgba(0, 0, 0, 0.03551) 86.67%, rgba(0, 0, 0, 0.0086472) 93.33%, rgba(0, 0, 0, 0) 100%)',
    gradientBlueBottom: 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.991353) 6.67%, rgba(0, 0, 0, 0.96449) 13.33%, rgba(0, 0, 0, 0.91834) 20%, rgba(0, 0, 0, 0.852589) 26.67%, rgba(0, 0, 0, 0.768225) 33.33%, rgba(0, 0, 0, 0.668116) 40%, rgba(0, 0, 0, 0.557309) 46.67%, rgba(0, 0, 0, 0.442691) 53.33%, rgba(0, 0, 0, 0.331884) 60%, rgba(0, 0, 0, 0.231775) 66.67%, rgba(0, 0, 0, 0.147411) 73.33%, rgba(0, 0, 0, 0.0816599) 80%, rgba(0, 0, 0, 0.03551) 86.67%, rgba(0, 0, 0, 0.0086472) 93.33%, rgba(0, 0, 0, 0) 100%)',
    gradientGreen: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.991353) 6.67%, rgba(0, 0, 0, 0.96449) 13.33%, rgba(0, 0, 0, 0.91834) 20%, rgba(0, 0, 0, 0.852589) 26.67%, rgba(0, 0, 0, 0.768225) 33.33%, rgba(0, 0, 0, 0.668116) 40%, rgba(0, 0, 0, 0.557309) 46.67%, rgba(0, 0, 0, 0.442691) 53.33%, rgba(0, 0, 0, 0.331884) 60%, rgba(0, 0, 0, 0.231775) 66.67%, rgba(0, 0, 0, 0.147411) 73.33%, rgba(0, 0, 0, 0.0816599) 80%, rgba(0, 0, 0, 0.03551) 86.67%, rgba(0, 0, 0, 0.0086472) 93.33%, rgba(0, 0, 0, 0) 100%)',
    gradientRed: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.991353) 6.67%, rgba(0, 0, 0, 0.96449) 13.33%, rgba(0, 0, 0, 0.91834) 20%, rgba(0, 0, 0, 0.852589) 26.67%, rgba(0, 0, 0, 0.768225) 33.33%, rgba(0, 0, 0, 0.668116) 40%, rgba(0, 0, 0, 0.557309) 46.67%, rgba(0, 0, 0, 0.442691) 53.33%, rgba(0, 0, 0, 0.331884) 60%, rgba(0, 0, 0, 0.231775) 66.67%, rgba(0, 0, 0, 0.147411) 73.33%, rgba(0, 0, 0, 0.0816599) 80%, rgba(0, 0, 0, 0.03551) 86.67%, rgba(0, 0, 0, 0.0086472) 93.33%, rgba(0, 0, 0, 0) 100%)',

    constantBlack: '#000000', // Constant black color
    constantWhite: '#FFFFFF', // Constant white color
    blue: '#000000', // Black for blue accent
    red: '#000000', // Black for red accent

    corner3xSmall: '0px', // Square corners for extra small elements
    corner2xSmall: '0px', // Square corners for 2x small elements
    cornerExtraSmall: '0px', // Square corners for extra small elements
    cornerSmall: '0px', // Square corners for small elements
    cornerMedium: '0px', // Square corners for medium elements
    cornerLarge: '0px', // Square corners for large elements
    cornerFull: '0px', // Square corners for full corner size
    fontMono: 'ui-monospace, SF Mono, monospace, Roboto Mono, Menlo, Consolas, Courier', // Monospace font
    displayType: 'compact' // Display type
};

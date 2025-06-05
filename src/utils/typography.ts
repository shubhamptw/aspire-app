// typography.ts

import { TextStyle } from 'react-native';

type FontStyles = {
    regular: TextStyle;
    medium: TextStyle;
    bold: TextStyle;
};

export const font: FontStyles = {
    regular: { fontFamily: 'Avenir Next' },
    medium: { fontFamily: 'Avenir Next', fontWeight: '600' },
    bold: { fontFamily: 'Avenir Next', fontWeight: 'bold' },
};

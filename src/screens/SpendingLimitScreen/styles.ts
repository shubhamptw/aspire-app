import { StyleSheet } from "react-native";
import { font } from '../../utils/typography';

export const styles = StyleSheet.create({
    headerTitle: {
        ...font.bold,
        color: '#fff',
        fontSize: 24,
        textAlign: 'left',
        marginTop: 16
    },
    cardLabel: {
        ...font.medium,
        fontSize: 16,
        color: '#222',
    },
    currencyText: {
        ...font.bold,
        color: '#fff',
        fontSize: 18,
    },
    amountInput: {
        ...font.bold,
        fontSize: 36,
        color: '#222',
        letterSpacing: 1,
        flex: 1,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    infoText: {
        ...font.regular,
        color: '#888',
        fontSize: 13,
        marginTop: 12,
    },
    presetBtnText: {
        ...font.medium,
        color: '#01D167',
        fontSize: 16,
    },
    presetBtnTextSelected: {
        ...font.bold,
        color: '#01D167',
    },
    saveBtnText: {
        ...font.bold,
        color: '#fff',
        fontSize: 18,
    },
    root: {
        flex: 1,
        backgroundColor: '#003366',
    },
    headerBg: {
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerIconBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        marginTop: 64,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        flex: 1,
        justifyContent: 'space-between'
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    currencyBox: {
        backgroundColor: '#01D167',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        minWidth: 40,
        alignItems: 'center',
    },
    presetRowInCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 0,
        padding: 0,
    },
    presetBtn: {
        backgroundColor: '#E5FFF6',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 18,
        // minWidth: width / 4.2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        marginHorizontal: 4,
    },
    presetBtnSelected: {
        backgroundColor: '#E5FFF6',
        borderColor: '#01D167',
    },
    saveArea: {
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 24,
    },
    saveBtn: {
        backgroundColor: '#01D167',
        borderRadius: 28,
        marginHorizontal: 24,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 32,
    },
    smallLogo: {
        alignSelf: 'flex-end',
        width: 25,
        height: 25
    },
});
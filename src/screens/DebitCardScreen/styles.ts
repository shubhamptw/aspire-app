import { StyleSheet, Dimensions } from 'react-native';
import { font } from '../../utils/typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#002B5B',
        paddingHorizontal: 26
    },
    headerContainer: {
        marginHorizontal: 16
    },
    smallLogo: {
        alignSelf: 'flex-end',
        width: 25,
        height: 25
    },
    header: {
        ...font.bold,
        color: '#fff',
        fontSize: 24
    },
    subheader: {
        ...font.medium,
        color: '#fff',
        marginTop: 24,
        marginBottom: 12,
        fontSize: 14
    },
    balanceContainer: {
        flexDirection: 'row'
    },
    dollarContainer: {
        backgroundColor: '#01D167',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance: {
        ...font.bold,
        color: '#fff',
        fontSize: 24,
        marginStart: 10
    },
    dollor: {
        ...font.bold,
        paddingHorizontal: 16,
        color: '#fff',
        fontSize: 12
    },
    cardText: {
        ...font.bold,
        color: 'white',
        fontSize: 16
    },
    cardName: {
        ...font.bold,
        color: '#fff',
        fontSize: 22,
        marginBottom: 24
    },
    cardNumber: {
        ...font.medium,
        color: '#fff',
        fontSize: 14,
        marginBottom: 12
    },
    cardDetails: {
        ...font.medium,
        color: '#fff',
        fontSize: 13,
        marginEnd: 32,
        marginBottom: 4
    },
    toggleCardText: {
        ...font.bold,
        color: '#01D167',
        marginStart: 6,
        marginEnd: 16,
        fontSize: 12
    },
    spendingTitle: {
        ...font.medium,
        fontSize: 13,
        marginBottom: 8
    },
    limitRow: {
        flexDirection: 'row',
        marginBottom: 10
    },
    spent: {
        ...font.bold,
        color: '#00C48C'
    },
    limit: {
        ...font.regular,
        color: '#888'
    },
    optionTitle: {
        ...font.medium,
        fontSize: 14
    },
    optionSubtitle: {
        ...font.regular,
        color: '#222222',
        fontSize: 13,
        marginTop: 2
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flex: 1,
        overflow: 'visible',
    },
    sheetInnerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetContent: {
        paddingHorizontal: 16,
        marginTop: 170,
        marginBottom: 200,
    },
    card: {
        position: 'absolute',
        left: '0%',
        right: '0%',
        zIndex: 10,
        marginHorizontal: 16,
        marginTop: -100,
    },
    cardContainer: {},
    card2: {
        backgroundColor: '#01D167',
        borderRadius: 16,
        padding: 24,
    },
    toggleCardButton: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        paddingVertical: 10,
        borderTopStartRadius: 6,
        borderTopEndRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -20,
        paddingBottom: 26,
    },
    visibilityIcon: {
        marginStart: 12
    },
    aspireLogo: {
        alignSelf: 'flex-end',
        width: 74,
        height: 21,
        marginBottom: 24
    },
    visaLogo: {
        alignSelf: 'flex-end',
        width: 60,
        height: 20
    },
    progressBar: {
        height: 15,
        backgroundColor: '#01D1671A',
        borderRadius: 12,
        opacity: 1,
        marginBottom: 16
    },
    progressFill: {
        height: 15,
        backgroundColor: '#01D167',
        borderRadius: 12,
        marginBottom: 16
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    optionText: {
        flex: 1,
        marginLeft: 12
    },
    optionIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#325baf',
        borderRadius: 32
    },
    spendingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}); 
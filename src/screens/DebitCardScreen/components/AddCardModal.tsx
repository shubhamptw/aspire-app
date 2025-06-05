import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { font } from '../../../utils/typography';

interface AddCardModalProps {
    visible: boolean;
    onClose: () => void;
    onAddCard: (name: string) => void;
}

export const AddCardModal = ({ visible, onClose, onAddCard }: AddCardModalProps) => {
    const [cardName, setCardName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!cardName.trim()) {
            setError('Please enter a card name');
            return;
        }
        onAddCard(cardName.trim());
        setCardName('');
        setError('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add New Card</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter card name"
                        value={cardName}
                        onChangeText={(text) => {
                            setCardName(text);
                            setError('');
                        }}
                        placeholderTextColor="#999"
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Add Card</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxWidth: 400,
    },
    title: {
        ...font.bold,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    submitButton: {
        flex: 1,
        padding: 12,
        marginLeft: 10,
        borderRadius: 8,
        backgroundColor: '#01D167',
    },
    cancelButtonText: {
        ...font.medium,
        color: '#666',
        textAlign: 'center',
    },
    submitButtonText: {
        ...font.medium,
        color: 'white',
        textAlign: 'center',
    },
}); 
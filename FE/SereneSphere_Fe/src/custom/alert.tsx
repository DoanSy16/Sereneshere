import { Alert } from 'react-native';

const showAlert = (title, message, text1,text2, navigation, to1,to2) => {
    Alert.alert(
        title, // Tiêu đề của alert
        message, // Nội dung của alert
        [
            { text: text1, onPress: () => navigation.navigate(to1) }, // Button "OK"
            { text: text2, onPress: () => navigation.navigate(to2) } // Button "OK"
        ],
        { cancelable: false } // Không cho phép bấm ra ngoài để đóng alert
    );
};

export { showAlert };

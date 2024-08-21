import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import authApi from "../API/authApi";
import { useDispatch, useSelector } from 'react-redux';
import postApi from "../API/postApi";
import { showAlert } from "../custom/alert";
import { loadPostActions } from "../acctions/postActions";
import socketServices from "../utils/socketService";
const LoadingScreen = () => {
    return (
        <ActivityIndicator style={styles.loading} size='large' color='#C0C0C0' />
    );
};
const isValidEmail = (email) => {
    // Kiểm tra định dạng email bằng biểu thức chính quy
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [getEmail, setEmail] = useState('quannq@fpt.edu.vn');
    const [getPassword, setPassword] = useState('dangth')
    const [getShowHidePassword, setShowHidePassword] = useState(false);

    // const data1 = useSelector((state:RootState) => state.post.posts);
    const handleLogin = async () => {
        navigation.navigate(LoadingScreen);
        const data = {
            email: getEmail,
            password: getPassword
        };
        try {
            const response = await authApi.Login(data);
            const status = response.status;

            if (status == 200) {
                const user = response.authenticationResponse;
                AsyncStorage.setItem('AccessToken', user.token);
                AsyncStorage.setItem('AccessId', user.id.toString());
                AsyncStorage.setItem('AccessFullName', user.name);
                AsyncStorage.setItem('AccessAvatar', user.avatar);
                const dataPost = await postApi.loadPost();
                const actionsPost = loadPostActions(dataPost);
                dispatch(actionsPost);
                if (user != null) {
                    socketServices.initializeSocket(user.id);
                    
                    // let count = 0;
                    // socketServices.on('call-count-messages-un-read', (data) => {
                    //     const actionsMessage = countMessagesUnRead(data);
                    //     dispatch(actionsMessage);
                    // });

                }
                navigation.navigate('RootComponentView');
            } else if (status == 401) {
                showAlert('Mật khẩu sai', 'Vui lòng nhập lại mật khẩu', 'Thử lại', 'Tạo tài khoản mới', navigation, 'LoginScreen', 'RegisterScreen')
            }
            else if (status == 404) {
                showAlert('Tài khoản không tồn tại', 'Có vẻ như ' + getEmail + ' không liên kết với bất kì tài khoản nào', 'Thử lại', 'Tạo tài khoản mới', navigation, 'LoginScreen', 'RegisterScreen')
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

    }
    const handleRegister = () => {
        navigation.navigate('RegisterScreen')
    }
    return (
        <View style={styles.container}>
            <Feather name='settings' style={styles.iconButtonHeaderRight} />
            <Image source={require('../images/logo.png')}
                style={styles.logo} />

            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc số điện thoại"
                    onChangeText={text => setEmail(text)}
                    value={getEmail}
                />
            </View>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    autoCapitalize="none"
                    onChangeText={text => setPassword(text)}
                    value={getPassword}
                    secureTextEntry={getShowHidePassword ? false : true} />
                <Feather style={styles.iconShowHideButton}
                    onPress={() => {
                        setShowHidePassword(!getShowHidePassword)
                    }} name={getShowHidePassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </View>
            <View style={styles.buttonContainer}>
                <RoundedIconButton title="" onPress={handleLogin} iconName="google-plus-square" color="#FF0000" />
                <RoundedIconButton title="" onPress={handleLogin} iconName="facebook-square" color="#1E90FF" />
                <RoundedIconButton title="" onPress={handleLogin} iconName="qrcode" color="#000000" />

            </View>
            <RoundedButton title="Đăng nhập" onPress={handleLogin} iconName="angle-right" color="#000000" />
            <RoundedButton title="Đăng ký" onPress={handleRegister} iconName="angle-right" color="#000000" />
        </View>
    );
};

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [getPassword, setPassword] = useState(false);
    const [getConfirmPassword, setConfirmPassword] = useState(false);
    const handleLogin = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <View style={styles.container}>
            <MaterialIcons name="arrow-back" style={styles.iconButtonHeaderLeft}
                onPress={() => {
                    navigation.navigate('LoginScreen');
                }} />

            <Image source={require('../images/logo.png')}
                style={styles.logo} />

            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc số điện thoại"
                    onChangeText={text => setUserName(text)}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    onChangeText={text => setUserName(text)}
                    value={userName}
                />
            </View>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={getPassword ? false : true} />
                <Feather style={styles.iconShowHideButton}
                    onPress={() => {
                        setPassword(!getPassword)
                    }} name={getPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </View>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu"
                    secureTextEntry={getConfirmPassword ? false : true} />
                <Feather style={styles.iconShowHideButton}
                    onPress={() => {
                        setConfirmPassword(!getConfirmPassword)
                    }} name={getConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </View>
            {/* <RoundedButton title="Đăng nhập" onPress={handleLogin} iconName="angle-right" color="#000000" /> */}
            <RoundedButton title="Đăng ký" onPress={handleLogin} iconName="angle-right" color="#000000" />
        </View>
    );
};


const RoundedIconButton = ({ title, onPress, iconName, color }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {iconName && <Icon name={iconName} style={styles.iconButton} color={color} />}
            {/* {iconName ? null : <Text style={styles.titleButton}>{title}</Text>} */}
        </TouchableOpacity>
    )
}
const RoundedButton = ({ title, onPress, iconName, color }) => {
    return (
        <TouchableOpacity style={styles.signupBtn} onPress={onPress}>
            <Text style={styles.titleButton}>{title}</Text>
            {/* <Text >{iconName && <Icon name={iconName} style={styles.iconButtonSign} color={color} />}</Text> */}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTextInput: {
        width: '70%',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 0,
        borderColor: '#ccc',
        borderRadius: 5,
        borderBottomWidth: 2
    },
    logo: {
        height: 200,
        width: 200,
        paddingBottom: 150,
        resizeMode: 'contain'
    },
    buttonContainer: {
        flexDirection: 'row', // Đặt hướng hiển thị là ngang
        justifyContent: 'space-between', // Các nút sẽ được căn cách đều nhau theo chiều ngang
        width: '60%', // Độ rộng của container chứa nút
        marginTop: 10

    },
    button: {
        borderRadius: 12,
        // backgroundColor: '#00BFFF',
        padding: 10
    },
    titleButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    iconButton: {
        fontSize: 50
    },
    iconButtonSign: {
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    signupBtn: {
        marginTop: 20,
        width: 350,
        height: 40,
        borderRadius: 30,
        borderWidth: 0, // Equivalent to border: none;
        alignItems: 'center', // Equivalent to display: flex; align-items: center;
        justifyContent: 'center', // Equivalent to display: flex; justify-content: flex-start;
        flexDirection: 'row', // React Native defaults to flexDirection: 'column', so you need to specify 'row' for aligning items horizontally
        gap: 9, // There's no direct equivalent to gap in React Native. You can use marginHorizontal or paddingHorizontal to create space between items.
        color: 'white', // Equivalent to color: white;
        backgroundColor: 'linear-gradient(to right,rgb(128, 128, 255),rgb(183, 128, 255))', // You can use LinearGradient from 'expo-linear-gradient' for gradients in React Native
        position: 'relative', // Equivalent to position: relative;
        cursor: 'pointer', // There's no direct equivalent to cursor in React Native
        shadowColor: 'rgba(0, 0, 0, 0.212)', // Equivalent to box-shadow
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5, // Equivalent to shadow on Android
    },
    iconShowHideButton: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    iconButtonHeaderRight: {
        fontSize: 30,
        position: 'absolute',
        right: 20,
        top: 60
    },
    iconButtonHeaderLeft: {
        fontSize: 40,
        position: 'absolute',
        left: 20,
        top: 60
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export { LoginScreen, RegisterScreen, LoadingScreen };
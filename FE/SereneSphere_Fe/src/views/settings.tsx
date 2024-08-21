import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Animated, Pressable, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, Text, FlatList } from "react-native";
import { MaterialIcons, Ionicons, Feather, AntDesign, Entypo, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { openStateProfile } from '../acctions/profileActions';
import { LoadingScreen } from './login';

const SettingsScreen = ({ navigation }) => {
    const [avatar, setAvatar] = useState(null);
    const [idLogin, setIdLogin] = useState(null);
    const [nameLogin, setNameLogin] = useState(null);
    const dispatch = useDispatch();

    const [dataShortcuts, setDataShortcuts] = useState(null);

    const buttons = [
        { title: 'Tài khoản và bảo mật', icon: 'security' },
        { title: 'Nhật ký hoạt động', icon: 'list' },
        { title: 'Trạng thái hoạt động', icon: 'person-outline' },
        { title: 'Thông báo', icon: 'notifications-none' },
        { title: 'Chặn', icon: 'app-blocking' },
        { title: 'Giới thiệu', icon: 'gt' },
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fullName = await AsyncStorage.getItem('AccessFullName');
                const id = await AsyncStorage.getItem('AccessId');
                const avatar = await AsyncStorage.getItem('AccessAvatar');
                if (fullName || id || avatar) {
                    setNameLogin(fullName);
                    setIdLogin(parseInt(id));
                    setAvatar(avatar);
                }
            } catch (error) {
                console.log('error useEffect in settings 1: ', error);
            }
        }
        fetchData();
    }, []);

    const OpenStateProfileScreen = (id) => {
        try {
            const actions = openStateProfile(id);
            dispatch(actions);
        } catch (error) {
            console.log('error open state profile: ' + error);
        }
    }

    const  logout = async ()=>{
        try {
            await AsyncStorage.clear();
            navigation.navigate('LoginScreen')

        } catch (error) {
            console.log('error logout: ',error);
        }
    }

    const RenderShortcuts = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={{
                    // borderWidth: 1,
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <View style={{
                            width: 65,
                            height: 65,
                            borderRadius: 60,
                            borderWidth: 1,
                            borderColor: Colors.LightGray,
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={require('../images/avata.jpg')}
                                style={{
                                    width: '99%',
                                    height: '99%',
                                    borderRadius: 50
                                }}
                            />
                        </View>
                        <View style={{
                            backgroundColor: Colors.White,
                            height: 25,
                            width: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            padding: 2
                        }}>
                            <FontAwesome5 name='user-friends' size={12} color={Colors.Dodgerblue} />
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 15,
                        marginTop: 5
                    }}>Đoàn Sỹ</Text>
                </View>

            </TouchableOpacity>
        )
    }

    const renderButton = ({ item }) => {
        return (
            <TouchableOpacity style={styles.indexButton}>
                <View style={styles.indexButtonView}>
                    <View style={styles.indexViewButton}>
                        {
                            item.icon != 'gt' ?
                                <MaterialIcons name={item.icon} style={styles.iconButton} /> :
                                <View style={{
                                    width: 35,
                                    height: 35
                                }}>
                                    <Image source={require('../images/logo.png')}
                                        style={{
                                            width: '99%',
                                            height: '99%'
                                        }}
                                    />
                                </View>
                        }
                        <Text style={styles.textViewButton}>{item.title}</Text>
                    </View>
                    <AntDesign name='right' style={styles.iconButtonRight} />
                </View>
                <View style={{
                    alignItems: 'flex-end'
                }}>
                    <View style={styles.borderBottom} />
                </View>
            </TouchableOpacity>
        );
    }
    const MemoizedShortcuts = React.memo(RenderShortcuts);
    const MemoizedButton = React.memo(renderButton);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                // paddingHorizontal:20,
                paddingTop: 10
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>Menu</Text>
            </View>
            <View style={{
                // marginBottom: 20,
                // paddingVertical: 20
                paddingTop: 20
            }}>
                <TouchableOpacity style={{
                    backgroundColor: Colors.White,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 10
                }}

                    onPress={() => { OpenStateProfileScreen(idLogin) }}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 'auto',
                    }}>
                        <TouchableOpacity style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: Colors.LightGray
                        }}
                            onPress={() => { OpenStateProfileScreen(idLogin) }}
                        >
                            <Image source={{ uri: avatar }}
                                style={{
                                    width: '99%',
                                    height: '99%',
                                    borderRadius: 50
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 20
                        }}>{nameLogin}</Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.LightGray,
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30

                    }}>
                        <AntDesign name='down' size={20}
                            style={{
                                fontWeight: 'bold'
                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            {
                dataShortcuts ?
                    <View style={{
                        paddingVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginBottom: 10

                        }}>Lối tắt của bạn</Text>
                        <FlatList
                            style={{
                                flex: 1,
                                backgroundColor: Colors.LightGray
                            }}
                            showsVerticalScrollIndicator={false}
                            data={dataShortcuts}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <MemoizedShortcuts item={item} />}
                            contentContainerStyle={{}}
                            ListFooterComponentStyle={{
                                marginTop: 10
                            }}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={21}
                            getItemLayout={(data, index) => (
                                { length: screen.width, offset: screen.width * index, index }
                            )}
                            horizontal
                        />
                        {/* <RenderShortcuts /> */}
                    </View> : <View style={{ paddingTop: 20 }} />
            }
            <View>
                {buttons.map((button, index) => (
                    <MemoizedButton key={index} item={button} />
                ))}
            </View>
         <View style={{
            flex:1,
            justifyContent:'center'
         }}>
         <TouchableOpacity style={{
                backgroundColor: Colors.LightGray,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
            }}
            onPress={()=>logout()}
            >
                <Text style={{
                    fontSize: 20
                }}>Đăng xuất</Text>
            </TouchableOpacity>
         </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Gainsboro,
        flex: 1,
        paddingHorizontal: 20
    },
    indexButton: {
        backgroundColor: Colors.White,
        paddingBottom: 15,
        // marginBottom:10
    },
    indexButtonView: {
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        flexDirection: 'row'
    },
    indexViewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },
    textViewButton: {
        fontSize: 20,
        marginLeft: 15
    },
    iconButton: {
        fontSize: 25,
        color: Colors.DeepSkyBlue
    },
    iconButtonRight: {
        fontSize: 15,
        color: Colors.Gray
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: Colors.Gainsboro,
        width: '80%',

    }
});
export { SettingsScreen }
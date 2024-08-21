import React, { Component, useState, useEffect } from 'react';
import { View, TextInput, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons, Octicons, Feather, AntDesign, Entypo, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import messagesApi from '../API/messageApi';
import socketServices from '../utils/socketService';
import { timeYear, MemoizedTimeOfTheWeek } from '../custom/time';
import { useDispatch, useSelector } from 'react-redux';
import { openStateMessages } from '../acctions/messagesActions';
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const MessageScreens = () => {
    const [dataMessages, setDataMessages] = useState([]);
    const [avatarLogin, setAvatarLogin] = useState('');
    const [nameLogin, setNameLogin] = useState('');
    const [idLogin, setIdLogin] = useState('');
    // let [countMessagesScreen, setCountMessagesScreen] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseMessages = await messagesApi.loadPhoneBook();
                const dataAvatar = await AsyncStorage.getItem('AccessAvatar');
                const nameLogin = await AsyncStorage.getItem('AccessFullName');
                const idLogin = await AsyncStorage.getItem('AccessId');
                const dataMessages = responseMessages.messages;
                if (dataMessages) {
                    setDataMessages(dataMessages);
                }
                if (dataAvatar && nameLogin && idLogin) {
                    setAvatarLogin(dataAvatar);
                    setNameLogin(getName(nameLogin));
                    setIdLogin(idLogin);
                }
            } catch (error) {
                console.log('error load messages in messagesScreen: ' + error);
            }
        }
        fetchMessages();
    }, []);

    useEffect(() => {
        try {
            const removeMessageById = (data_update_phone_book) => {
                if (dataMessages) {
                    setDataMessages(prevDataMessages =>
                        prevDataMessages.filter(item => parseInt(item.user_id) !== data_update_phone_book[0].user_id)
                    );
                    setDataMessages(prevData => [...data_update_phone_book, ...prevData])
                } else {
                    console.warn('dataMessages is null');
                }
            };
            socketServices.on('Server-send-data-phone-book-from-user', (data) => {
                removeMessageById(data);
            });
            socketServices.on('Server-send-data-phone-book-to-user', (data) => {
                removeMessageById(data);
            });
        } catch (error) {
            console.log('error load data update phone book: ', error);
        }
    }, [socketServices]);




    const openMessages = (header) => {
        try {
            const data = {
                status: true,
                header: header,
                body: []
            }
            setDataMessages(prevDataMessages =>
                prevDataMessages.map(item => {
                    if (parseInt(item.user_id) === header.user_id) {
                        item.status = true;
                    }
                    return item;
                })
            );
            const sendData = {
                sender_id: idLogin,
                to_user: header.user_id
            }
            socketServices.emit('update-status-messages', { message: sendData });
            const actions = openStateMessages(data);
            dispatch(actions);
        } catch (error) {

        }
    }

    const renderHeader = () => {
        return (
            <View>
                <TouchableOpacity style={styles.btnIpSearch}>
                    <Ionicons name='search' size={25} color={Colors.Gray} />
                    <Text style={{ fontSize: 20, color: Colors.Gray, marginLeft: 5 }}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const renderHeaderUserHorizontal = () => {
        return (
            <>
                {avatarLogin && nameLogin ?
                    <TouchableOpacity style={{
                        marginRight: 20,
                        width: 75,
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            height: 72,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: Colors.LightGray,
                            marginBottom: 5
                        }}>
                            <Image source={{ uri: avatarLogin }} style={styles.userScrollHorizontal} />

                        </View>
                        <Text style={{ fontSize: 15 }}>{nameLogin}</Text>
                    </TouchableOpacity>
                    : <></>}</>
        )
    }

    const renderUserScrollHorizontal = ({ item }) => {

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => openMessages(item)}
                style={{
                    marginRight: 20,
                    width: 75,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderWidth: 1
                }}>
                <View style={{
                    height: 72,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: Colors.LightGray,
                    marginBottom: 5
                }}>
                    <Image source={{ uri: item.avatar }} style={styles.userScrollHorizontal} />
                    {
                        item.online ?
                            <View style={styles.dotOffline}>
                                <Text style={{ fontSize: 10 }}>{timeYear(item.online)}</Text>
                                {/* <Text style={{fontSize:10}}>10p</Text> */}
                            </View> :
                            <View style={styles.dotOnline} />
                    }
                </View>
                <Text style={{ fontSize: 15 }}>{getName(item.fullname)}</Text>
            </TouchableOpacity>

        );
    }
    const renderUserScrollVertical = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => openMessages(item)}
                style={{
                    flex: 1,
                    minHeight: 75,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15,
                    // borderWidth:1
                }}>

                <View style={{
                    width: 75,
                    height: 75,
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: Colors.LightGray
                }}>
                    <Image source={{ uri: item.avatar }} style={styles.userScrollHorizontal} />
                    {
                        item.online ?
                            <View style={styles.dotOffline}>
                                <Text style={{ fontSize: 10 }}>{timeYear(item.online)}</Text>
                                {/* <Text style={{fontSize:10}}>10p</Text> */}
                            </View> :
                            <View style={styles.dotOnline} />
                    }

                </View>
                <View style={{
                    flex: 1,
                    paddingVertical: 5,
                    marginLeft: 15,
                    justifyContent: 'space-between',
                    // borderWidth:1
                }}>
                    <View style={{
                        flexDirection: 'row',
                        // borderWidth: 1,
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.fullname}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '95%',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: 'auto',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: (item.status || item.sender_id_messages == idLogin) ? Colors.Gray : Colors.Black,
                                fontWeight: (!item.status && item.sender_id_messages != idLogin && item.lastmessage) ? 'bold' : 'normal',
                            }}>
                                {idLogin == item.sender_id_messages ? 'Bạn: ' : (item.sender_id_messages != null ? (getName(item.fullname) + ': ') : '')}
                                {item.lastmessage ? item.lastmessage : 'Hãy gửi tin nhắn cho' + getName(item.fullname)}</Text>
                            {
                                item.time_message && <>
                                    <View style={{
                                        // borderWidth:1,
                                        backgroundColor: item.status ? Colors.Gray : Colors.Black,

                                        borderRadius: 50,
                                        marginTop: 10,
                                        marginHorizontal: 5,
                                        height: 4,
                                        width: 4
                                    }} />
                                    <Text style={{
                                        color: (item.status || item.sender_id_messages == idLogin) ? Colors.Gray : Colors.Black,
                                        fontWeight: (item.status || item.sender_id_messages == idLogin) ? 'normal' : 'bold',

                                    }}><MemoizedTimeOfTheWeek timeInput={item.time_message} /></Text>
                                </>
                            }
                        </View>
                        {
                            (item.status ) ?
                            (item.sender_id_messages ===  parseInt(idLogin)?
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    borderColor: Colors.LightGray
                                }}>
                                    <Image source={{ uri: item.avatar }}
                                        style={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: 50,
                                        }}
                                    />
                                </View>:'') :
                                ((item.sender_id_messages != null && item.sender_id_messages == idLogin) ?
                                    <Octicons name='check-circle-fill' size={15} color={Colors.DarkGray} />
                                    : '')
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    const MemoizedMessageVertical = React.memo(renderUserScrollVertical);
    const MemoizedMessageHorizontal = React.memo(renderUserScrollHorizontal);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        flexDirection: 'row',
                        width: 'auto',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            // borderWidth:1,
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                borderWidth: 3,
                                borderRadius: 50,
                                borderColor: Colors.White,
                                backgroundColor: Colors.Heart,
                                position: 'absolute',
                                zIndex: 1,
                                right: 0,
                                top: 0,
                                width: 18,
                                height: 18,

                            }} />

                            <TouchableOpacity style={styles.btnIconHeader}>
                                <View style={styles.headerIconList} />
                                <View style={[styles.headerIconList, { marginTop: 3 }]} />
                                <View style={[styles.headerIconList, { marginTop: 3 }]} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>Đoạn chat</Text>
                    </View>
                    <TouchableOpacity style={styles.headerIconPen}>
                        <FontAwesome5 name='pen' size={20} color={Colors.Black} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 25,
                        backgroundColor: Colors.White,
                        // flex: 1
                    }}
                    showsVerticalScrollIndicator={false}
                    data={[{ type: 'ListMessages', data: dataMessages }, { type: 'Messages', data: dataMessages }]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        item.type === 'ListMessages' ?
                            <>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={item.data}
                                    keyExtractor={(item) => item.user_id.toString()}
                                    renderItem={({ item }) => <MemoizedMessageHorizontal item={item} />}
                                    contentContainerStyle={{}}
                                    ListHeaderComponent={renderHeaderUserHorizontal}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={10}
                                    windowSize={21}
                                    getItemLayout={(data, index) => (
                                        { length: screenWidth, offset: screenWidth * index, index }
                                    )}

                                    horizontal
                                />

                                <View style={{
                                    borderBottomWidth: 2,
                                    width: '100%',
                                    borderBottomColor: Colors.LightGray,
                                    marginVertical: 15
                                }} />
                            </>
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={item.data}
                                keyExtractor={(item) => item.user_id.toString()}
                                renderItem={({ item }) => <MemoizedMessageVertical item={item} />}
                                contentContainerStyle={{
                                }}
                                initialNumToRender={10}
                                maxToRenderPerBatch={10}
                                windowSize={21}
                                getItemLayout={(data, index) => (
                                    { length: screenWidth, offset: screenWidth * index, index }
                                )}
                            />

                    )}
                    ListHeaderComponent={renderHeader}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={21}
                    getItemLayout={(data, index) => (
                        { length: screenWidth, offset: screenWidth * index, index }
                    )}
                />
            </View>
        </SafeAreaView>
    );


}
const getName = (fullName) => {
    const name = fullName.substring(fullName.lastIndexOf(' '), fullName.length);
    return name;
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: Colors.White,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        flexDirection: 'row',
        paddingTop: 10
    },
    btnIconHeader: {
        borderRadius: 50,
        backgroundColor: Colors.Gainsboro,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1

    },
    headerIconList: {
        borderBottomWidth: 2,
        width: 20
    },
    headerIconPen: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: Colors.Gainsboro,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnIpSearch: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderRadius: 50,
        marginVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.Gainsboro
    },
    userScrollHorizontal: {
        width: 'auto',
        height: 'auto',
        // flex:1,
        minWidth: 70,
        minHeight: 70,
        borderRadius: 50,

    },
    dotOnline: {
        width: 22,
        height: 22,
        borderColor: Colors.White,
        borderWidth: 4,
        borderRadius: 50,
        backgroundColor: Colors.LimeGreen,
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    dotOffline: {
        width: 'auto',
        minWidth: 35,
        paddingHorizontal: 5,
        height: 25,
        borderColor: Colors.White,
        borderWidth: 4,
        borderRadius: 50,
        backgroundColor: Colors.PaleGreen,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: -5,
        bottom: -3
    }

});
export { MessageScreens }
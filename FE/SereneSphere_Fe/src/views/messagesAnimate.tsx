import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, FlatList, TextInput, Animated, ActivityIndicator, Pressable, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native";
import { Ionicons, Octicons, MaterialIcons, Feather, AntDesign, Entypo, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../reducers';
import { openStateMessages } from '../acctions/messagesActions';
import messagesApi from '../API/messageApi';
import socketServices from '../utils/socketService';
import { timeYear, MemoizedTimeOfTheWeek } from '../custom/time';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MessagesAnimate = ({ height }) => {
    const slide = useRef(new Animated.Value(height)).current;
    const [textContent, setTextContent] = useState('');
    const dispatch = useDispatch();
    const dataHeader = useSelector((state: RootState) => state.messages.openStateMessages).header;
    const [dataMessages, setDataMessages] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [idLogin, setIdLogin] = useState(null);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        const init = async () => {
            try {
                const responseMessages = await messagesApi.loadListMessages(dataHeader.user_id);
                const id = await AsyncStorage.getItem('AccessId');
               
                if (id) {
                    setIdLogin(id);
                    socketServices.emit('count-messages-un-read', { message:id });
                }
                if (responseMessages) {
                    setDataMessages(responseMessages.messages);
                    setLoading(false);
                }
            } catch (error) {
                console.log('error load data messagesReducer!: ' + error);
            }
        };
        init();
    }, []);

    useEffect(() => {
        let lastOffsetY = 0;
        const listener = scrollY.addListener(({ value }) => {

            if (value < lastOffsetY) {
                setIsButtonVisible(true); // Scroll lên
            }
            // else if (value > lastOffsetY) {
            //     setIsButtonVisible(false); // Scroll xuống
            // }
            lastOffsetY = value;
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY]);
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        scrollY.setValue(offsetY);

        if (offsetY + scrollViewHeight >= contentHeight - 20) {
            setIsButtonVisible(false);
        }
    };

    const scrollToEnd = () => {
        flatListRef.current.scrollToEnd({ animated: true });
    };

    const sendMessages = () => {
        try {
            const data = {
                content: textContent,
                time: new Date(),
                sender_id: idLogin,
                type: 'text',
                to_user: dataHeader.user_id
            }
            socketServices.emit('send-messages', { message: data });
            inputRef.current.focus();
        } catch (error) {
            console.log('error send messages: ' + error);
        }
    }
    useEffect(() => {
        try {
            const socket = async()=>{
               const id_login = await AsyncStorage.getItem('AccessId');
                socketServices.on('Server-send-data-messages', (data) => {
                    setDataMessages(prevData => [...prevData, ...data.messages]);
                    // scrollToEnd();
                 
                    setTextContent('');
                    const sendData ={
                        sender_id:id_login,
                        to_user:dataHeader.user_id
                    }
                        socketServices.emit('update-status-messages',{message:sendData});
                        socketServices.emit('count-messages-un-read',{message:dataHeader.user_id});
                    // }
                    
                });
            }
            socket();
        } catch (error) {
            console.log('error useEffect send messages: ' + error);
        }
    }, [socketServices])

    const slideUp = () => {
        // Will change slide up the bottom sheet
        Animated.timing(slide, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        // Will slide down the bottom sheet
        Animated.timing(slide, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    React.useEffect(() => {
        slideUp();

    })


    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            const data = {
                status: false,
                header: [],
                body: []
            }
            const actions = openStateMessages(data);
            dispatch(actions);
        }, 200)

    }
    const renderMessages = ({ item }) => {
        const [isSendTime, setSendTime] = useState(false);

        const showSendTime = () => {
            const check = isSendTime ? false : true;
            setSendTime(check);
        }

        return (
            <>
                {
                    item.day != null ?
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth:1
                            marginBottom: 5,
                            marginTop:20
                        }}>
                            <Text style={{
                                color: Colors.Gray,
                                // fontSize:12
                            }}>
                            <MemoizedTimeOfTheWeek timeInput={item.day} />
                            </Text>
                        </View> : ''
                }

                {item.user_id == idLogin ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => showSendTime()}
                        style={{
                            width: '100%',
                            padding: 5, // Tạo khoảng cách giữa khung và nội dung
                            alignItems: 'flex-end', // Đảm bảo các phần tử con căn chỉnh về phía bên phải
                            // marginBottom:10
                            // borderWidth:1,
                        }}>
                            {
                                isSendTime?
                                <Text style={{
                                    color: Colors.Gray,
                                    
                                }}><MemoizedTimeOfTheWeek timeInput={item.send_time} />
                                </Text>:''
                            }
                        
                        <View style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderTopRightRadius: 25,
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            borderBottomRightRadius: 0,
                            backgroundColor: Colors.Dodgerblue,
                            maxWidth: '70%' // Đảm bảo nội dung không vượt quá 70% chiều rộng màn hình
                        }}>
                            <Text style={{
                                flexWrap: 'wrap',
                                fontSize: 20,
                                color: Colors.White,
                            }}>
                                {item.content}
                            </Text>
                        </View>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => showSendTime()}
                        style={{
                            width: '100%',
                            padding: 5, // Tạo khoảng cách giữa khung và nội dung
                            alignItems: 'flex-start', // Đảm bảo các phần tử con căn chỉnh về phía bên phải
                            flexDirection: 'row'
                        }}>
                        <View style={{
                            width: 52,
                            height: 52,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 52,
                            borderColor: Colors.LightGray,
                            marginRight: 5
                        }}>
                            <Image source={{ uri: item.avatar }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50
                                }}
                            />
                            {
                                dataHeader.online ? '' :
                                    <View style={{
                                        borderWidth: 3,
                                        width: 15,
                                        height: 15,
                                        backgroundColor: Colors.LimeGreen,
                                        borderRadius: 50,
                                        borderColor: Colors.White,
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0
                                    }} />
                            }
                        </View>
                        <View style={{
                            width: '100%', 
                            alignItems: 'flex-start', // flexDirection: 'row'
                        }}>
                            { isSendTime &&
                                <Text style={{
                                    color: Colors.Gray,
                                }}><MemoizedTimeOfTheWeek timeInput={item.send_time} />
                                </Text>
                            }
                            <View style={{
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderTopRightRadius: 25,
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 25,
                                backgroundColor: '#555555',
                                maxWidth: '70%', // Đảm bảo nội dung không vượt quá 70% chiều rộng màn hình
                                //    flexDirection:'column'
                            }}>
                                <Text style={{
                                    flexWrap: 'wrap',
                                    fontSize: 20,
                                    color: Colors.White,
                                    // borderWidth:1
                                }}>
                                    {item.content} </Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                }
                {
                    item.status == true &&
                    <View style={{
                        // borderWidth: 1,
                        alignItems: "flex-end",
                        justifyContent: 'center',
                        marginRight: 10,
                        marginBottom: 10
                        // position:'absolute'
                    }}>
                        <View style={{
                            width: 22,
                            height: 22,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: Colors.LightGray,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Image source={{ uri: item.avatar }} style={{
                                width: 20,
                                height: 20,
                                borderRadius: 50
                            }} />
                        </View>
                    </View>
                }

            </>

        )
    }
    const renderHeaderMessages = () => {
        return (
            <View style={{
                backgroundColor: Colors.White,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        // flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                    <View style={{
                        width: 150,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 150,
                        borderColor: Colors.LightGray
                    }}>
                        <Image source={{ uri: dataHeader.avatar }} style={{
                            width: '99%',
                            height: '99%',
                            borderRadius: 150,
                        }} />

                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginTop: 10
                    }}>{dataHeader.fullname}</Text>
                    <Text style={{
                        fontSize: 15
                    }}>Sereneshere</Text>
                    <Text style={{ color: Colors.Gray }}>Các bạn là bạn bè trên Sereneshere</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            // borderWidth:1,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginTop: 10,
                            borderRadius: 20,
                            backgroundColor: Colors.Gainsboro
                        }}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>XEM TRANG CÁ NHÂN</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

        );
    }

    const MemoizedMessages = React.memo(renderMessages);
    const MemoizedHeaderMessages = React.memo(renderHeaderMessages);

    return (

        <Pressable style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.LightGray
                        // borderWidth: 1
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Pressable
                                onPress={() => closeModal()}
                                style={({ pressed }) => [
                                    {
                                        height: 40,
                                        width: 40,
                                        borderColor: Colors.White,
                                        borderRadius: 50,
                                        padding: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: pressed ? Colors.Gainsboro : null,
                                        // marginRight: 15,
                                        opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                                        transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                                    }
                                ]}>
                                <MaterialIcons name="arrow-back" size={30}
                                    style={styles.btnIconHeader}

                                />
                            </Pressable>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <View style={styles.viewAvatarHeader}>
                                    <Image source={{ uri: dataHeader.avatar }} style={styles.avatarHeader} />
                                    {
                                        dataHeader.online ? '' :
                                            <View style={{
                                                borderWidth: 3,
                                                width: 15,
                                                height: 15,
                                                backgroundColor: Colors.LimeGreen,
                                                borderRadius: 50,
                                                borderColor: Colors.White,
                                                position: 'absolute',
                                                right: 0,
                                                bottom: 0
                                            }} />
                                    }
                                </View>
                                <View style={{
                                    marginLeft: 10,
                                    justifyContent: 'space-between',
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        // fontSize: 20,
                                        fontWeight: 'bold',

                                    }}>{dataHeader.fullname}</Text>
                                    <Text style={{
                                        color: Colors.Gray,
                                        fontSize: 12
                                    }}>Hoạt động {timeYear(dataHeader.online)} trước</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: 130
                        }}>
                            <TouchableOpacity
                                activeOpacity={1}>
                                <FontAwesome name='phone' size={25} style={styles.btnIconHeader} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}>
                                <FontAwesome name='video-camera' size={25} style={styles.btnIconHeader} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}>
                                <FontAwesome6 name='circle-info' size={25} style={styles.btnIconHeader} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        dataHeader.lastmessage ? (
                            dataMessages ?
                                <>
                                    <FlatList
                                        style={{
                                            backgroundColor: Colors.White,
                                            flex: 1,
                                        }}
                                        ref={flatListRef}
                                        showsVerticalScrollIndicator={false}
                                        data={dataMessages}
                                        ListHeaderComponent={() =>
                                            <View style={{
                                                marginTop: 80,
                                                marginBottom: 20
                                            }}>
                                                <MemoizedHeaderMessages />
                                            </View>
                                        }
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => <MemoizedMessages item={item} />}
                                        contentContainerStyle={{
                                            // marginb:10
                                        }}
                                        initialNumToRender={dataMessages.length}
                                        maxToRenderPerBatch={dataMessages.length}
                                        windowSize={dataMessages.length}
                                        getItemLayout={(data, index) => (
                                            { length: dataMessages.length, offset: screenWidth * index, index }
                                        )}
                                        onEndReachedThreshold={0.1}
                                        onScroll={handleScroll} // Bắt sự kiện cuộn
                                        scrollEventThrottle={16} // Điều chỉnh tần suất sự kiện onScroll, 16ms cho 60fps
                                        onContentSizeChange={() => scrollToEnd()} // Cuộn xuống cuối khi nội dung thay đổi
                                    />
                                    {
                                        isButtonVisible &&
                                        <View style={{
                                            alignItems: 'center'
                                        }}>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => scrollToEnd()}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    borderWidth: 1,
                                                    padding: 2,
                                                    borderRadius: 50,
                                                    backgroundColor: Colors.White,
                                                    borderColor: Colors.LightGray,
                                                    marginBottom: 10,
                                                }}>
                                                <AntDesign name='arrowdown' size={30} />
                                            </TouchableOpacity>
                                        </View>
                                    }

                                </>
                                :
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ActivityIndicator size={60} color={Colors.Silver} />
                                </View>
                        )
                            :
                            <MemoizedHeaderMessages />

                    }
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: 'auto',
                        padding: 10,
                        borderTopWidth: 1,
                        borderTopColor: Colors.LightGray
                    }}>
                        <View style={{
                            width: '75%',
                            // borderWidth:1,
                            padding: 5
                        }}>
                            <TextInput
                                ref={inputRef}
                                placeholder='Nhắn tin'
                                onChangeText={text => setTextContent(text)}
                                value={textContent}
                                style={{
                                    width: '100%'
                                }}

                            />
                        </View>
                        {
                            textContent ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => sendMessages()}
                                >
                                    <Octicons name="paper-airplane" size={30} color={Colors.DeepSkyBlue} />
                                </TouchableOpacity>
                                :
                                <>
                                    <TouchableOpacity>
                                        <Feather name='image' size={30} color={Colors.DeepSkyBlue} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <AntDesign name='like1' size={30} color={Colors.DeepSkyBlue} />
                                    </TouchableOpacity>
                                </>
                        }

                    </View>
                </View>

            </Animated.View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        left: 0,
        // justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.White,
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        // paddingHorizontal: 25
    },
    viewAvatarHeader: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: Colors.LightGray
    },
    avatarHeader: {
        width: '99%',
        height: '99%',
        borderRadius: 50
    },
    btnIconHeader: {
        color: Colors.Fuchsia
    }

});
export { MessagesAnimate }
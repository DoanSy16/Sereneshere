import React, { useState, useRef, useEffect, } from 'react';
import { View, ActivityIndicator, FlatList, TextInput, Animated, Pressable, PanResponder, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { Ionicons, MaterialIcons, Feather, AntDesign, Entypo, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import { useDispatch, useSelector } from 'react-redux';
import { openStateComment } from '../acctions/commentActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commentApi from '../API/commentApi';
import { RootState } from '../reducers';
import { timer } from '../custom/time';
import { Emoji } from './home';
import { Laugh, Heart, Sad } from '../custom/emojis';


const Comment = ({ height }) => {
    const slide = useRef(new Animated.Value(height)).current;
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [dataComments, setDataComments] = useState(null);
    const [statusData, setStatusData] = useState(false);
    const [arrayEmojis, setArrayEmojis] = useState([]);

    const dispatch = useDispatch();
    const dataCommentReducer = useSelector((state: RootState) => state.comment.openComment);
    useEffect(() => {

        const init = async () => {
            try {
                console.log('dataCommentReducer.post_id: ' + dataCommentReducer.post_id)
                const data = {
                    idPost: dataCommentReducer.post_id,
                    idComment: 0
                }
                if (dataCommentReducer.emojis) {
                    let array = [];
                    array.push(dataCommentReducer.emojis[0]);
                    dataCommentReducer.emojis[1] ? array.push(dataCommentReducer.emojis[1]) : '';
                    dataCommentReducer.emojis[2] ? array.push(dataCommentReducer.emojis[2]) : '';

                    setArrayEmojis(array);
                }
                const response = await commentApi.loadComment(data);
                if (response) {
                    // console.log('response: '+response)
                    setDataComments(response);
                } else {
                    setStatusData(true);
                }
            } catch (error) {
                console.log('error in post load avatar or fullname!: ' + error);
            }
        };
        init();
        slideUp();
    }, [dataCommentReducer.post_id]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dy: slide }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, { dy }) => {
                if (dy > 150) { // khoảng cách kéo đủ để đóng modal //Khi người dùng thả tay ra sau khi kéo, hàm này sẽ kiểm tra khoảng cách kéo (dy). Nếu dy lớn hơn một giá trị nhất định (ví dụ: 150), modal sẽ đóng lại. Nếu không, modal sẽ trở về vị trí ban đầu.
                    closeModal();
                } else {
                    Animated.spring(slide, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;



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


    // useEffect(() => {
    //     slideUp();
    //     // init();
    //     // console.log('length: '+dataComments.length())
    // })


    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            // setStatus(false);
            const actions = openStateComment({
                status: false,
                user_id: null,
                post_id: null,
                emojis: [],
                isInterested: 0
            });
            dispatch(actions);
        }, 200)

    }
    return (
        <Pressable style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}  {...panResponder.panHandlers}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.LightGray
                }}>
                    {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>

                        <View style={[styles.iconCountPost, { backgroundColor: Colors.Heart, position: 'absolute', left: 21 }]}>
                            <AntDesign name='heart' size={12} style={{ color: Colors.White }} />
                        </View>
                        <View style={[styles.iconCountPost, { backgroundColor: Colors.Blue }]}>
                            <AntDesign name='like1' size={12} style={{ color: Colors.White }} />
                        </View>
                        <Text style={{
                            fontSize: 18,
                            color: Colors.Gray,
                            marginLeft: 25
                        }}>1</Text>
                        <TouchableOpacity>
                            <AntDesign name='right' size={18} style={{ color: Colors.Black }} />
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            arrayEmojis &&
                            <View style={{
                                width: 'auto',
                                // borderWidth:1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>

                                {
                                    arrayEmojis.includes(1) &&
                                    <View style={[styles.iconCountPost, { backgroundColor: Colors.Blue }]}>
                                        <AntDesign name='like1' size={12} style={{ color: Colors.White }} />
                                    </View>
                                }
                                {
                                    arrayEmojis.includes(2) &&
                                    <View style={[styles.iconCountPost, { backgroundColor: Colors.Heart, left: -6 }]}>
                                        <AntDesign name='heart' size={12} style={{ color: Colors.White }} />
                                    </View>
                                }


                                {
                                    arrayEmojis.includes(3) &&
                                    <View style={[styles.iconCountPost, { left: -11 }]}>
                                        <Laugh checkHomeScreen={true} />
                                    </View>
                                }

                                {
                                    arrayEmojis.includes(4) &&
                                    <View style={[styles.iconCountPost, { left: -15 }]}>
                                        <Sad checkHomeScreen={true} />
                                    </View>
                                }
                            </View>
                        }
                        <Text style={{ fontSize: 16, color: Colors.Gray, marginLeft: arrayEmojis.length > 1 ? arrayEmojis.length == 2 ? -5 : -10 : 0 }}>{dataCommentReducer.countInterested}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <AntDesign name='right' size={18} style={{ color: Colors.Black }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={1}>
                        {/* <AntDesign name='like2' size={25} style={{ color: Colors.Black }} /> */}
                        <Emoji emoji={dataCommentReducer.isInterested} checkHomeScreen={true} checkCommentScreen={false} />
                    </TouchableOpacity>
                </View>
                {(dataComments && statusData == false) ?
                    <FlatList
                        style={{ flex: 1, marginTop: 10 }}
                        showsVerticalScrollIndicator={false}
                        data={dataComments}
                        keyExtractor={(item) => item.comment_id.toString()}
                        // ListHeaderComponent={renderHeader}
                        renderItem={({ item }) => <MemoizedComment item={item} id={dataCommentReducer.user_id} />}
                        // renderItem={Post}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={21}
                        getItemLayout={(data, index) => (
                            { length: 400, offset: 400 * index, index }
                        )}
                    />

                    :
                    (statusData ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.5,
                            // borderWidth: 1
                        }}>
                            <FontAwesome6 name='comments' size={150} color={Colors.Gainsboro} />
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: Colors.DarkGray,
                                marginTop: 15
                            }}>Chưa có bình luận nào</Text>
                            <Text style={{
                                fontSize: 18,
                                color: Colors.DarkGray
                            }}>Hãy là người đầu tiên bình luận</Text>
                        </View>
                        : <View style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size={50} color={Colors.Silver} />
                        </View>)}
                {/* <CommentList item={{}} /> */}
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTopWidth: 1,
                    padding: 10,
                    borderTopColor: Colors.LightGray,
                    backgroundColor: Colors.White
                }}>
                    <TextInput
                        placeholder='Viết bình luận...'
                        style={{
                            height: 40,
                            borderColor: Colors.LightGray,
                            borderWidth: 1,
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            fontSize: 15
                        }}
                    />
                </View>

            </Animated.View>
        </Pressable>
    );
}
const CommentList = ({ item, id }) => {
    const [statusComment, setStatusComment] = useState(true);
    const [dataCommentsReply, setDataCommentsReply] = useState(null);
    const renderComments = async (id, data) => {
        try {
            setStatusComment(false);
            setDataCommentsReply(data);
        } catch (error) {

        }
    }
    return (
        <View style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            // flex:1

        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        borderWidth: 2,
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        borderColor: Colors.Gainsboro
                    }}>
                    <Image style={{
                        flex: 1,
                        borderRadius: 50,
                    }} source={{ uri: item.avatar_comment }} />
                </TouchableOpacity>
                <View style={{
                    marginStart: 15,
                    // width: 'auto',
                    width: 'auto',

                }}>
                    <View style={{
                        justifyContent: 'space-between',
                        height: undefined,
                        width: 'auto',
                        backgroundColor: Colors.Gainsboro,
                        padding: 10,
                        borderRadius: 10,
                        // borderWidth:1
                    }}>
                        {item.user_id == id ?
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '22%'
                            }}>
                                <FontAwesome5 name='pen' color={Colors.Gray} size={13} />
                                <Text style={{ fontSize: 13, color: Colors.Gray }}>Tác giả</Text>
                            </View> : ''

                        }


                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',

                            }}>{item.fullname_comment}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15 }}>{item.content_comment}</Text>
                    </View>


                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                // borderWidth: 1
            }}>
                <View style={{
                    marginTop: 10,
                    width: '65%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 15, color: Colors.Gray }}>{timer(item.date_comment)}</Text>
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={{ fontSize: 15, color: Colors.Gray }}>Thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={{ fontSize: 15, color: Colors.Gray }}>Phản hồi</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: Colors.Gray }}>1</Text>
                        <View style={{
                            // flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                width: 25,
                                height: 25,
                                borderRadius: 50,
                                borderWidth: 3,
                                borderColor: Colors.White,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.Heart,
                                // position: 'absolute',
                                left: 5
                            }}>
                                <AntDesign name='heart' size={10} style={{ color: Colors.White }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {item.reply_comment ? <View style={{
                borderLeftWidth: 4,
                borderBottomWidth: 4,
                height: 95,
                width: 25,
                position: 'absolute',
                top: 55,
                left: 34,
                borderBottomLeftRadius: 10,
                borderColor: Colors.Gainsboro
            }} /> : ''}
            {(item.reply_comment && item.reply_comment.length > 1) ?
                <View style={{
                    borderLeftWidth: 4,
                    borderBottomWidth: 4,
                    height: 100,
                    width: 25,
                    position: 'absolute',
                    top: 90,
                    left: 34,
                    borderBottomLeftRadius: 10,
                    borderColor: Colors.Gainsboro
                }} /> : ''
            }


            <View >
                {statusComment && item.reply_comment ?
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20,
                        marginLeft: 15
                    }}>
                        <TouchableOpacity 
                        
                        activeOpacity={1}
                        style={{
                            width: '80%',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} onPress={() => renderComments(1, item.reply_comment)}>
                            <View style={{
                                borderWidth: 2,
                                width: 42,
                                height: 42,
                                borderRadius: 50,
                                borderColor: Colors.Gainsboro
                            }}>
                                <Image source={{ uri: item.reply_comment[0].avatar_comment }} style={{
                                    width: 'auto',
                                    height: '100%',
                                    borderRadius: 50
                                }} />
                            </View>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>{item.reply_comment[0].fullname_comment}</Text>
                            <Text style={{
                                marginLeft: 5,
                                width: '50%',
                            }} numberOfLines={1}>{item.reply_comment[0].content_comment} </Text>

                        </TouchableOpacity>

                        {item.reply_comment.length > 1 ?
                            <TouchableOpacity 
                            activeOpacity={1}
                            style={{
                                width: '78%',
                                height: undefined,
                                marginTop: 10,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>Xem 2 phản hồi khác</Text>
                            </TouchableOpacity> : ''
                        }

                    </View> : ''


                }
                <FlatList
                    style={{ height: undefined, marginTop: 10, marginLeft: 30 }}
                    showsVerticalScrollIndicator={false}
                    data={dataCommentsReply}
                    keyExtractor={(item) => item.comment_id.toString()}
                    // ListHeaderComponent={renderHeader}
                    renderItem={({ item }) => <MemoizedComment item={item} id={id} />}
                    // renderItem={Post}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={21}
                    getItemLayout={(data, index) => (
                        { length: 400, offset: 400 * index, index }
                    )}
                />


            </View>
        </View>

    );
}
const MemoizedComment = React.memo(CommentList);
const styles = StyleSheet.create({
    container: {

    },
    backdrop: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        left: 0,
        // justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.White,
        // borderWidth:
    },
    textArea: {
        height: 'auto',
        justifyContent: "flex-start",
        alignItems: 'center',
        // textAlignVertical: 'center',
        textAlign: 'center',
        padding: 10,
        borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 25
    },
    iconCountPost: {
        width: 28,
        height: 28,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export { Comment }
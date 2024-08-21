import React, { useRef, useEffect, useState } from 'react';
import { View, StatusBar, TextInput, Pressable, Animated, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, Feather, AntDesign, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import postApi from '../API/postApi';
import messagesApi from '../API/messageApi';
import { timeYear, time_birthday } from '../custom/time';
// import { Dispatch } from 'redux';
import { MemoizedPost } from './home';
import { useDispatch, useSelector } from 'react-redux';
import { openStateProfile } from '../acctions/profileActions';
import { RootState } from '../reducers';

const screen = Dimensions.get('window');

// const ProfileScreen =()=>{
//     return ( 
//     <SafeAreaView style={{
//         flex: 1,
//         position:'absolute',
//         right:0,
//         left:0,
//         top:0,
//         bottom:0,
//         backgroundColor:Colors.White,

//         }}>
//         <View style={styles.container}>
//             <Text>ProfileScreen</Text>
//         </View>
//       </SafeAreaView>);

// }

const ProfileScreen = ({ height }) => {
    const slide = useRef(new Animated.Value(500)).current;
    const AnimatedHeaderValue = new Animated.Value(0);
    const [profileHeader, setProfileHeader] = useState(null);
    const [dataProfile, setDataProfile] = useState([]);
    const [statusBarColor, setStatusBarColor] = useState(Colors.transparent);
    const data_id_profile = useSelector((state: RootState) => state.profile.profile_id);
    const Header_Max_Height = 80;
    const Header_Min_Height = 0;
    const animatedHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Colors.transparent, Colors.White],
        extrapolate: 'clamp'
    });
    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
        inputRange: [0, Header_Max_Height - Header_Min_Height],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp'
    })

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [isShowBody, setShowBody] = useState('post');


    const [page, setPage] = useState(0);

    useEffect(() => {
        const listenerId = AnimatedHeaderValue.addListener(({ value }) => {
            const interpolatedColor = (animatedHeaderBackgroundColor as any).__getValue();
            // console.log('interpolatedColor: ',interpolatedColor)
            setStatusBarColor(interpolatedColor);
        });

        return () => {
            AnimatedHeaderValue.removeListener(listenerId);
        };
    }, [AnimatedHeaderValue, animatedHeaderBackgroundColor]);


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
    }, []);

    useEffect(() => {
        try {
            const fetchAllData = async () => {
                try {
                    const responseMessage = await messagesApi.loadListFriendMessages(data_id_profile);
                    const responsePost = await postApi.loadPostProfile(data_id_profile);
                    if (responseMessage) {
                        setProfileHeader(responseMessage[0]);
                    }
                    if (responsePost) {
                        setDataProfile(responsePost.posts);
                    }

                } catch (error) {
                    console.log('error fetchAllData profile: ', error)
                }
            }
            fetchAllData();

        } catch (error) {
            console.log('error useEffect profile: ', error);
        }
    }, [data_id_profile])
    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            const actions = openStateProfile(0);
            setDataProfile([]);
            dispatch(actions);
        }, 200)

    }
    const showBody = (type) => {
        // setShowBody(isShowBody ? false : true);
        setShowBody(type);
    }
    const OpenStateProfileScreen = (id) => {
        try {
            const actions = openStateProfile(id);
            dispatch(actions);
        } catch (error) {
            console.log('error open state profile: ' + error);
        }
    }
    const renderHeader = () => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: Colors.White,
                    paddingBottom: 20
                }}>
                    <View style={{
                        width: '100%',
                        height: 310
                    }}>
                        <Image source={{ uri: profileHeader.thumb }}
                            style={{
                                height: 250,
                                width: '100%'
                            }}
                            resizeMode='cover'
                        />
                        <TouchableOpacity
                            style={{
                                borderWidth: 3,
                                borderRadius: 25,
                                padding: 1,
                                backgroundColor: Colors.LightGray,
                                borderColor: Colors.White,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                position: 'absolute',
                                right: 15,
                                top: 185
                            }}>
                            <Entypo name='camera' size={25} />
                        </TouchableOpacity>
                        <View style={{
                            position: 'absolute',
                            left: 10,
                            top: 100
                        }}>
                            <View style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: Colors.Gainsboro,
                                padding: 1,

                            }}>
                                <Image source={{ uri: profileHeader.avatar }}
                                    style={{
                                        width: '99%',
                                        height: '99%',
                                        borderRadius: 100,
                                        borderColor: Colors.White,
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 4,
                                    borderRadius: 25,
                                    padding: 1,
                                    backgroundColor: Colors.LightGray,
                                    borderColor: Colors.White,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    position: 'absolute',
                                    right: 10,
                                    top: 140
                                    // bottom: 40
                                }}>
                                <Entypo name='camera' size={25} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <View >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    marginRight: 5
                                }}>{profileHeader.fullname}</Text>
                                <AntDesign name='right' size={20} />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <Text style={{
                                    marginRight: 5,
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>{profileHeader.count_friend}</Text>
                                <Text style={{
                                    fontSize: 15,
                                }}>bạn bè</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.LightGray,
                            flexDirection: 'row',
                            width: '70%',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 5
                        }}>
                            <FontAwesome5 name='pen' size={15} color={Colors.Black} />
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>Chỉnh sửa trang cá nhân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.LightGray,
                            height: 40,
                            marginLeft: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 5
                        }}>
                            <Entypo name='dots-three-horizontal' size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    backgroundColor: Colors.White,
                    marginTop: 10,
                    // height: 100,


                }}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderColor: Colors.LightGray,
                        padding: 20,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity
                            onPress={() => showBody('post')}
                            style={[
                                {
                                    width: 70,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5,
                                },
                                isShowBody == 'post' ? {
                                    borderRadius: 20,
                                    backgroundColor: Colors.DeepSkyBlue
                                } : {}
                            ]}>
                            <Text style={{
                                fontSize: 15,
                                color: isShowBody == 'post' ? Colors.lightskyblue : Colors.Gray,
                                fontWeight: 'bold'
                            }}>
                                Bài viết
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => showBody('images')}
                            style={[
                                {
                                    width: 70,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5,
                                    marginLeft: 10
                                },
                                isShowBody == 'post' ? {} :
                                    {
                                        borderRadius: 20,
                                        backgroundColor: Colors.DeepSkyBlue
                                    }
                            ]}>
                            <Text style={{
                                fontSize: 15,
                                color: isShowBody == 'post' ? Colors.Gray : Colors.lightskyblue,
                                fontWeight: 'bold'
                            }}>
                                Ảnh
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isShowBody == 'post' ?
                            <MemoizedInfFriend /> :
                            <MemoizedListImages />
                    }

                </View>
            </View>

        )
    }
    const renderInfFriend = () => {
        return (
            <View style={{
                // paddingHorizontal:20
                padding: 20
            }}>
                <View style={{
                    height: 50,
                    justifyContent: 'space-between',
                    // borderWidth:1
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'

                    }}>Bạn bè</Text>
                    <Text style={{
                        color: Colors.Gray
                    }}>{profileHeader.count_friend} người bạn</Text>
                </View>
                <View style={{

                    flexWrap: 'wrap',
                    flexDirection: 'row', // Thiết lập flexDirection là row để các phần tử sắp xếp theo hàng ngang
                    justifyContent: 'space-between',
                }}>

                    {profileHeader.list_friends.slice(0, 6).map((item, index) => (
                        <MemoizedListFriends item={item} key={index} />
                    ))}

                </View>
                <TouchableOpacity style={{
                    backgroundColor: Colors.Gainsboro,
                    borderRadius: 5,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 3,
                    marginTop: 15
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const renderListImages = () => {
        return (
            <>
                {
                    profileHeader.list_image ?
                        <View style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row', // Thiết lập flexDirection là row để các phần tử sắp xếp theo hàng ngang
                            justifyContent: 'space-between',
                            backgroundColor: Colors.LightGray,
                            paddingTop: 10
                        }}>
                            {profileHeader.list_image.map((item, index) => (
                                <MemoizedItemImage item={item} key={index} />
                            ))}
                        </View> :
                        <View style={{
                            backgroundColor: Colors.LightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 200
                        }}>
                            <Text style={{
                                color: Colors.Gray,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Không có ảnh nào</Text>
                        </View>

                }
            </>
        );
    }
    const renderFooter = () => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: Colors.White,
                // paddingHorizontal:10,
                // padding: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingTop: 10
                }}>
                    <View style={{
                        width: 45,
                        height: 45,
                        borderRadius: 45,
                        borderColor: Colors.Gainsboro,
                        borderWidth: 1
                    }}>
                        <Image source={{ uri: profileHeader.avatar }}
                            style={{
                                width: '99%',
                                height: '99%',
                                borderRadius: 45
                            }} />
                    </View>
                    <View style={{
                        marginLeft: 5
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                        >{profileHeader.fullname}</Text>
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 5,
                            color: Colors.Gray
                        }}>
                            {time_birthday(profileHeader.birthday)}</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 85,
                    marginVertical: 10
                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: Colors.Blue,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MaterialCommunityIcons name='teddy-bear' size={40} color={Colors.White} />
                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        {time_birthday(profileHeader.birthday)}
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.LightGray,
                    height: 50
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: Colors.Gray
                    }}>Không có bài viết</Text>
                </View>
            </View>
        )
    }
    const standardize_the_string = (str) => {
        const lastWhitespaceIndex = str.lastIndexOf(' ');
        const secondLastWhitespaceIndex = str.lastIndexOf(' ', lastWhitespaceIndex - 1);
        return str.substring(secondLastWhitespaceIndex + 1);
    }
    const renderListFriends = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => OpenStateProfileScreen(item.user_id)}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,

                }}>
                <View style={{
                    width: 115,
                    height: 115,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.LightGray,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5
                }}>
                    <Image source={{ uri: item.avatar }} style={{
                        height: '99%',
                        width: '99%',
                        borderRadius: 10
                    }} />
                </View>
                <Text style={{ fontWeight: 'bold' }}>{standardize_the_string(item.fullName)}</Text>
            </TouchableOpacity>
        )
    }
    const renderItemImage = ({ item }) => {
        return (
            <TouchableOpacity style={{
                width: 130,
                height: 110,
                // marginRight:5,
                marginBottom: 10,
                backgroundColor: Colors.White
                // borderWidth:1
            }}>
                <Image source={{ uri: item.link_image }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />

            </TouchableOpacity>
        )
    }
    const getWidthImage = ({ imageUrl }) => {
        Image.getSize(
            imageUrl,
            (width, height) => {
                console.log('width: ', width)
                return width;
            },
            (error) => {
                console.error(`Failed to get image size: ${error}`);
                return 0;
            }
        );
    }
    const getHeightImage = ({ imageUrl }) => {
        Image.getSize(
            imageUrl,
            (width, height) => {
                return height;
            },
            (error) => {
                console.error(`Failed to get image size: ${error}`);
                return 0;
            }
        );
    }

    const MemoizedListFriends = React.memo(renderListFriends);
    const MemoizedInfFriend = React.memo(renderInfFriend);
    const MemoizedListImages = React.memo(renderListImages);
    const MemoizedItemImage = React.memo(renderItemImage);

    return (
        <Pressable style={styles.backdrop}>
            {
                dataProfile &&
                <StatusBar
                    translucent={true} // Cho phép StatusBar hiển thị trên nội dung
                    backgroundColor={statusBarColor} // Màu nền động cho StatusBar
                // barStyle="light-content"
                />
            }
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateX: slide }] }]}>

                <Animated.View style={{
                    // height: animatedHeaderHeight,
                    backgroundColor: animatedHeaderBackgroundColor, // Make sure this is correctly animated
                    position: 'absolute',
                    width: '100%', // Added width to cover the entire bottom sheet
                    zIndex: 100,
                    marginTop: 50
                }}>

                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            // borderColor: Colors.White
                        }}>
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-back" size={40}
                                    onPress={closeModal}
                                    style={{
                                    }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <Ionicons name='search' size={30} color='black' />
                            </TouchableOpacity>
                        </View>

                    </View>

                </Animated.View>


                {
                    profileHeader ?
                        <FlatList
                            style={{
                                flex: 1,
                                backgroundColor: Colors.LightGray
                            }}
                            showsVerticalScrollIndicator={false}
                            data={dataProfile}
                            keyExtractor={(item) => item.post_id.toString()}
                            renderItem={({ item }) =>
                                isShowBody == 'post' ?
                                    <MemoizedPost item={item} check={true} /> : <></>}
                            contentContainerStyle={{}}
                            ListHeaderComponent={renderHeader}
                            ListFooterComponent={isShowBody == 'post' ? renderFooter : <></>}
                            ListFooterComponentStyle={{
                                marginTop: 10
                            }}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={21}
                            getItemLayout={(data, index) => (
                                { length: screen.width, offset: screen.width * index, index }
                            )}
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
                                { useNativeDriver: false }
                            )}
                        />
                        :
                        <View style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size={50} color='#C0C0C0' />
                        </View>
                }

            </Animated.View>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
});
export { ProfileScreen }
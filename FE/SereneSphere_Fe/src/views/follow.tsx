import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, Pressable, Animated, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native";
import { Ionicons, MaterialIcons, Feather, AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import followApi from '../API/followApi';
import { timeYear } from '../custom/time';
// import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { openStateFollowFriends } from '../acctions/followActions';
import { RootState } from '../reducers';

const screen = Dimensions.get('window');
const LoadingScreen = () => {
    return (
        <ActivityIndicator size='large' color={Colors.Silver} />
    );
}
const FollowScreen = () => {
    const [dataFollow, setDataFollow] = useState(null);
    const [dataSuggest, setDataSuggest] = useState([]);
    const [countFollow, setCountFollow] = useState(0);
    const [page, setPage] = useState(0);
    const [dataLargeSuggest, setDataLargeSuggest] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLoadMore = async () => {
        try {
            setPage(page + 1)
        } catch (error) {
            console.error('Failed to load more data', error);
        }
    };
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const responseFollower = await followApi.loadFollow();
                const dataFollower = responseFollower.follows;
                const count = responseFollower.countFollow;
                if (dataFollower && count > 0) {
                    setDataFollow(dataFollower);
                    setCountFollow(count);
                }

            } catch (error) {
                console.error('Failed to load follow ', error);
            }
        };

        fetchAvatar();
    }, []);


    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                if (dataSuggest.length < 5 && page > 0)
                    return;
                setLoading(true);
                // console.log('page: '+page)
                const postPageSuggest = {
                    page: page
                }
                const responseSuggests = await followApi.loadSuggests(postPageSuggest);
                setDataSuggest(responseSuggests);
                // console.log(' responseSuggests.length: '+ responseSuggests.length)
                if (Array.isArray(responseSuggests) && responseSuggests.length > 0) {
                    // setPage(prevPage => prevPage + 1);
                    if (page == 0)
                        setDataLargeSuggest(responseSuggests);
                    else
                        setDataLargeSuggest(prevData => [...prevData, ...responseSuggests]);


                } else {
                    console.error('responseSuggests is not an array:', responseSuggests);
                }
                setLoading(false);

            } catch (error) {
                console.error('Failed to load follow ', error);
            }
        };

        fetchAvatar();
    }, [page]);
    const openSeeMoreFriendsFollower = (item, count, type) => {
        try {
            const actions = openStateFollowFriends({ status: true, countFollower: count, type: type, data: item });
            dispatch(actions);
        } catch (error) {
            console.log('error open state see more friends follower: ' + error);
        }
    }
    const renderHeader = () => {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.White }}>
                <View style={styles.scrollViewHeader}>
                    <TouchableOpacity style={styles.btnScrollViewHeader}
                        onPress={() => openSeeMoreFriendsFollower(dataLargeSuggest, 0, 'Suggests')}
                    >
                        <Text style={styles.btnContentScrollViewHeader}>Gợi ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnScrollViewHeader}>
                        <Text style={styles.btnContentScrollViewHeader}>Bạn bè</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1, backgroundColor: Colors.White, alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{ borderBottomWidth: 2, width: '90%', borderColor: Colors.Gainsboro }}></View>
                </View>
                <View style={[styles.followHeader, { paddingVertical: 10 }]}>
                    <Text style={[styles.titleHeader, { flexDirection: 'row' }]}>Lời mời kết bạn <Text style={{ color: Colors.Heart }}>{countFollow}</Text></Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                borderColor: Colors.White,
                                borderRadius: 10,
                                padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: pressed ? Colors.Gainsboro : null,
                                // marginRight: 15,
                                opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                                transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                            }
                        ]}
                        onPress={() => openSeeMoreFriendsFollower(dataFollow, countFollow, 'Follower')}
                    >
                        <Text style={{ fontSize: 20, color: Colors.Blue }}>Xem tất cả</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
    const renderFooter = (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
            borderBottomWidth: 2,
            marginBottom: 20,
            borderColor: Colors.LightGray
        }}>
            <TouchableOpacity style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.Gainsboro
            }}  onPress={() => openSeeMoreFriendsFollower(dataFollow, countFollow, 'Follower')}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Xem tất cả</Text>
            </TouchableOpacity>
        </View>
    )

    return (<SafeAreaView style={{ flex: 1, backgroundColor: Colors.LightGray }}>
        <View style={styles.container}>
            <View style={[styles.followHeader, { paddingHorizontal: 20 }]}>
                <Text style={styles.titleHeader}>Bạn bè</Text>
                <TouchableOpacity>
                    <Ionicons name='search' style={styles.iconSearch} />
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={[{ type: 'follow', data: dataFollow }, { type: 'suggestion', data: dataLargeSuggest }]}
                keyExtractor={(item, index) => `${item.type}_${index}`}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                    backgroundColor: Colors.White
                }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={21}
                getItemLayout={(data, index) => (
                    { length: 400, offset: 400 * index, index }
                )}
                renderItem={({ item }) => (
                    item.type === 'follow' ?
                        <FlatList
                            data={item.data}
                            keyExtractor={(item) => item.user_id.toString()}
                            renderItem={({ item }) => <MemoizedFriends item={item} />}
                            contentContainerStyle={{
                                paddingBottom: 10
                            }}
                            ListFooterComponent={countFollow ? renderFooter : null}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={21}
                            getItemLayout={(data, index) => (
                                { length: 400, offset: 400 * index, index }
                            )}
                        /> :
                        <FlatList
                            data={item.data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MemoizedAddFriends item={item}
                            />}
                            ListFooterComponent={isLoading ? LoadingScreen : <></>}
                            onEndReached={dataSuggest.length == 5 ? handleLoadMore : null}
                        />
                )}

            // onEndReachedThreshold={0.5}

            />
            {/* <LoadingScreen/> */}
        </View>
    </SafeAreaView>);

};
const Friends = ({ item }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 15 }}>
            <Image source={{ uri: item.avatar }} style={styles.frImg} />
            <View style={{ flex: 1, marginLeft: 15, justifyContent: 'space-between', paddingTop: item.mutual_friends ? 0 : 20 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.fullname}</Text>
                    <Text style={{ color: Colors.Gray }}>{timeYear(item.date_follow)}</Text>
                </View>
                {item.mutual_friends ?
                    <View style={{
                        flexDirection: 'row',
                        flex: 2,
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 0.3 }}>
                            <Image source={require('../images/avata.jpg')} style={styles.imgMutualFriends} />
                            <Image source={require('../images/avata.jpg')} style={[styles.imgMutualFriends, { position: 'absolute', marginLeft: 22 }]} />
                        </View>
                        <Text style={{ fontSize: 15, flex: 1 }}>{item.mutual_friends.length} Bạn chung</Text>
                    </View> : ''
                }

                <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.btnFr, { flex: 1, backgroundColor: Colors.Blue }]}>
                        <Text style={[styles.btnContentFr, { color: Colors.White }]}>Chấp nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnFr, { flex: 1, marginLeft: 10, backgroundColor: Colors.LightGray }]}>
                        <Text style={[styles.btnContentFr]}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const AddFriends = ({ item }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            marginBottom: 15,
        }}>
            <Image source={{ uri: item.avatar }} style={styles.frImg} />
            <View style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'space-between'
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.fullname}</Text>
                {item.mutual_friends ?
                    <View style={{
                        flexDirection: 'row',
                        flex: 2,
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 0.3, flexDirection: 'row' }}>
                            <View style={{
                                borderWidth: 4,
                                width: 35,
                                height: 35,
                                borderRadius: 50,
                                borderColor: Colors.White
                            }}>
                                <Image source={{ uri: item.mutual_friends[0].avatar }} style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    borderColor: Colors.Gainsboro
                                }} />
                            </View>
                            {
                                item.mutual_friends.length > 1 &&
                                // <Image source={{ uri: item.mutual_friends[0].avatar }} style={[styles.imgMutualFriends, { position: 'absolute', marginLeft: 25 }]} />
                                <View style={{
                                    borderWidth: 4,
                                    width: 35,
                                    height: 35,
                                    borderRadius: 50,
                                    borderColor: Colors.White,
                                    left: -8
                                }}>
                                    <Image source={{ uri: item.mutual_friends[0].avatar }} style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 50,
                                        borderWidth: 2,
                                        borderColor: Colors.Gainsboro
                                    }} />
                                </View>
                            }
                        </View>
                        <Text style={{ fontSize: 15, flex: 1, left: item.mutual_friends.length > 1 ? 10 : (-20) }}>{item.mutual_friends.length} Bạn chung</Text>
                    </View> : ''
                }


                <View style={{
                    flex: 2,
                    // width: '100%',
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={[styles.btnFr, { flex: 1, backgroundColor: Colors.Blue }]}>
                        <Text style={[styles.btnContentFr, { color: Colors.White }]}>Thêm bạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnFr, { flex: 1, marginLeft: 10, backgroundColor: Colors.LightGray }]}>
                        <Text style={[styles.btnContentFr]}>Gỡ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

}
const SeeMoreFriends = ({ height }) => {
    const slide = useRef(new Animated.Value(500)).current;
    const dispatch = useDispatch();
    const dataFollow = useSelector((state: RootState) => state.follow.SeeMoreFriendsFollower);
    const [isLoading, setLoading] = useState(false);
    const [dataLargeSuggest, setDataLargeSuggest] = useState([]);
    const [dataSuggest, setDataSuggest] = useState([]);

    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    // const fetchAvatar = async () => {
    //     try {
    //         if (data.length < 8 && page > 0)
    //             return;
    //         setLoading(true);
    //         // console.log('page: '+page)
    //         const postPageSuggest = {
    //             page: page
    //         }
    //         const responseSuggests = await followApi.loadSuggests(postPageSuggest);
    //         setData(responseSuggests);
    //         // console.log(' responseSuggests.length: '+ responseSuggests.length)
    //         if (Array.isArray(responseSuggests) && responseSuggests.length > 0) {
    //             // setPage(prevPage => prevPage + 1);
    //             if (page == 0)
    //                 setDataLargeSuggest(responseSuggests);
    //             else
    //                 setDataLargeSuggest(prevData => [...prevData, ...responseSuggests]);


    //         } else {
    //             console.error('responseSuggests is not an array:', responseSuggests);
    //         }
    //         setLoading(false);

    //     } catch (error) {
    //         console.error('Failed to load follow ', error);
    //     }
    // };
    const handleLoadMore = async () => {
        try {
            setPage(page + 1);
            console.log('page: '+page)
            // fetchAvatar();
        } catch (error) {
            console.error('Failed to load more data', error);
        }
    };
    useEffect(() => {
        setDataSuggest(dataFollow.data);
        console.log('length: '+dataSuggest.length)
        const fetchAvatar = async () => {
            try {
                if (dataSuggest.length < 8 && page > 0)
                    return;
                setLoading(true);
                // console.log('page: '+page)
                const postPageSuggest = {
                    page: page
                }
                const responseSuggests = await followApi.loadSuggests(postPageSuggest);
                setDataSuggest(responseSuggests);
                // console.log(' responseSuggests.length: '+ responseSuggests.length)
                if (Array.isArray(responseSuggests) && responseSuggests.length > 0) {
                    // setPage(prevPage => prevPage + 1);
                    if (page == 0)
                        setDataLargeSuggest(responseSuggests);
                    else
                        setDataLargeSuggest(prevData => [...prevData, ...responseSuggests]);


                } else {
                    console.error('responseSuggests is not an array:', responseSuggests);
                }
                setLoading(false);

            } catch (error) {
                console.error('Failed to load follow ', error);
            }
        };

        fetchAvatar();
    }, [page]);

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
        setDataLargeSuggest(dataFollow.data);

    })


    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            const actions = openStateFollowFriends({ status: false, countFollower: 0, type: null, data: [] });
            dispatch(actions);
        }, 200)

    }


    const renderHeader = (countFollow) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // paddingHorizontal:10,
                padding: 10
            }}>
                <Text style={[styles.titleHeader, { flexDirection: 'row' }]}>Lời mời kết bạn <Text style={{ color: Colors.Heart }}>{dataFollow.countFollower}</Text></Text>
                <Pressable
                    style={({ pressed }) => [
                        {
                            borderColor: Colors.White,
                            borderRadius: 10,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: pressed ? Colors.Gainsboro : null,
                            // marginRight: 15,
                            opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                        }
                    ]}>
                    <Text style={{ fontSize: 20, color: Colors.DeepSkyBlue }}>Sắp xếp</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <Pressable style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateX: slide }] }]}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.LightGray,
                    paddingVertical: 5
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: dataFollow.type == 'Follower' ?0.6:0.3
                    }}>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={40}
                                onPress={closeModal}
                                style={{
                                }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25 }}>{dataFollow.type == 'Follower' ? 'Lời mời kết bạn' : (dataFollow.type == 'Friends' ? 'Bạn bè' : 'Gợi ý')}</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <AntDesign name="ellipsis1" size={40} style={{ color: Colors.Black }} />
                    </TouchableOpacity>
                </View>
                {
                    dataFollow.type == 'Follower' ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={dataLargeSuggest}
                            keyExtractor={(item) => item.user_id.toString()}
                            renderItem={({ item }) => <MemoizedFriends item={item} />}
                            contentContainerStyle={{
                                paddingHorizontal: 15
                            }}
                            ListHeaderComponent={renderHeader}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={21}
                            getItemLayout={(data, index) => (
                                { length: screen.width, offset: screen.width * index, index }
                            )}
                        /> :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={dataLargeSuggest}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MemoizedAddFriends item={item}
                            />}
                            contentContainerStyle={{
                                padding: 10
                            }}
                            ListFooterComponent={isLoading ? LoadingScreen : <></>}
                            onEndReached={dataSuggest.length == 8 ? handleLoadMore : null}
                        />
                }
            </Animated.View>
        </Pressable>
    );
}



const MemoizedFriends = React.memo(Friends);
const MemoizedAddFriends = React.memo(AddFriends);
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
    followHeader: {
        backgroundColor: Colors.White,
        height: 'auto',
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    iconSearch: {
        fontSize: 30,
        color: Colors.Black
    },
    scrollViewHeader: {

        paddingVertical: 10,
        flexDirection: 'row',

        // borderBottomWidth:2,
        // // borderBottomColor: Colors.Gainsboro,
        // width: '90%'
    },
    btnScrollViewHeader: {
        backgroundColor: Colors.Gainsboro,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginLeft: 15
    },
    btnContentScrollViewHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    frImg: {
        width: 95,
        height: 95,
        borderRadius: 50
    },
    btnFr: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContentFr: {
        fontSize: 15,
        // fontWeight: 'bold'
    },
    imgMutualFriends: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.Gainsboro
    }


});
export { FollowScreen, SeeMoreFriends }
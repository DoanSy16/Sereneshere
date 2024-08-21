import React, { Component, useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, Pressable, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons, MaterialIcons, Octicons, Feather, AntDesign, Entypo, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import searchApi from '../API/searchApi';
import { openStateProfile } from '../acctions/profileActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';

const SearchScreen = ({ navigation }) => {
    const screen = Dimensions.get('window');
    // const [contentSearch, setContentSearch] = useState(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [itemBottomSheet, setItemBottomSheet] = useState(null);
    const [dataSearch, setDataSearch] = useState(null);
    const [dataSuggests, setDataSuggests] = useState(null);
    const [dataFriends, setDataFriends] = useState(null);
    const dataSearchTemp = useSelector((state: RootState) => state.search.data_search);
    
    const dispatch = useDispatch();

    useEffect(() => { 
        const fetchDataSearch = async ()=>{
            try {
                if(dataSearchTemp){
                    setDataSearch(dataSearchTemp);
                }
            } catch (error) {
                console.log('error load data search: ',error)
            }
        }
        fetchDataSearch();
    }, []);
    const search = async(text)=>{
        try {
            if(text=='' || text ==' '|| text ==null){
                setDataSearch(dataSearchTemp);
                return;
            }
            // setContentSearch(text);
            setTimeout(async()=>{
                const response = await searchApi.quickSearch(text);
                console.log('response: ',response)
                if(response){
                    setDataSearch(response);
                }
            },500)
            
        } catch (error) {
            console.log(`error function search: ${error}`);
        }
    }

    const callBack = () => {
        try {
            navigation.goBack();
        } catch (error) {
            console.log('error call back home: ', error);
        }
    }
    const OpenStateProfileScreen = (id) => {
        try {
            // console.log('idddd: ',id)
            navigation.navigate('RootComponentView');
          const actions = openStateProfile(parseInt(id));
          dispatch(actions);
        } catch (error) {
          console.log('error open state profile: ' + error);
        }
      }
    const openBottomSheet = ({item}) => {
        try {
            // const src = '../images/avata.jpg';
            // const item = {
            //     avt: src,
            //     id_user: 1,
            //     id_search: 1,
            //     name: 'Đoàn Sỹ'
            // }
            setItemBottomSheet(item);
            setBottomSheetVisible(true);
        } catch (error) {
            console.log('error open bottom sheet in search: ', error);
        }
    }
    const renderSearch = ({ item }) => {
        return (
            <TouchableOpacity style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 15,
                marginTop: 20
            }}
            onPress={()=>OpenStateProfileScreen(item.user_id)}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: Colors.LightGray
                    }}>
                        <Image source={{uri:item.avatar}}
                            style={{
                                width: '99%',
                                height: '99%',
                                borderRadius: 50
                            }}
                        />
                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>{item.fullname}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => openBottomSheet({item})}>
                    <Entypo name='dots-three-horizontal' size={25} color={Colors.Gray} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    const renderSuggest = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    {
                        width: screen.width * 0.75,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.Gray,
                        marginRight: 15,
                        opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                        transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                    }
                ]}>
                <View style={{
                    height: 300,
                    borderTopEndRadius: 10
                }}>
                    <Image source={require('../images/avata.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
                        }} />
                </View>
                <View style={{
                    paddingVertical: 10,
                    height: 80
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>Đoàn Sỹ</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.Blue,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 35,
                        width: '75%'
                    }}>
                        <Text style={{
                            color: Colors.White,
                            fontSize: 20,
                            fontWeight: '500',

                        }}>Thêm bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.Gainsboro,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 40,
                        width: '20%'
                    }}>
                        <Text style={{
                            color: Colors.Black,
                            fontSize: 20,
                            fontWeight: '500',

                        }}>Gỡ</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        );
    }

    const MemoizedSearch = React.memo(renderSearch);
    const MemoizedSuggest = React.memo(renderSuggest);
    const map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const BottomSheet = () => {
        const slide = useRef(new Animated.Value(300)).current;
        const slideUp = () => {
            // Will change slide up the bottom sheet
            Animated.timing(slide, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        };

        const slideDown = () => {
            // Will slide down the bottom sheet
            Animated.timing(slide, {
                toValue: 200,
                duration: 200,
                useNativeDriver: true,
            }).start();
        };


        React.useEffect(() => {
            slideUp()
        })


        const closeModal = () => {
            slideDown();

            setTimeout(() => {
                // setStatus(false);
                setBottomSheetVisible(false);
            }, 200)

        }
        return (
            <Pressable onPress={closeModal} style={styles.backdrop}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View style={{
                        paddingVertical: 10
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            // paddingVertical: 10
                        }}>
                            <View style={{
                                borderBottomWidth: 4,
                                width: '20%',
                                borderBottomColor: Colors.LightGray
                            }} />
                        </View>
                        <View style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                width: 55,
                                height: 55,
                                borderRadius: 50,
                                marginVertical: 10
                            }} source={{uri:itemBottomSheet.avatar}} />
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>{itemBottomSheet.fullname}</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: Colors.LightGray,
                                width: '90%'
                            }} />
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        marginTop: 10
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                backgroundColor: Colors.LightGray,
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 40,
                                padding: 5
                            }}>
                                <Ionicons name='trash-bin' size={30} />
                            </View>
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: 'bold'
                                }}>Xóa</Text>
                                <Text style={{
                                    color: Colors.Gray,
                                    fontSize: 15
                                }}>Gỡ khỏi lịch sử tìm kiếm của bạn.</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </Animated.View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.White
        }}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.LightGray,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                height: 60,
                paddingBottom: 5
            }}>
                <TouchableOpacity
                    onPress={() => callBack()}>
                    <MaterialIcons name="arrow-back" size={35} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Tìm kiếm'
                    onChangeText={text => search(text)}
                    // value={contentSearch}
                    style={{
                        // borderWidth: 1,
                        borderRadius: 20,
                        width: '90%',
                        color: Colors.Black,
                        backgroundColor: Colors.Gainsboro,
                        paddingHorizontal: 10,
                        fontSize: 15,
                        height: "80%"
                    }}

                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1
                }}>
                {
                    dataSearch ?
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                paddingHorizontal: 15,
                                paddingTop: 10
                            }}>
                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: 'bold'
                                }}>Mới đây</Text>
                                <TouchableOpacity>
                                    <Text style={{
                                        color: Colors.Dodgerblue,
                                        fontSize: 20
                                    }}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{

                            }}>
                                {/* {map.map((button, index) => (
                    <MemoizedSearch key={index} />
                ))} */}

                                    {dataSearch.map((item,index)=>(
                                        <MemoizedSearch item={item} key={index}/>
                                    ))}
                                {/* <FlatList
                                    style={{
                                        flex: 1,
                                        backgroundColor: Colors.LightGray
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    data={dataSearch}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) =>
                                        <MemoizedSearch item={item} />}
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
                                /> */}
                                {/* <MemoizedSearch /> */}
                            </View>
                        </View> :
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: Colors.Gray,
                                // fontWeight:'bold'
                            }}>Không có lịch sử tìm kiếm nào gần đây</Text>
                        </View>
                }
                <View style={{
                    padding: 15,
                }}>
                    <View style={{
                        marginBottom: 15
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold'
                        }}>Những người bạn có thể biết</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={map}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <MemoizedSuggest />}

                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={21}
                        getItemLayout={(data, index) => (
                            { length: screen.width, offset: screen.width * index, index }
                        )}
                        horizontal
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            height: 40,
                            backgroundColor: Colors.Gainsboro
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600'
                        }}>Xem tất cả</Text>
                    </TouchableOpacity>

                </View>
                <View style={{
                    padding: 15,
                }}>
                    <View style={{
                        marginBottom: 15
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold'
                        }}>Lời mời kết bạn</Text>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={map}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <MemoizedSuggest />}
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
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            height: 40,
                            backgroundColor: Colors.Gainsboro
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600'
                        }}>Xem tất cả</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {bottomSheetVisible && <BottomSheet />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    backdrop: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        left: 0,
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '22%',
        backgroundColor: Colors.White,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // paddingHorizontal: 25
    }
});
export { SearchScreen }
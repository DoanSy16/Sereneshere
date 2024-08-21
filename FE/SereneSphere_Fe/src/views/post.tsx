import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, FlatList, TextInput, Animated, StatusBar, Pressable, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native";
import { Ionicons, MaterialIcons, Feather, AntDesign, Entypo, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import { useDispatch, useSelector } from 'react-redux';
import { openStatePost, openStatePostImages } from '../acctions/postActions';
import { openStateComment } from '../acctions/commentActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../reducers';
const screenWidth = Dimensions.get('window');
import { Emoji } from './home';
import { Laugh, Heart, Sad } from '../custom/emojis';

const Post = ({ height }) => {
    const slide = useRef(new Animated.Value(height)).current;
    const [content, setContent] = useState(null);
    const [isDisabled, setDisabled] = useState(true);
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const init = async () => {
            try {
                const fullName = await AsyncStorage.getItem('AccessFullName');
                const avatar = await AsyncStorage.getItem('AccessAvatar');
                if (fullName && avatar) [
                    setFullName(fullName),
                    setAvatar(avatar)
                ]
            } catch (error) {
                console.log('error in post load avatar or fullname!: ' + error);
            }
        };
        init();
    }, []);


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
            // setStatus(false);
            const actions = openStatePost(false);
            dispatch(actions);
        }, 200)

    }
    const checkDisabled = (content) => {
        setContent(content);
        if (content) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }


    return (

        <Pressable style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.LightGray
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        borderWidth: 0
                    }}>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={40}
                                onPress={closeModal}
                                style={{
                                }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 25,
                            marginLeft: 10
                        }}>Tạo bài viết </Text>
                    </View>
                    <TouchableOpacity disabled={isDisabled} style={{
                        backgroundColor: isDisabled ? Colors.LightGray : Colors.DeepSkyBlue,
                        padding: 10,
                        borderRadius: 5
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: Colors.White,
                            fontWeight: 'bold'
                        }}>ĐĂNG</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            borderWidth: 2,
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                            borderColor: Colors.Gainsboro
                        }}>
                            <Image style={{
                                flex: 1,
                                borderRadius: 50,
                            }} source={{ uri: avatar }} />
                        </View>
                        <View style={{
                            justifyContent: 'space-between',
                            marginStart: 15
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{fullName}</Text>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                width: '55%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // borderWidth:1,
                                borderRadius: 5,
                                padding: 5,
                                backgroundColor: '#66FFFF'
                            }}>
                                <Ionicons name="people" color={Colors.Dodgerblue} size={20} />
                                <Text style={{
                                    fontSize: 15,
                                    color: Colors.Dodgerblue
                                }}>Bạn bè</Text>
                                <AntDesign name='caretdown' color={Colors.Dodgerblue} />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Bạn đang nghĩ gì?"
                        placeholderTextColor="gray"
                        multiline={true}
                        numberOfLines={10}
                        value={content}
                        onChangeText={text => checkDisabled(text)}
                    />
                </View>

            </Animated.View>
        </Pressable>
    );
}
const SeeMorePostImage = ({ height, item }) => {
    const slide = useRef(new Animated.Value(height)).current;
    const [isShow, setIsShow] = useState(true);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const dispatch = useDispatch();
    const dataPost = useSelector((state: RootState) => state.post.postImages);
    const [arrayEmojis, setArrayEmojis] = useState([]);
    useEffect(() => {
        try {
            slideUp();
            if (dataPost.data.typeinterested) {
              let array = [];
              array.push(dataPost.data.typeinterested[0]);
              dataPost.data.typeinterested[1] ? array.push(dataPost.data.typeinterested[1]) : '';
              dataPost.data.typeinterested[2] ? array.push(dataPost.data.typeinterested[2]) : '';
      
              setArrayEmojis(array);
            }
          } catch (error) {
            console.log('Error add array in home: ' + error);
          }
    }, []);

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



    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            // setStatus(false);
            const actions = openStatePostImages({ status: false, data: [] });
            dispatch(actions);
        }, 200)

    }


    const scrollNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < dataPost.data.post_images.length) {
            flatListRef.current.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        }
    };

    const scrollPrev = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            flatListRef.current.scrollToIndex({ index: prevIndex });
            setCurrentIndex(prevIndex);
        }
    };

    const showButton = () => {
        isShow ? setIsShow(false) : setIsShow(true)
    }

    const openPostComment = async (id, user_id,emojis,isInterested,countInterested) => {
        try {
            const actions = openStateComment({
                status: true, 
                user_id: user_id, 
                post_id: id,
                emojis:emojis,
                isInterested:isInterested,
                countInterested:countInterested
               });
            dispatch(actions);
        } catch (error) {
            console.log('error in home screen function loadComments! ' + error)
        }

    }
    // const renderSeparator = () => {
    //     return <View style={{ width: 100 }} />;
    // };
    return (
        <Pressable style={styles.backdrop} onPress={() => showButton()} >
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View
                    style={{
                        backgroundColor: Colors.Black,
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                    <StatusBar   // Kiểu nội dung của StatusBar: 'light-content' cho nền tối, 'dark-content' cho nền sáng
                        backgroundColor={Colors.Black} />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingEnd: 20,
                        height: 40,
                        // borderWidth:1,
                        // borderColor:Colors.White
                    }}>
                        {isShow ?
                            <>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            borderColor: Colors.White,
                                            borderRadius: 50,
                                            height: 40,
                                            width: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: pressed ? Colors.Gray : null,
                                            marginRight: 15,
                                            opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                                            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                                        }
                                    ]}
                                >
                                    <AntDesign name="ellipsis1" size={30} style={{ color: Colors.White }} />
                                </Pressable>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            // borderWidth:pressed?1:0,
                                            borderColor: Colors.White,
                                            borderRadius: 50,
                                            height: 40,
                                            width: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: pressed ? Colors.Gray : null,
                                            opacity: pressed ? 0.8 : 1, // Mức độ mờ khi nhấn
                                            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] // Hiệu ứng thu nhỏ khi nhấn
                                        }
                                    ]}

                                    onPress={() => closeModal()}>
                                    <Feather name="x" size={30} style={{ color: Colors.White }} />
                                </Pressable>
                            </>
                            : ''
                        }
                    </View>
                    <View style={{
                        flex: 3,
                        justifyContent: 'center',
                        position: 'relative',
                        // borderWidth:1,
                        // borderColor:Colors.Green 
                    }}>
                        <FlatList
                            ref={flatListRef}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            showsHorizontalScrollIndicator={false}
                            data={dataPost.data.post_images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <MemoizedPostImages item={item} />}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={21}
                            getItemLayout={(data, index) => (
                                { length: screenWidth.width, offset: screenWidth.width * index, index }
                            )}
                            // getItemLayout={(data, index) => ({ length: 400, offset: 400 * index, index })}
                            horizontal
                        />
                        {isShow ?
                            <>
                                {
                                    currentIndex > 0 ?
                                        <Pressable
                                            onPress={scrollPrev}
                                            style={{
                                                position: 'absolute',
                                                left: 10,
                                                top: '50%',
                                                transform: [{ translateY: -20 }],
                                                zIndex: 1,
                                                // borderWidth:1,
                                                padding: 5,
                                                borderRadius: 50,
                                                backgroundColor: Colors.Gainsboro
                                            }}
                                        >
                                            <AntDesign name="left" size={30} style={{ color: Colors.Black }} />
                                        </Pressable> : ''
                                }
                                {
                                    currentIndex < dataPost.data.post_images.length - 1 ?
                                        <Pressable
                                            onPress={scrollNext}
                                            style={{
                                                position: 'absolute',
                                                right: 10,
                                                top: '50%',
                                                transform: [{ translateY: -20 }],
                                                zIndex: 1,
                                                padding: 5,
                                                borderRadius: 50,
                                                backgroundColor: Colors.Gainsboro,
                                            }}
                                        >
                                            <AntDesign name="right" size={30} style={{ color: Colors.Black }} />
                                        </Pressable> : ''
                                }
                            </> : ''
                        }
                    </View>
                    <View style={{
                        flex: 0.5,
                        // borderWidth: 5,
                        // borderColor: Colors.Blue,
                        justifyContent: 'flex-end'
                    }}>
                        {isShow ?
                            <View style={{
                                position: 'absolute',
                                flex: 1,
                                width: '100%',
                                height: 'auto',
                                maxHeight: 300,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                bottom:  (dataPost.data.countinterested>0 || dataPost.data.countcomment>0 || dataPost.data.countshare>0)?80:40,
                                justifyContent: 'space-between',
                                padding: 15

                            }}>

                                <Text style={[styles.textPost, { fontSize: 18, fontWeight: 'bold' }]}>{dataPost.data.fullname}</Text>
                                <ScrollView>
                                    <Text style={[styles.textPost]}>
                                        {dataPost.data.content}

                                    </Text>
                                </ScrollView>
                                <Text style={{ color: Colors.Gainsboro }}>Hôm qua lúc 18:00</Text>
                            </View> : ''

                        }
                        {/* </View> */}
                        <View style={{ height: (dataPost.data.countinterested>0 || dataPost.data.countcomment>0 || dataPost.data.countshare>0)? 80:40 }}>
                            {isShow ?
                                 <>

                                 {/* <View style={{
                                    // height: 40, 
                                 }}> */}

                                 {
                                   (dataPost.data.countinterested>0 || dataPost.data.countcomment>0 || dataPost.data.countshare>0) && 
                                   <TouchableOpacity onPress={() => openPostComment(dataPost.data.post_id, dataPost.data.user_id,arrayEmojis,dataPost.data.isinterested,dataPost.data.countInterested)} style={{ 
                                     height: 40, 
                                     justifyContent: 'center', 
                                     borderBottomWidth: 0, 
                                     borderBottomColor: Colors.LightGray, 
                                     paddingHorizontal: 20 }}>
                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                         {
                                           arrayEmojis &&
                                           <View style={{
                                             width: 'auto',
                                             // borderWidth:1,
                                             justifyContent:'center',
                                             alignItems:'center',
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
                                                 <Laugh checkHomeScreen={false}/>
                                               </View>
                                             }
                         
                                             {
                                               arrayEmojis.includes(4) &&
                                               <View style={[styles.iconCountPost, { left: -15 }]}>
                                                 <Sad checkHomeScreen={false}/>
                                               </View>
                                             }
                                           </View>
                                         }
                                         <Text style={{ fontSize: 16, color: Colors.Gray, marginLeft: arrayEmojis.length > 1 ? arrayEmojis.length == 2 ? -5 : -10 : 0  }}>{dataPost.data.countinterested}</Text>
                                       </View>
                                       <View style={{ 
                                         flexDirection: 'row', 
                                         alignItems: 'center' }}>
                                         <Text style={{ fontSize: 16, color: Colors.Gray }}>{dataPost.data.countcomment} bình luận</Text>
                                         <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: Colors.Gray, marginHorizontal: 5 }}></View>
                                         <Text style={{ fontSize: 16, color: Colors.Gray }}>{dataPost.data.countshare} lượt chia sẻ</Text>
                                       </View>
                                     </View>
                                   </TouchableOpacity>
                                 }
                                 {/* </View> */}
                                   
                                   <View style={{ 
                                     height: 40, 
                                     flexDirection: 'row',
                                     justifyContent: 'space-between', 
                                     alignItems: 'center', 
                                     paddingHorizontal: 20,
                                     borderTopWidth:2,
                                     borderTopColor:Colors.LightGray }}>
                                     <TouchableOpacity style={styles.btnIconPost}>
                                       <Emoji emoji={dataPost.data.isinterested} checkHomeScreen={false} checkCommentScreen={true}/>
                         
                                     </TouchableOpacity>
                                     <TouchableOpacity style={styles.btnIconPost} onPress={() => openPostComment(dataPost.data.post_id, dataPost.data.user_id,arrayEmojis,dataPost.data.isinterested,dataPost.data.countInterested)}>
                                       <FontAwesome6 name='comment' size={23} color={Colors.Gray} />
                                       <Text style={styles.btnContentIconPost}>Bình luận</Text>
                                     </TouchableOpacity>
                                     <TouchableOpacity style={styles.btnIconPost}>
                                       <AntDesign name='sharealt' size={23} color={Colors.Gray} />
                                       <Text style={styles.btnContentIconPost}>Chia sẻ</Text>
                                     </TouchableOpacity>
                                   </View>
                                 </>
                                : ''
                            }
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
}
const Images = ({ item }) => {
    return (
        <View style={{
            height: screenWidth.height,
            width: screenWidth.width,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                source={{ uri: item.link_images }}
                style={{
                    height: screenWidth.height,
                    width: screenWidth.width,
                }}
                resizeMode='contain'
            />
        </View>
    )
}
const MemoizedPostImages = React.memo(Images);
const styles = StyleSheet.create({
    container: {

    },
    iconSearch: {
        fontSize: 30,
        color: Colors.Black
    },
    avatarNotify: {
        width: 80,
        height: 80,
        borderRadius: 50,
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
        borderWidth: 4,
        borderColor: Colors.Black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIconPost: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContentIconPost: {
        color: Colors.White,
        fontSize: 15,
        left: 5,
        // top: 2
    },
    textPost: {
        color: Colors.White
    }
});
export { Post, SeeMorePostImage }
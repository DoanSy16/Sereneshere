import React, { Component, useState, useRef } from 'react';
import { View, Animated, Pressable, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, Text } from "react-native";
import { Ionicons, Feather, AntDesign, Entypo, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';

const NotifyScreen = () => {
    const [status, setStatus] = useState(false);
    // const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    return (<SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 25,
                paddingTop: 15
            }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Thông báo</Text>
                <TouchableOpacity>
                    <Ionicons name='search' style={styles.iconSearch} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginVertical: 15 }}>
                {[...Array(10)].map((_, index) => (
                    <Notify setStatus={setStatus} key={index} />
                ))}
            </View>

        </ScrollView>
        {/* <BottomSheet />
         */}
         {/* { status && <BottomSheet setStatus={ setStatus } /> } */}
    </SafeAreaView>);

}
const Notify = ({setStatus}) => {
    return (
        <TouchableOpacity style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 10,
            paddingBottom: 10,
            borderWidth: 0,
        }}>
            <View style={{
                width: 90,
                height: 90,
                borderWidth: 0
            }}>
                <Image source={require('../images/avata.jpg')} style={styles.avatarNotify} />
                <View style={{
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.LimeGreen,
                    borderRadius: 50,
                    position: 'absolute',
                    right: 3,
                    bottom: 3
                }}>
                    <FontAwesome name='comment' size={20} color={Colors.White} />
                </View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingVertical: 10,
                // borderWidth: 1,
                paddingHorizontal: 10
            }}>
                <View style={{
                    // flex: 1,
                    // width:'100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Max </Text>
                        đã nhắc đến bạn trong một bình luận.</Text>
                </View>
                <Text>Ngày 23 tháng 4 lúc 09:07</Text>
            </View>
            <TouchableOpacity onPress={()=>setStatus(true)}>
                <Entypo name='dots-three-horizontal' size={15} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
const BottomSheet = ({setStatus}) => {
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
            setStatus(false);
        }, 200)
        
      }
    return (
        <Pressable onPress={ closeModal } style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10
                }}>
                    <View style={{
                        borderBottomWidth: 4,
                        width: '20%',
                        borderBottomColor: Colors.LightGray
                    }} />
                    <Image style={{
                        width: 55,
                        height: 55,
                        borderRadius: 50,
                        marginVertical: 10
                    }} source={require('../images/avata.jpg')} />
                    <Text style={{ color: Colors.DarkGray }}>Max đã nhắc đến bạn trong một bình luận</Text>
                </View>
                <View style={{flex:1,justifyContent:'space-between',paddingBottom:10}}>
                    <TouchableOpacity style={{
                        paddingHorizontal: 25,
                        flexDirection:'row',
                        alignItems:'center',
                    }}>
                        <View style={{
                            borderWidth: 0,
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            backgroundColor: Colors.Gainsboro
                        }}>
                            <View style={{
                                borderWidth: 1,
                                width: 25,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                backgroundColor: Colors.Black
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    color: Colors.White
                                }}>X</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize:20,
                            marginLeft:10,
                            fontWeight:'400'
                        }}>Gỡ thông báo này</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        paddingHorizontal: 25,
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <View style={{
                            borderWidth: 0,
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            backgroundColor: Colors.Gainsboro
                        }}>
                            <View style={{
                                borderWidth: 1,
                                width: 25,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                backgroundColor: Colors.Black
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    color: Colors.White
                                }}>X</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize:20,
                            marginLeft:10,
                            fontWeight:'400'
                        }}>Tắt thông báo này</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </Pressable>
    );
}
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
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '30%',
        backgroundColor: Colors.White,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // paddingHorizontal: 25
    }
});
export { NotifyScreen,BottomSheet }
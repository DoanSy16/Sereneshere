import React, { Component, useRef, useState, useEffect } from 'react';
import { View, FlatList, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Image, Text, StatusBar, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import { Ionicons, Feather, AntDesign, FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons/'; // Import Ionicons từ thư viện expo vector-icons
import Colors from '../colors/color';
import postApi from '../API/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
import { customTimePost } from '../custom/time';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { openStatePost, openStatePostImages } from '../acctions/postActions';
import { openStateProfile } from '../acctions/profileActions';
import { openStateComment } from '../acctions/commentActions';
import { Laugh, Heart, Sad } from '../custom/emojis';

const LoadingScreen = () => {
  return (
    <ActivityIndicator style={styles.loading} size='large' color={Colors.Silver} />
  );
}

const HomeScreen = () => {
  // const avatar =AsyncStorage.getItem('AccessAvatar');
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [idLogin, setIdLogin] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataPost, setDataPost] = useState(null);
  const data = useSelector((state: RootState) => state.post.posts);
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const storedAvatar = await AsyncStorage.getItem('AccessAvatar');
        const storedId = await AsyncStorage.getItem('AccessId');
        // const storeToken = await AsyncStorage.getItem('AccessToken');
        if (storedAvatar) {
          setAvatar(storedAvatar);
        }
        if (setIdLogin) {
          setIdLogin(parseInt(storedId));
        }
        // if (storeToken) {
        //   setToken(token);
        // }
        // const data = await postApi.loadPost();
        // const data =useSelector(state=>state.postReducer)
        // const data = useSelector((state) => state);
        // console.log('data: ' + data)
        if (data) {

          setDataPost(data);
          setLoading(false);
        }

      } catch (error) {
        console.error('Failed to load avatar from storage', error);
      }
    };

    fetchAvatar();
  }, [data]);
  const openPost = () => {
    const actions = openStatePost(true);
    dispatch(actions);
  }

  const OpenStateProfileScreen = (id) => {
    try {
      const actions = openStateProfile(id);
      dispatch(actions);
    } catch (error) {
      console.log('error open state profile: ' + error);
    }
  }
  const renderHeader = () => (
    <View style={styles.img_container}>
      <View >
        {avatar && (
          <TouchableOpacity
            // activeOpacity={1}
            onPress={() => OpenStateProfileScreen(idLogin)}
          >
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </TouchableOpacity>
        )}
        {/* <Image source={{uri:avatar}} style={styles.avatar} /> */}
      </View>
      <View style={{ flex: 0.9, height: 40 }}>
        <TouchableOpacity style={styles.btnPost} onPress={openPost}>
          <Text style={styles.btnContentPost}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.btnImage}>
          <Ionicons name='image' style={styles.btnIconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.LightGray }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />

      {isLoading ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: screenWidth * 1,
        }}>
          <LoadingScreen />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={dataPost}
          keyExtractor={(item) => item.post_id.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => <MemoizedPost item={item} check={true} />}
          // renderItem={Post}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
          getItemLayout={(data, index) => (
            { length: 400, offset: 400 * index, index }
          )}
        />
      )}
    </SafeAreaView>);

}

const ImageGrid = ({ images, numberOfImages }) => {
  const renderImages = () => {
    let view;
    if (numberOfImages === 1) {
      view = <Image source={{ uri: images[0].link_images }} style={styles.postImage} resizeMode="contain" />
    } else if (numberOfImages === 2) {
      view = <View style={{ height: 400, flexDirection: 'row', justifyContent: 'space-between' }}>
        {images.map((image, index) => (

          <Image key={index} source={{ uri: image.link_images }} style={{ width: screenWidth / 2, height: '100%', borderWidth: 1 }} resizeMode="contain" />
        ))}
      </View>
    } else if (numberOfImages === 3) {
      view = <View style={styles.imageContainer}>
        <View style={styles.largeImageContainer}>
          <Image source={{ uri: images[0].link_images }} style={styles.largeImage} resizeMode="center" />
        </View>
        <View style={styles.smallImagesContainer}>

          <Image source={{ uri: images[1].link_images }} style={styles.smallImage} resizeMode="cover" />
          <Image source={{ uri: images[2].link_images }} style={styles.smallImage} resizeMode="cover" />
        </View>
      </View>
    } else if (numberOfImages === 4) {
      view = <View style={styles.fourImageContainer}>
        <View style={styles.fourSmallImagesContainer}>
          <Image source={{ uri: images[0].link_images }} style={styles.fourSmallImage} resizeMode="cover" />
          <Image source={{ uri: images[1].link_images }} style={[styles.fourSmallImage, { marginTop: 7 }]} resizeMode="cover" />
        </View>
        <View style={[styles.fourSmallImagesContainer]}>
          <Image source={{ uri: images[2].link_images }} style={styles.fourSmallImage} resizeMode="cover" />
          <Image source={{ uri: images[3].link_images }} style={[styles.fourSmallImage, { marginTop: 7 }]} resizeMode="cover" />
        </View>
      </View>
    } else if (numberOfImages > 4) {
      view = <View style={styles.fiveImageContainer}>
        <View style={[styles.fiveSmallImagesContainer, { marginBottom: 10 }]}>
          <Image source={{ uri: images[0].link_images }} style={styles.fiveSmallImageHeader} resizeMode="cover" />
          <Image source={{ uri: images[1].link_images }} style={styles.fiveSmallImageHeader} resizeMode="cover" />
        </View>
        <View style={styles.fiveSmallImagesContainer}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Image source={{ uri: images[2].link_images }} style={styles.fiveSmallImageBody} resizeMode="cover" />
          </View>
          <View style={{ flex: 1, marginHorizontal: 3 }}>
            <Image source={{ uri: images[3].link_images }} style={styles.fiveSmallImageBody} resizeMode="cover" />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Image source={{ uri: images[4].link_images }} style={styles.fiveSmallImageBody} resizeMode="cover" />
            {numberOfImages && (numberOfImages - 5) > 0 && (
              <View style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white', fontSize: 24 }}>+{numberOfImages - 5}</Text>
              </View>
            )}
          </View>

        </View>
      </View>
    }
    return (
      <>
        {view}
      </>
    )
  };

  return (
    <View style={{ flex: 1 }}>
      {renderImages()}
    </View>
  );
};


const Post = ({ item, check }) => {
  const numberOfImages: number = item.post_images ? item.post_images.length : 0;
  const dispatch = useDispatch();
  const [checkContent, setCheckContent] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [arrayEmojis, setArrayEmojis] = useState([]);
  useEffect(() => {
    try {
      if (item.typeinterested) {
        let array = [];
        array.push(item.typeinterested[0]);
        item.typeinterested[1] ? array.push(item.typeinterested[1]) : '';
        item.typeinterested[2] ? array.push(item.typeinterested[2]) : '';

        setArrayEmojis(array);
      }
    } catch (error) {
      console.log('Error add array in home: ' + error);
    }
  }, []);


  const textRef = useRef(null);

  const openPostComment = async (id, user_id, emojis, isInterested, countInterested) => {
    try {
      const actions = openStateComment({
        status: true,
        user_id: user_id,
        post_id: id,
        emojis: emojis,
        isInterested: isInterested,
        countInterested: countInterested
      });
      dispatch(actions);
    } catch (error) {
      console.log('error in home screen function loadComments! ' + error)
    }

  }
  const openPostImages = (item) => {
    try {
      const actions = openStatePostImages({ status: true, data: item });
      dispatch(actions);
    } catch (error) {
      console.log('error load data postImages: ' + error);
    }
  }
  const OpenStateProfileScreen = (id) => {
    try {
      const actions = openStateProfile(id);
      dispatch(actions);
    } catch (error) {
      console.log('error open state profile: ' + error);
    }
  }
  const seeMoreContent = () => {
    setCheckContent(true);
  }

  const checkNumberOfLines = (textRef, setLineCount) => {
    if (textRef.current) {
      textRef.current.measure((x, y, width, height, pageX, pageY) => {
        const lineHeight = 20; // Giá trị này tùy thuộc vào style của Text
        const calculatedLines = Math.ceil(height / lineHeight);
        setLineCount(calculatedLines);
      });
    }
  };
  return (
    <View style={{
      backgroundColor: 'white',
      marginTop: check ? 10 : 0,
      flex: 1
    }}>
      <View style={check ? {} : {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Colors.LightGray,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginHorizontal: 10
      }}>
        <TouchableOpacity style={styles.postHeader}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity
              onPress={() => OpenStateProfileScreen(item.user_id)}
              activeOpacity={1}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 5, marginRight: 15 }}>
              <View style={{ flex: screenWidth * 0.8, flexDirection: 'column' }}>
                <TouchableOpacity style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {item.fullname}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, marginLeft: 5, color: Colors.Gray }}>{customTimePost(item.date_post)}</Text>
                  <Ionicons name="earth" size={18} style={{ marginLeft: 10, color: Colors.Gray }} />
                </View>
              </View>
              {check &&
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginRight: 15 }}>
                    <AntDesign name="ellipsis1" size={25} style={{ color: Colors.Gray }} />
                  </TouchableOpacity>
                  <TouchableOpacity >
                    <Feather name="x" size={25} style={{ color: Colors.Gray }} />
                  </TouchableOpacity>
                </View>

              }
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          {
            checkContent ?
              <Text style={{ fontSize: 15 }}>{item.content}</Text>
              :
              <>
                <Text ref={textRef} numberOfLines={2} onLayout={() => checkNumberOfLines(textRef, setLineCount)} style={{ fontSize: 15, lineHeight: 20 }}>{item.content}</Text>
                {lineCount >= 2 ?
                  <TouchableOpacity onPress={() => seeMoreContent()}>
                    <Text>Xem thêm </Text>
                  </TouchableOpacity> : ''
                }
              </>
          }
        </View>
      </View>
      {item.post_images && <TouchableOpacity onPress={() => openPostImages(item)}><ImageGrid images={item.post_images} numberOfImages={numberOfImages} /></TouchableOpacity>}
      {/* <Text>{item.post_images}</Text> */}
      {item.post_share &&
        <TouchableOpacity style={{
        }}>
          <Post item={item.post_share[0]} check={false} />
        </TouchableOpacity>

      }
      {check &&
        <>

          {
            (item.countinterested > 0 || item.countcomment > 0 || item.countshare > 0) &&
            <TouchableOpacity onPress={() => openPostComment(item.post_id, item.user_id, arrayEmojis, item.isinterested, item.countinterested)} style={{
              height: 40,
              justifyContent: 'center',
              borderBottomWidth: 0,
              borderBottomColor: Colors.LightGray,
              paddingHorizontal: 20
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  <Text style={{ fontSize: 16, color: Colors.Gray, marginLeft: arrayEmojis.length > 1 ? arrayEmojis.length == 2 ? -5 : -10 : 0 }}>{item.countinterested}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 16, color: Colors.Gray }}>{item.countcomment} bình luận</Text>
                  <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: Colors.Gray, marginHorizontal: 5 }}></View>
                  <Text style={{ fontSize: 16, color: Colors.Gray }}>{item.countshare} lượt chia sẻ</Text>
                </View>
              </View>
            </TouchableOpacity>
          }

          <View style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderTopWidth: 2,
            borderTopColor: Colors.LightGray
          }}>
            <TouchableOpacity style={styles.btnIconPost}>
              <Emoji emoji={item.isinterested} checkHomeScreen={true} checkCommentScreen={true} />

            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIconPost} onPress={() => openPostComment(item.post_id, item.user_id, arrayEmojis, item.isinterested, item.countinterested)}>
              <FontAwesome6 name='comment' size={23} color={Colors.Gray} />
              <Text style={styles.btnContentIconPost}>Bình luận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIconPost}>
              <AntDesign name='sharealt' size={23} color={Colors.Gray} />
              <Text style={styles.btnContentIconPost}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View >
  );

}

const Emoji = ({ emoji, checkHomeScreen, checkCommentScreen }) => {
  const type = ['Thích', 'Yêu thích', 'Haha', 'Buồn'];
  const index = emoji ? emoji - 1 : 0;
  const renderEmoji = () => {
    let check = emoji ? true : false;
    let view;

    if (check) {
      if (emoji == 1) {
        view = <AntDesign name='like1' size={23} color={Colors.Blue} />
      } else if (emoji == 2) {
        view = <Heart />;
      }
      else if (emoji == 3) {
        view = <Laugh checkHomeScreen={checkHomeScreen} />;

      }
      else {
        view = <Sad checkHomeScreen={checkHomeScreen} />
      }

    } else {
      view = <AntDesign name='like2' size={23} color={Colors.Gray} />

    }
    return (<>{view}</>);
  };

  return (
    <>
      {renderEmoji()}
      {checkCommentScreen && <Text style={[styles.btnContentIconPost, { color: checkHomeScreen ? Colors.Gray : Colors.White }]}>{type[index]}</Text>}

    </>
  );

}

const MemoizedPost = React.memo(Post);
// const MemoizedImages = React.memo(ImageGrid);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img_container: {
    backgroundColor: 'white',
    flexDirection: 'row', // Đặt hướng hiển thị là ngang
    justifyContent: 'space-between', // Các nút sẽ được căn cách đều nhau theo chiều ngang
    width: '100%',
    alignItems: 'center',
    padding: 20
    // marginHorizontal: width * 0.05,
  },
  avatar: {
    // margin: 15,
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.Gainsboro
  },
  btnPost: {
    borderWidth: 1,
    borderRadius: 25,
    height: 40,
    // width: 250,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContentPost: {
    fontSize: 20,
    // marginLeft: 15
  },
  btnImage: {
    // marginHorizontal: 25
    marginRight: 10,
    marginLeft: 15
  },
  btnIconImage: {
    fontSize: 30,
    color: Colors.LimeGreen,
    right: 0
    // height: 0
  },
  postContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    // width: screenWidth*1
    flex: 1
    // minHeight:200,
    // height:'auto',

  },
  postHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingTop: 10,
    // justifyContent: 'space-between'
  },
  postImage: {
    flex: 1,
    // width: screenWidth,
    height: 350,
    // resizeMode: 'cover',
  }
  ,
  iconCountPost: {
    width: 28,
    height: 28,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIconPost: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContentIconPost: {
    color: Colors.Gray,
    fontSize: 15,
    left: 5,
    // top: 2
  },
  loading: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Gainsboro, // Colors.Gainsboro
  },
  largeImageContainer: {
    flex: 3, // Tỷ lệ lớn hơn so với các hình nhỏ
    justifyContent: 'center',
    alignItems: 'center',

  },
  largeImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.White
  },
  smallImagesContainer: {
    flex: 2,
    justifyContent: 'space-between',
    paddingLeft: 6,
  },
  smallImage: {
    width: '100%',
    height: '49%',
    aspectRatio: 1,
    backgroundColor: Colors.White
  },
  fourImageContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Colors.Gainsboro, // Colors.Gainsboro
  },
  fourSmallImagesContainer: {
    width: '49%', // Đảm bảo rằng hai cột sẽ chia đều chiều rộng
    justifyContent: 'space-between',
  },
  fourSmallImage: {
    width: '100%',
    height: screenWidth / 2 - 20, // Đặt chiều cao phù hợp với chiều rộng
    backgroundColor: Colors.White

  },
  fiveImageContainer: {
    justifyContent: 'space-between',
    backgroundColor: Colors.Gainsboro, // Colors.Gainsboro

  },
  fiveSmallImagesContainer: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fiveSmallImageHeader: {
    width: '49%',
    backgroundColor: Colors.White,
    aspectRatio: 1,
  },
  fiveSmallImageBody: {
    height: '100%',
    aspectRatio: 1,
  }
  // postIconRight: {
  //   flexDirection: 'row',

  // },
});

export { HomeScreen, Emoji, MemoizedPost }
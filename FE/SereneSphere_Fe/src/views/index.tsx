import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, LoadingScreen } from './login';
// import { RootComponentView } from '../views';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Ionicons từ thư viện expo vector-icons
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import Colors from '../colors/color';
import { HomeScreen } from './home';
import { FollowScreen, SeeMoreFriends } from './follow';
import { MessageScreens } from './message';
import { ProfileScreen } from './profile';
import { NotifyScreen, BottomSheet } from './notification';
import { SettingsScreen } from './settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, SeeMorePostImage } from './post';
import { Comment } from './comment';
import { MessagesAnimate } from './messagesAnimate';
import { countMessagesUnReadAction } from '../acctions/messagesActions';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import socketServices from '../utils/socketService';
import { SearchScreen } from './search';
import { useNavigation } from '@react-navigation/native';
import searchApi from '../API/searchApi';
import { load_data_search } from '../acctions/searchActions';
import TabBarTop from '@react-navigation/material-top-tabs/lib/typescript/src/views/MaterialTopTabBar';


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const TabBottom = createBottomTabNavigator();
const { height } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const size = 40;
// const data = UseSelector((state:RootState) => state.post.posts);
// const statusStatePost = useSelector((state:RootState) => state.post);
const RootComponent = () => {

  // const [token,setToken]=useState('');
  // let token = '';
  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     try {
  //       // const storedAvatar = await AsyncStorage.getItem('AccessAvatar');
  //       const storeToken = await AsyncStorage.getItem('AccessToken');
  //       // if (storedAvatar) {
  //       //   setAvatar(storedAvatar);
  //       // }
  //       if (storeToken) {
  //         setToken(storeToken);
  //         // token = storeToken;
  //         console.log('token '+storeToken)
  //       }
  //       // const data = await postApi.loadPost(storeToken);
  //       // if (data) {
  //       //   console.log('length: ' + data.length)
  //       //   setDataPost(data);
  //       //   setLoading(false);
  //       // }

  //     } catch (error) {
  //       console.error('Failed to load avatar from storage', error);
  //     }
  //   };

  //   fetchAvatar();
  // }, []);
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="RootComponentView" component={RootComponentView} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeHeader = ({ isHomeScreen, navigation }) => {
  // const navigation = useNavigation(); 
  const handleSearch = () => {

    navigation.navigate(SearchScreen);
  }
  if (isHomeScreen) {
    return (
      <View style={styles.header}>
        <Text style={styles.header_title}>Sereneshere</Text>
        {/* {isHomeScreen ? ( // Kiểm tra giá trị của prop */}
        <TouchableOpacity style={styles.searchButton}
          onPress={() => handleSearch()}
        >
          <Ionicons name='search' style={styles.iconSearch} color='black' />
        </TouchableOpacity>
        {/* ) : null} */}
      </View>
    );
  }

}
const RootComponentView = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const statusStatePost = useSelector((state: RootState) => state.post.openPost);
  const statusStatePostImages = useSelector((state: RootState) => state.post.postImages);
  const statusStateComment = useSelector((state: RootState) => state.comment.openComment);
  const statusStateSeeMoreFollower = useSelector((state: RootState) => state.follow.SeeMoreFriendsFollower);
  const statusStateMessages = useSelector((state: RootState) => state.messages.openStateMessages);
  const countMessagesUnRead = useSelector((state: RootState) => state.messages.countMessagesUnRead);
  const statusStateProfile = useSelector((state: RootState) => state.profile.profile_id);
  const loadDataSearch = useSelector((state: RootState) => state.search.data_search);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    try {
      socketServices.on('call-count-messages-un-read', (data) => {
        const actionsMessage = countMessagesUnReadAction(data);
        dispatch(actionsMessage);
      });
    } catch (error) {
      console.log('error load count messages in index component: ', error);
    }
  }, [socketServices]);

  useEffect(() => {
    const fetchDataSearch = async ()=>{
      try {
          const response =await searchApi.loadSearch();

          
          if(response){
              const actions = load_data_search(response);
              dispatch(actions);
          }
      } catch (error) {
          console.log('error load data search: ',error)
      }
  }
  fetchDataSearch();
  }, [])

  return (
    // <HomeHeader isHomeScreen={currentScreen == 'Home'} />
    <View style={{ flex: 1 }}>
      <HomeHeader isHomeScreen={currentScreen == 'Home'} navigation={navigation} />
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="home" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
            ),
            tabBarLabel: () => null,
            tabBarIconStyle: styles.tabBarIcon
          }}
          name="Home"
          component={HomeScreen}
          listeners={{ focus: () => setCurrentScreen('Home') }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="people" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
            ),
            tabBarLabel: () => null,
            tabBarIconStyle: styles.tabBarIcon
          }}
          name="Follow"
          component={FollowScreen}
          listeners={{ focus: () => setCurrentScreen('Follow') }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View >
                {
                  countMessagesUnRead > 0 ?
                    <View style={styles.tabBarNotification}>
                      <Text style={styles.textTabBarNotification}>{countMessagesUnRead}</Text>
                    </View> : ''
                }

                <MaterialCommunityIcons name="chat" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
              </View>
            ),
            tabBarLabel: () => null,
            tabBarIconStyle: styles.tabBarIcon
          }}
          name="Message"
          component={MessageScreen}
          listeners={{ focus: () => setCurrentScreen('Message') }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <View style={styles.tabBarNotification}>
                  <Text style={styles.textTabBarNotification}>10</Text>

                </View>
                <Ionicons name="notifications" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
              </View>),
            tabBarLabel: () => null,
            tabBarIconStyle: styles.tabBarIcon
          }}
          name="Notification"
          component={NotifyScreen}
          listeners={{ focus: () => setCurrentScreen('Notification') }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="settings" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
            )
            , tabBarLabel: () => null,
            tabBarIconStyle: styles.tabBarIcon
          }}
          name="Settings"
          component={SettingsScreen}
          listeners={{ focus: () => setCurrentScreen('settings') }}
        />
        {/* </Tab.Navigator> */}
      </Tab.Navigator>
      {/* { status && <BottomSheet setStatus={ setStatus } /> } */}
      {statusStatePost && <Post height={height} />}
      {statusStateProfile > 0 && <ProfileScreen height={height} />}
      {statusStatePostImages.status && <SeeMorePostImage height={height} item={[]} />}
      {statusStateComment.status && <Comment height={height} />}
      {statusStateSeeMoreFollower.status && <SeeMoreFriends height={height} />}
      {statusStateMessages.status && <MessagesAnimate height={height} />}

      {/* <ProfileScreen height={height}/> */}
    </View>
  );
}

const MessageScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Messages');
  const countMessagesUnRead = useSelector((state: RootState) => state.messages.countMessagesUnRead);

  return (
    <TabBottom.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        // height: 80,
        justifyContent: 'center',
        alignItems: 'center',

      }
    }} >
      <TabBottom.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              // flex: 1,
              width: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {
                countMessagesUnRead > 0 ?
                  <View style={{
                    borderWidth: 3,
                    borderColor: Colors.White,
                    width: size - 12,
                    height: size - 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: Colors.Heart,
                    position: 'absolute',
                    zIndex: 1,
                    right: 5,
                    top: -5
                  }}>
                    <Text style={{
                      fontSize: size - 28,
                      fontWeight: 'bold',
                      color: Colors.White
                    }}>{countMessagesUnRead}</Text>
                  </View> : ''
              }
              <MaterialCommunityIcons name="chat" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
              <Text style={{
                fontSize: 15,
                color: Colors.DarkGray
              }}>Đoạn chat</Text>
            </View>
          ),
          // tabBarLabel: "Đoạn  chat",
          tabBarLabel: () => null,
          tabBarLabelStyle: {
            fontSize: 15
          },
          tabBarStyle: {
            height: 'auto',
            minHeight: 60
          },
          title: null
        }}
        name="Messages"
        component={MessageScreens}
        listeners={{ focus: () => setCurrentScreen('Messages') }}
      />
      <TabBottom.Screen

        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              // flex: 1,
              width: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* <View style={{
                borderWidth: 3,
                borderColor: Colors.White,
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: Colors.Heart,
                position: 'absolute',
                zIndex: 1,
                right: 10,
                top: -5
              }}>
                <Text style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: Colors.White
                }}>1</Text>
              </View> */}
              <Ionicons name="people" color={focused ? Colors.DeepSkyBlue : Colors.DarkGray} size={size} />
              <Text style={{
                fontSize: 15,
                color: Colors.DarkGray
              }}>Danh bạ</Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarLabelStyle: {
            fontSize: 15
          },
          tabBarStyle: {
            height: 'auto',
            minHeight: 60
          },
          title: null
        }}
        name="Mdb"
        component={MessageScreens}
        listeners={{ focus: () => setCurrentScreen('db') }}
      />
    </TabBottom.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    // padding:5
    backgroundColor: Colors.White
  },
  header_title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#32CD32',
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    position: 'absolute',
    right: 25,
    top: 15
  },
  iconSearch: {
    fontSize: 30
  },
  tabBarIcon: {
    height: 40,
    width: screenWidth / 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarNotification: {
    borderWidth: 2,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Heart,
    borderRadius: 50,
    width: size - 15,
    height: size - 15,
    position: 'absolute',
    zIndex: 1,
    right: 0
  },
  textTabBarNotification: {
    fontSize: size - 28,
    fontWeight: 'bold',
    color: Colors.White
  }
})
export { RootComponent }

import React from 'react';
import { View, Text } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons/';
import Colors from "../colors/color";

const Laugh = ({ checkHomeScreen }) => {
    return (
        <View style={{
            borderWidth: 3,
            borderColor: checkHomeScreen ? Colors.White : Colors.Black,
            borderRadius: 50,
            width: 28,
            height: 28,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.Yellow
        }}>
            <Text style={{
                fontSize: 10
            }} >{'> <'}</Text>
            <View style={{
                borderWidth: 1,
                width: 10,
                height: 6,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: Colors.Heart,
                alignItems: 'center',

            }}>
                <View style={{
                    width: '100%',
                    height: '50%',
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                    backgroundColor: Colors.FireBrick,
                    marginBottom: 1,
                }} />
                <View style={{
                    width: '80%',
                    height: 1,
                    backgroundColor: Colors.Heart,
                    position: 'absolute',
                    top: 1.2,
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                }}

                />
            </View>
        </View>

    );
}
const Heart = () => {
    return (
        <View style={{
            // borderWidth:1,
            borderRadius: 50,
            width: 25,
            height: 25,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.Heart
        }}>
            <AntDesign name='heart' size={15} color={Colors.White} />
        </View>
    );
}
const Sad = ({ checkHomeScreen }) => {
    return (
        <View style={{
            borderWidth: 3,
            borderColor: checkHomeScreen ? Colors.White : Colors.Black,
            borderRadius: 50,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            

        }}>
            <MaterialCommunityIcons name='emoticon-sad' size={25} color={Colors.Gold} style={{
                backgroundColor: 'black',
                borderRadius: 50,
            }} />


        </View>
    );
}
export { Laugh, Heart, Sad }
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from "react-native";
import NativeAccessibilityManager from "react-native/Libraries/Components/AccessibilityInfo/NativeAccessibilityManager";

const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listItemSeparatorStyle} />
    );
  };

function DetailItem(data){
    return (
        // Card Template
        <View style= {{padding: 15}}>
            <Text style={styles.key}>{data.label}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.value}>{data.value}</Text>
                <Text style={styles.option}>{data.option}</Text>
            </View>
        </View>
    )
}

function DetailContact({route, navigation}){

    var datas = [];
    const {data} = route.params;

    var key = 1;
    var keys = Object.keys(data.phone);
    Object.values(data.phone).map((i, index) => {
        if (i != null)
            datas.push({key: ++key, label: 'PHONE: ', option: keys[index], value: i});
    });

    datas.push({key: ++key, label: 'ADDRESS:', value: data.address.street + '\n' + data.address.city + ',' + data.address.state + ',' + data.address.zipCode + ',' + data.address.country});
    datas.push({key: ++key, label: 'BIRTHDATE:', value: data.birthdate});
    datas.push({key: ++key, label: 'EMAIL:', value: data.emailAddress});

    useEffect(() => {
        if (data.isFavorite) {
            navigation.setOptions({
                headerRight: (props) => <Image source={require('./download.png')} style={styles.favorite} />
            })
        }
    });

    return (
        <View>
            <View style={{alignItems: 'center',flexDirection: 'row'}}>
                <Image source={{uri: data.largeImageURL}} style={styles.avatar}/>
            </View>
            <Text style={styles.name}>{data.name}</Text>
            <FlatList
                renderItem={({item}) => <DetailItem {...item}/>}
                keyExtractor={item => item.key}
                data = {datas}
                ItemSeparatorComponent = {FlatListItemSeparator}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    key: {
        fontSize: 12,
        color: "#E1E1E1"
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    favorite: {
        width: 20,
        height: 20
    },
    avatar: {
        width: 200,
        height: 200,
        marginTop: 10,
        flex: 1,
        overflow: 'hidden',
        resizeMode: 'contain'
    },
    key: {
        fontSize: 12,
        color: "#AAAAAA"
        
    },
    option: {
        fontSize: 12,
        textAlign: 'right',
        width: '70%',
        color: "#AAAAAA",
        flex: 2,
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listItemSeparatorStyle: {
        height: 1,
        width: '100%',
        backgroundColor: '#C8C8C8'
    
      },
})
export default DetailContact
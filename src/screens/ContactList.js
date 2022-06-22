import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Image } from "react-native";

function ContactItem({navigation, data}) {
	return (
		<View style={styles.item} onStartShouldSetResponder = { () => {
			navigation.navigate('DetailContact', { data:data });
		}}>
			<Image source={{ uri: data.smallImageURL }} style={styles.avatar} />
			{
				data.isFavorite 
				? <Image source={require('./download.png')} style={styles.favorite} />
				: <></>
			}
			<View style={{left: 30}}>
				<Text style={styles.name}>{data.name}</Text>
				<Text style={styles.companyName}>{data.companyName}</Text>
			</View>
		</View>
	);
}

const FlatListItemSeparator = () => {
	return (
		//Item Separator
		<View style={styles.listItemSeparatorStyle} />
	);
};

function ContactList({navigation}) {
	const [contacts, setContacts] = useState(null);
	useEffect(() => {
		fetch('https://s3.amazonaws.com/technical-challenge/v3/contacts.json')
			.then(res => res.json())
			.then(res => {
				var data = [{
					title: 'FAVORITE CONTACTS',
					data: []
				}, {
					title: 'OTHER CONTACTS',
					data: []
				}];
				res.forEach(element => {
					if (element.isFavorite) {
						data[0].data.push(element)
					} else {
						data[1].data.push(element);
					}
				});
				setContacts(data);
			})
	});

	if (contacts === null) {
		return (<Text>'...'</Text>);
	}

	return (
		<SectionList
			ItemSeparatorComponent={FlatListItemSeparator}
			sections={contacts}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <ContactItem navigation={navigation} data={item} />}
			renderSectionHeader={({ section }) => (
				<Text style={styles.header}>{section.title}</Text>
			)}
		/>
	);
}

const styles = StyleSheet.create({

	item: {
		flexDirection: 'row',
		marginVertical: 0,
		padding: 10,
		backgroundColor: '#FFFFFF'
	},
	favorite: {
		width: 20,
		height: 20,
		left: 20
	},
	header: {
		fontSize: 12,
		padding: 8,
		paddingStart: 15,
		backgroundColor: "#E1E1E1",
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	listItemSeparatorStyle: {
		height: 1,
		marginStart: 10,
		paddingRight: 10,
		width: '100%',
		backgroundColor: '#C8C8C8'

	},
	name: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	companyName: {
		color: "#AAAAAA",
		fontSize: 12,

	},
	avatar: {
		height: 50,
		width: 50,
	}
});

export default ContactList;
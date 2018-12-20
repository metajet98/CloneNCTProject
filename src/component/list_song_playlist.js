import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

export default class ListSongPlayList extends Component<Props>{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(

			<TouchableOpacity onPress={()=> {this.props.onPress(this.props.itemkey)}}>
				
				<View style={(this.props.currentSong==this.props.itemkey)?styles.SongItemContainerPlaying:styles.SongItemContainerNonPlaying}>
					<Image
			         style={styles.Avatar}
			          source={{uri: this.props.item.avatar||'https://stc-id.nixcdn.com/v11/images/avatar_default.jpg'}}
			        />
			        
			        <View  style={{marginLeft:5}}>
						<Text style={styles.TieuDe}>{this.props.item.title}</Text>
						<Text style={styles.CaSi}>{this.props.item.singer_name}</Text>
					</View>
				</View>

			</TouchableOpacity>
			



		);
	}

}
const styles = StyleSheet.create({
  Avatar: {
    width: 120,
    height:120
  },
  SongItemContainerNonPlaying:{
  	flexDirection:'row',
  	backgroundColor: '#e4f1fe'
  },
  SongItemContainerPlaying:{
  	flexDirection:'row',
  	backgroundColor: '#3498db'
  },
  TextContent:{
  	flexDirection:'column'
  },
  TieuDe:{
  	color:'black',
    fontWeight: 'bold',
  },
  CaSi:{
  	color:'black'
  },
});
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

export default class ListSong extends Component<Props>{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(

			<TouchableOpacity onPress={()=> {this.props.onPress(this.props.item)}} onLongPress={()=>this.props.onLongPress(this.props.item)}>
				
				<View style={styles.SongItemContainer}>
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
  SongItemContainer:{
  	flexDirection:'row'
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
  }
});
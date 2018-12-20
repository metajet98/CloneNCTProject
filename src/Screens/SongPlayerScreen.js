import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,Image} from 'react-native';
import SoundPlayer from 'react-native-sound-player'


var refresh;


export default class SongPlayerScreen extends Component<Props> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	mp3Source:'',
	  	avatar:'',
	  	title:'',
	  	singer_name:'',
	  	currentTime:'0',
	  	duration:'0',

	  	};
	  	this.getInfo=this.getInfo.bind(this);
	  	this.onPressStart=this.onPressStart.bind(this);	
	}
	componentWillMount()
	{
		this.setState({
			mp3Source:this.props.navigation.getParam('mp3Source'),
		  	avatar:this.props.navigation.getParam('item').avatar,
		  	title:this.props.navigation.getParam('item').title,
		  	singer_name:this.props.navigation.getParam('item').singer_name,
		  	currentTime:'0',
		  	duration:'0',
		});
	}
	render(){
		return(
				<View>
					<Text>{this.state.title}</Text>
					<Text>{this.state.singer_name}</Text>
					
			   		<Text>Time {this.state.currentTime}/{this.state.duration}</Text>
					<Button title="Stop"
		    				color="#841584"
		    				onPress={this.onPressStop}
		    			/>
		    		<Button title="Pause"
		    				color="#841584"
		    				onPress={this.onPressPause}
		    			/>
		    		<Button title="Resume"
		    				color="#841584"
		    				onPress={this.onPressResume}
		    			/>
		    		<Button title="Start"
		    				color="#841584"
		    				onPress={this.onPressStart}
		    			/>
		    		<Button title="Get Info"
		    				color="#841584"
		    				onPress={this.getInfo}
		    			/>	
				</View>

			)
	}
	componentWillUnmount()
	{	
		//console.log('Unmount, stop play');
		SoundPlayer.stop();
	  	
	}



	onPressPause()
	{
		//console.log('Pause Pressed');
		SoundPlayer.pause();
	}
  	onPressResume()
	{
		//console.log('Start Pressed');
		SoundPlayer.resume();
	}
	onPressStop()
	{	if(refresh)
		{		
			clearInterval(refresh);
		}
		//console.log('Stop Pressed');
		SoundPlayer.stop();
		
	}
	
	onPressStart()
	{	
		//this.TimerTest();
		//console.log('Start Pressed');
		SoundPlayer.playUrl(this.state.mp3Source);
	}
	TimerTest()
	{	
		refresh= setInterval(()=>
			{
				this.getInfo();
			}
			, 1000);
		
		
	}
	
	async getInfo() { // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
      //console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
      this.setState({currentTime:info.currentTime,duration:info.duration});
    } catch (e) {
      //console.log('There is no song playing', e)
    	}

	}

}

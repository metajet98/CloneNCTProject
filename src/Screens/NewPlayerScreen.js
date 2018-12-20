import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,Image,Slider} from 'react-native';
var Sound = require('react-native-sound');

import {connect} from 'react-redux'


var whoosh;
export default class NewPlayerScreen extends Component<Props> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	mp3Source:'',
	  	avatar:'',
	  	title:'',
	  	singer_name:'',
	  	currentTime:'0',
	  	duration:0,
	  	sliderValue:0,

	  	};
	  	this.getInfo=this.getInfo.bind(this);
	  	this.onPressStart=this.onPressStart.bind(this);	
	  	this.loadMp3=this.loadMp3.bind(this);
	}
	componentWillMount()
	{	

		Sound.setCategory('Playback');
		console.log('getParam tu Home',this.props.navigation.getParam('mp3Source'));
		this.setState({
			mp3Source:this.props.navigation.getParam('mp3Source'),
		  	avatar:this.props.navigation.getParam('item').avatar,
		  	title:this.props.navigation.getParam('item').title,
		  	singer_name:this.props.navigation.getParam('item').singer_name,
		  	currentTime:0,
		  	duration:0,
		});
		console.log(this.props.navigation.getParam('mp3Source'));
		
	}
	render(){
		return(
				<View>
					<Text>{this.state.title}</Text>
					<Text>{this.state.singer_name}</Text>
					
			   		<Text>Time {this.state.currentTime}/{this.secondToTime(Math.round(this.state.duration))}</Text>
			   		<Slider 
			   			style={{width:300}}
			   			step={1}
			   			value={this.state.sliderValue}
			   			minimumValue={0}
			   			maximumValue={this.state.duration}
			   			onValueChange={val=>this.seekTo(val)}
			   			/>


			   		<View style={styles.ButtonContainer}>
			   			<Button title="Stop"
		    				color="#841584"
		    				onPress={this.onPressStop}
		    			/>
			    		<Button title="Pause"
			    				color="#841584"
			    				onPress={this.onPressPause}
			    			/>
			    		<Button title="Start"
			    				color="#841584"
			    				onPress={this.onPressStart}
			    			/>
			    		<Button title="Zoom"
			    				color="#841584"
			    				onPress={this.onPressZoom}
			    			/>
			   		</View>

					
		    		
				</View>

			)
	}
	componentDidMount()
	{
		this.loadMp3();
		this.onPressStart();
	}
	componentWillUnmount()
	{
		console.log('componentWillUnmount');
		this.props.navigation.state.params.returnWhoosh(whoosh);
		console.log(whoosh);

	}

	loadMp3()
	{	
		console.log('load file',this.state.mp3Source);
		whoosh = new Sound((this.state.mp3Source), Sound.MAIN_BUNDLE, (error) => {
		  if (error) {
		    console.log('failed to load the sound', error);
		    return;
		  }
		  // loaded successfully
		  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
		  this.onPressStart();
		});
	}
	seekTo(value)
	{
		whoosh.setCurrentTime(value);
	}
	onPressPause()
	{
		console.log('Pause Pressed');
		whoosh.pause();
		
	}

	onPressStop()
	{	
		whoosh.stop();
	}
	
	onPressStart()
	{	
		this.TimerTest();
		console.log('Start Pressed');
			
		whoosh.play((success) => {
		  if (success) {
		    console.log('successfully finished playing');
		  } else {
		    console.log('playback failed due to audio decoding errors');
		    // reset the player to its uninitialized state (android only)
		    // this is the only option to recover after an error occured and use the player again
		    whoosh.reset();
		  }
		});
		this.setState({duration:whoosh.getDuration()});
		
	}
	TimerTest()
	{	
		refresh= setInterval(()=>
			{
				this.getInfo();
			}
			, 1000);
		
		
	}
	getInfo() {
		try {
			whoosh.getCurrentTime((seconds) =>this.setState({currentTime:this.secondToTime(Math.round(seconds)),sliderValue:seconds}));    

			    	
			    
		} catch(e) {
			// statements
			console.log('There is no song playing', e)
		}
	}
	secondToTime(seconds)
	{
		var time=seconds%60;
		time=(seconds-time)/60+':'+time%60;
		return time;
	}
	



	
}
const styles = StyleSheet.create({
  Avatar: {
    width: 120,
    height: 120
  },
  ButtonContainer:{
  	flexDirection:'row'
  },
  TextContent:{
  	flexDirection:'column'
  }
});

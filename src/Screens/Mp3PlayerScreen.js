import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,Image,Slider,Dimensions} from 'react-native';
import ListSongPlayList from '../component/list_song_playlist.js'
var Sound = require('react-native-sound');

import {connect} from 'react-redux'

var refresh;
var refreshForNext;
class Mp3PlayerScreen extends Component<Props> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentTime:0,
	  	duration:0,
	  	sliderValue:0,
	  	};
	  	this.getInfo=this.getInfo.bind(this);
	  	this.getInfoNext=this.getInfoNext.bind(this);
	  	this.onPressStart=this.onPressStart.bind(this);	
	  	this.onPressNext=this.onPressNext.bind(this);
		this.onPressStop=this.onPressStop.bind(this);	
		this.onPressPause=this.onPressPause.bind(this);  	
		this.playSongOnList=this.playSongOnList.bind(this);
	}

	render(){
		return(
				<View style={{backgroundColor: '#e4f1fe'}}>
					{this.props.currentSongNum!==''&&
					<View>
						{this.props.playList.length!==0&&
							<View>
								<Text style={styles.TieuDe}>{this.props.playList[this.props.currentSongNum].item.title}</Text>
								<Text style={styles.CaSi}>{this.props.playList[this.props.currentSongNum].item.singer_name}</Text>
							</View>
						}
						
						<View style={{flexDirection:'row'}}>
							<Text>{this.state.currentTime}</Text>
					   		<Slider 
					   			style={{width:Dimensions.get('window').width-70}}
					   			step={1}
					   			value={this.state.sliderValue}
					   			minimumValue={0}
					   			maximumValue={this.state.duration}
					   			onValueChange={val=>this.seekTo(val)}
					   			/>
					   		<Text>{this.secondToTime(Math.round(this.state.duration))}</Text>
						</View>
				   		


					</View>
					}
					
			   		<View style={styles.ButtonContainer}>
			   			<View style={{flex:1}}>
			   			<Button title="Stop"
		    				color="#841584"
		    				onPress={this.onPressStop}
		    			/>
		    			</View>

		    			<View style={{flex:1}}>
			    		<Button title="Pause"
			    				color="#841584"
			    				onPress={this.onPressPause}
			    			/>
			    		</View>

			    		<View style={{flex:1}}>
			    		<Button title="Start"
			    				color="#841584"
			    				onPress={this.onPressStart}
			    			/>
			    		</View>
			    		<View style={{flex:1}}>
			    		<Button title="Next"
			    				color="#841584"
			    				onPress={this.onPressNext}
			    			/>
			    		</View>
			    		
			    		<View style={{flex:1}}>
			    		<Button title="Clear"
			    				color="#841584"
			    				onPress={()=>this.props.dispatch({type:'DEL_PLAYLIST'})}
			    			/>
			    		</View>
			   		</View>
			   		<FlatList
                        horizontal={false}
                        data={this.props.playList}
                        keyExreactor={(item, index)=>index}
                        renderItem={({item,index})=>
                          <ListSongPlayList item={item.item} currentSong={this.props.currentSongNum} itemkey={index} onPress={this.playSongOnList}/>
                        }
                        >        
                        </FlatList>

				</View>	
		  

			)
	}
	playSongOnList(key)
	{
		//console.log(key);
		this.props.dispatch({type:'CHANG_CURRENT_SONG_ON_PLAYLIST',currentSongNum:key});
		this.props.dispatch({type:'LOAD_SONG'});
	}
	componentWillMount()
	{
		if(this.props.whoosh!=='')
		{
			this.setState({duration:this.props.whoosh.getDuration()});


		}
		
	}
	componentDidMount()
	{
		this.TimerTest();
	}
	componentWillUnmount()
	{
		if(refresh)
		{		
			clearInterval(refresh);
		}
		if(refreshForNext)
		{		
			clearInterval(refreshForNext);
		}
	}

	
	seekTo(value)
	{
		this.props.whoosh.setCurrentTime(value);
	}
	onPressPause()
	{
		//console.log('Pause Pressed');
		this.props.dispatch({type:'PAUSE_SONG'});
		
	}

	onPressStop()
	{	
		//console.log('STOP Pressed');
		this.props.dispatch({type:'STOP_SONG'});
	}
	onPressNext()
	{	
		this.props.dispatch({type:'NEXT'});
		this.props.dispatch({type:'LOAD_SONG'});

	}
	
	onPressStart()
	{	

		if(this.props.whoosh=='') this.props.dispatch({type:'LOAD_SONG'});
		else
			this.props.dispatch({type:'START_SONG'});
		//this.TimerTest();
		//console.log('Start Pressed');
			
		
		//this.setState({duration:this.props.whoosh.getDuration()});

	}
	TimerTest()
	{	
		refresh= setInterval(()=>
			{
				this.getInfo();

			}
			, 1000);
		refreshForNext= setInterval(()=>
			{
				this.getInfoNext();

			}
			, 10000);

		
		
	}
	getInfo() {
		try {
			this.props.whoosh.getCurrentTime((seconds) =>{
				this.setState({currentTime:this.secondToTime(Math.round(seconds)),sliderValue:seconds});
				
			});    

			    		
			    
		} catch(e) {
			// statements
			//console.log('There is no song playing', e)
		}
	}
	getInfoNext() {
		try {
			this.props.whoosh.getCurrentTime((seconds) =>{
				if(Math.abs(this.props.whoosh.getDuration()-seconds)<2)
					this.onPressNext();
				
			});    

			    		
			    
		} catch(e) {
			// statements
			//console.log('There is no song playing', e)
		}
	}
	secondToTime(seconds)
	{
		var time=seconds%60;
		time=(seconds-time)/60+':'+time%60;
		return time;
	}
	




	
}
function mapStateToProps(state)
{
	return{
		playList:state.playList,
		whoosh:state.whoosh,
		isPlaying:state.isPlaying,
		isPaused:state.isPaused,
		currentSongNum:state.currentSongNum,
		state:state,
	}
}

export default connect(mapStateToProps)(Mp3PlayerScreen);

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
  },

  TieuDe:{
  	color:'black',
    fontWeight: 'bold',
    fontSize:16,
  },
  CaSi:{
  	color:'black'
  },
});

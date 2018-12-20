import React, {Component} from 'react';
import {TouchableWithoutFeedback,Dimensions, Platform, 
	StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,StatusBar,Modal,Alert,

} from 'react-native';
import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Orientation from 'react-native-orientation';



export default class VideoPlayerScreen extends Component<Props> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	paused:false,
	  	progress:0,
	  	duration:0,
	  	videoSource:'',
	  	isFullscreen:false,
	  	showControls:true,
	  };
	  this.handleMainButtonTouch=this.handleMainButtonTouch.bind(this);
	  this.handleProgress=this.handleProgress.bind(this);
	  this.handleEnd=this.handleEnd.bind(this);
	  this.handleLoad=this.handleLoad.bind(this);
	  //this.loadSourceFile=this.loadSourceFile.bind(this);
	  this.handleFullScreenTouch=this.handleFullScreenTouch.bind(this);
	  this.handleScreenTouch=this.handleScreenTouch.bind(this);
	}
	componentWillMount()
	{	
		
		this.setState({
			videoSource:this.props.navigation.getParam('videoSource'),
		  	avatar:this.props.navigation.getParam('item').avatar,
		  	title:this.props.navigation.getParam('item').title,
		  	singer_name:this.props.navigation.getParam('item').singer_name,
		  	currentTime:0,
		  	duration:0,
		});

	}
	componentWillUpdate()
	{

	}
	render(){
		const { width,height } = Dimensions.get("window");
    	
		
		const heightmini=width*.5625;
		//console.log(width,height,heightmini);
		return( 
				<View>
					<View>
						<TouchableWithoutFeedback onPress={this.handleScreenTouch}>
							<Video 
								source={{uri: this.state.videoSource}}   // Can be a URL or a local file.
						    	ref={(ref) => {
						         this.player = ref
						    	}}
						    	paused={this.state.paused}
						    	style={{ width: "100%",'height':this.state.isFullscreen?height:heightmini}}
						    	resizeMode="contain"
						    	onLoad={this.handleLoad}
						    	onProgress={this.handleProgress}
						    	onEnd={this.handleEnd}
						    	                            
						    />
						</TouchableWithoutFeedback>
						
						{this.state.showControls &&
						<View style={styles.controls}>
							<TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
				            	<Icon name={!this.state.paused ? "pause-circle" : "play-circle"} size={30} color="#FFF" />
				            </TouchableWithoutFeedback>

				            <TouchableWithoutFeedback onPress={this.handleProgressPress}>
				              <View>
				                <ProgressBar
				                  progress={this.state.progress}
				                  color="#FFF"
				                  unfilledColor="rgba(255,255,255,.5)"
				                  borderColor="#FFF"
				                  width={250}
				                  height={20}
				                />
				              </View>
				            </TouchableWithoutFeedback>

				            <Text style={styles.duration}>
				              {this.secondsToTime(Math.floor(this.state.progress * this.state.duration))+'/'+this.secondsToTime(Math.floor(this.state.duration))}
				            </Text>

				            <TouchableWithoutFeedback onPress={this.handleFullScreenTouch}>
						        <Icon name={!this.state.isFullscreen ? "fullscreen" : "fullscreen-exit"} size={30} color="#FFF" />
						    </TouchableWithoutFeedback>	

						</View>
						}

					</View>		
				</View>

			)
	}
	componentDidMount(){

	}
	handleScreenTouch(){
		if(this.state.showControls) {
			this.setState({showControls:false});
			
		}
		else{
			
			this.setState({showControls:true});
			if(this.state.paused) this.handleMainButtonTouch();
		}
	}
	handleFullScreenTouch()
	{	

		this.setState({
			isFullscreen:!this.state.isFullscreen,
		});
		if(this.state.isFullscreen) 
			{	
				StatusBar.setHidden(false);
				Orientation.lockToPortrait();
			}
		else 
			{	
				StatusBar.setHidden(true);
				Orientation.lockToLandscape();
			}


	}
	handleProgressPress = e => {
	    const position = e.nativeEvent.locationX;
	    const progress = (position / 250) * this.state.duration;
	    const isPlaying = !this.state.paused;
	    
	    this.player.seek(progress);
	};
	handleMainButtonTouch(){
		if (this.state.progress >= 1) {
	      this.player.seek(0);
	    }

	    this.setState({
	    	paused: !this.state.paused,
	    	});
	}
	handleProgress(progress){
		this.setState({
	      progress: progress.currentTime / this.state.duration,
	    });
	}
	handleEnd(){
	    this.setState({ paused: true });
		};
	handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };
	secondsToTime(seconds)
	{
		var time=seconds%60;
		time=(seconds-time)/60+':'+time%60;
		return time;
	}
	
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  controls:{
  	backgroundColor:"rgba(0, 0, 0, 0.5)",
  	height:48,
  	left:0,
  	bottom:0,
  	right:0,
  	position:"absolute",
  	flexDirection:"row",
  	alignItems:"center",
  	justifyContent:"space-around",
  	paddingHorizontal: 10,


  },
  mainButtom:{
  	marginRight:15,
  },
  duration:{
  	color:"#FFF",
  	marginLeft:15,

  },
});
//
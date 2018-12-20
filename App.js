import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList} from 'react-native';
import {AppContainer} from './src/Router.js'
var Sound = require('react-native-sound');

import { createStore } from 'redux'
import { Provider } from 'react-redux'
const defaultState={
	playList:[],
	whoosh:'',
	isPlaying:false,
	currentSongNum:0,
	isPaused:false,
	isShowMiniPlayer:false,
	isLoading:false,

}


const reducer = (state=defaultState,action)=>{
	switch (action.type) {
		case 'ADD_SONG_TO_PLAYLIST': return{
			...state,
			playList:state.playList.concat({
				item:action.item,
				mp3Source:action.mp3Source,
			})
		};
		case 'ADD_SONG_TO_FIRST_PLAYLIST': 
		{		
			if(state.isPlaying) 
			{
				state.whoosh.stop();
			}
				return{
					...state,
					playList:[{
						item:action.item,
						mp3Source:action.mp3Source,
					},...state.playList],
					
				};}
		case 'ADD_PLAYLIST': {
			//console.log('redux:Playlist receive: ',action.playList)
			return{
					...state,
					playList:action.playList,
					currentSongNum:0,
				};
		};

		case 'IS_LOADING_TRUE': 
		{	console.log('IS_LOADING_TRUE');
			return{
					...state,
					isLoading:true,
				};
		};
		case 'IS_LOADING_FALSE': {
			console.log('IS_LOADING_FALSE');
			return{
					...state,
					isLoading:false,
				};
		};
		case 'DEL_PLAYLIST': {

			state.whoosh.stop();
			return{
			...state,
			playList:[],
			isPlaying:false,
			};
		}
		
		case 'UPDATE_WHOOSH': return{
			...state,
			whoosh:action.whoosh,
		};
		case 'UPDATE_ISPLAYING': return{
			...state,
			isPlaying:action.isPlaying,
		};
		case 'NEXT': return{
			...state,
			currentSongNum:state.currentSongNum+1<state.playList.length?state.currentSongNum+1:0,
		};
		case 'CLEAR_PLAYER': 
		{	
			if(state.whoosh!==''&&state.isPlaying==true)
			{
				state.whoosh.stop();
				state.whoosh.reset();
			}
			return{
				...state,
				currentSongNum:state.currentSongNum+1<state.playList.length?state.currentSongNum+1:0,
			};
		}
		
		case 'CHANGE_MINI_PLAYER': return{
			...state,
			isShowMiniPlayer:!state.isShowMiniPlayer,
		};
		

		case 'LOAD_SONG':
		{		
			var flag=false;
			if(state.isPlaying)
			{	
				state.whoosh.stop();
				state.whoosh = new Sound((state.playList[state.currentSongNum].mp3Source), Sound.MAIN_BUNDLE, (error) => {
				if (error) {
					//console.log('failed to load the sound', error);
					
				}
					// loaded successfully
					//console.log('duration in seconds: ' + state.whoosh.getDuration() + 'number of channels: ' + state.whoosh.getNumberOfChannels());

					state.whoosh.play();
					flag=true;
				});
			}
			else{
				state.whoosh = new Sound((state.playList[state.currentSongNum].mp3Source), Sound.MAIN_BUNDLE, (error) => {
				if (error) {
					//console.log('failed to load the sound', error);
					
				}
					// loaded successfully
					//console.log('duration in seconds: ' + state.whoosh.getDuration() + 'number of channels: ' + state.whoosh.getNumberOfChannels());

					state.whoosh.play();
					//state.isPlaying=true;
					flag=true;
				});
			}
			
			return{
					...state,
					whoosh:state.whoosh,
					isPlaying:true,
					isShowMiniPlayer:true,
				};
		}
		case 'PAUSE_SONG':
		{	
			
			if(state.isPlaying)
			{	
				//console.log('PAUSE_SONG');
				state.whoosh.pause();
				state.isPlaying=false;
			}
			return{
				...state,
				whoosh:state.whoosh,
				isPlaying:false,
			};
		}
		case 'STOP_SONG':
		{	
			
			if(state.isPlaying)
			{	
				//console.log('STOP_SONG');
				state.whoosh.stop();
				state.isPlaying=false;
			}
			return{
				...state,
				whoosh:state.whoosh,
				isPlaying:false,
			};
		}

		case 'START_SONG':
		{	
			

				//console.log('START_SONG');
				state.whoosh.play();
				state.isPlaying=true;
			
			return{
				...state,
				whoosh:state.whoosh,
				isPlaying:true,
			};
		}
		case 'CHANG_CURRENT_SONG_ON_PLAYLIST':
		{	
			
			//console.log('STOP_SONG');
			state.whoosh.stop();
			state.isPlaying=false;


			return{
				...state,
				currentSongNum:action.currentSongNum,
				isPlaying:false,
			};
		}

		default:
			// statements_def
			break;
	}
	return state;	
}

const store=createStore(reducer);

export default class App extends Component<Props> {

  render(){
    return(

    	<Provider store={store}>
    		<AppContainer/>
    	</Provider>

      )
  }
}


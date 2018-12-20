import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import TestScreen from "./Screens/TestScreen.js";
//import SongPlayerScreen from "./Screens/SongPlayerScreen.js";
import HomeScreen from "./Screens/HomeScreen.js";
import NewPlayerScreen from "./Screens/NewPlayerScreen.js";
import VideoPlayerScreen from "./Screens/VideoPlayerScreen.js"
import SearchScreen from "./Screens/SearchScreen.js"
import Mp3PlayerScreen from "./Screens/Mp3PlayerScreen.js"





export const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    //SongPlayer: SongPlayerScreen,
    NewPlayer:NewPlayerScreen,
    Test:TestScreen,
    VideoPlayer:{
    	screen:VideoPlayerScreen,
    	navigationOptions:
    		{
                header: null
        	}
    },
    Search:SearchScreen,
    Mp3Player:Mp3PlayerScreen,


    
  },
  {
    initialRouteName: "Home",
  }
);

export const AppContainer = createAppContainer(RootStack);



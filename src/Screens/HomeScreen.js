import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,TouchableOpacity,RefreshControl,ActivityIndicator,NetInfo} from 'react-native';
import ListSong from '../component/list_song.js'
import ListSongNgang from '../component/list_song_ngang.js'
import ListVideo from '../component/list_video.js'
import ListVideoNgang from '../component/list_video_ngang.js'

import Helper from '../Helper.js'

import {connect} from 'react-redux'

var Sound = require('react-native-sound');
var whoosh;

class HomeScreen extends Component<Props> {



  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      listNgheGiHomNay:[],
      listAlbumHot:[],
      listBaiHatHot:[],
      refreshing: false,
      isLoading:true,

    };
    this.getNgheGiHomNay=this.getNgheGiHomNay.bind(this);
    this.playPlaylist=this.playPlaylist.bind(this);
    this.getAlbumHot=this.getAlbumHot.bind(this);
    this.getBaiHatHot=this.getBaiHatHot.bind(this);
    this.playSong=this.playSong.bind(this);
    this._onRefresh=this._onRefresh.bind(this);
    this.addSongToPlayList=this.addSongToPlayList.bind(this);

  }

   _onRefresh = () => {
    this.setState({refreshing: true});
    this.setState({isLoading:true});
    this.setState({
      listNgheGiHomNay:[],
      listAlbumHot:[],
      listBaiHatHot:[],
    });
    
    this.setState({refreshing:false});
    this.loadHomePage();
  }

  componentWillMount()
  { 

    this.loadHomePage();
  }
  conponentDidMount()
  {
    
    
  }
  loadHomePage()
  {
    this.getNgheGiHomNay();
    this.getAlbumHot();
    this.getBaiHatHot();
    
  }
  async getBaiHatHot(){

    //this.setState({listBaiHatHot:await Helper.getBaiHatHot()});
    await Helper.getBaiHatHot()
    .then((listItem)=>{
      this.setState({listBaiHatHot:listItem});
      this.setState({isLoading:false});
    })
  }
  async getNgheGiHomNay(){

    this.setState({listNgheGiHomNay:await Helper.getNgheGiHomNay()});
  }
  async getAlbumHot(){

    this.setState({listAlbumHot:await Helper.getAlbumHot()});
    //this.setState({isLoading:false});
  }

  async addSongToPlayList(item){
    //console.log('add song to playlist',item);
    this.props.dispatch({type:'IS_LOADING_TRUE'});
      await Helper.getMp3Source(item.link)
      .then(returnResult=>{
        this.props.dispatch({type:'ADD_SONG_TO_PLAYLIST',item:item,mp3Source:returnResult});
        this.props.dispatch({type:'IS_LOADING_FALSE'});
      })
  }

  async playPlaylist(item){
        
    if (!this.props.isLoading) {
      this.props.dispatch({type:'IS_LOADING_TRUE'});
      this.props.dispatch({type:'CLEAR_PLAYER'});
      await Helper.getSongFromPlaylist(item.link)
      .then(returnResult=> {
        this.props.dispatch({type:'ADD_PLAYLIST',playList:returnResult});
        this.props.dispatch({type:'IS_LOADING_FALSE'});
      })
      
      this.props.dispatch({type:'LOAD_SONG'});
    }
    
  }
  async playSong(item){
    
        
    if (!this.props.isLoading) {
      this.props.dispatch({type:'IS_LOADING_TRUE'});
      this.props.dispatch({type:'CLEAR_PLAYER'});
      await Helper.getMp3Source(item.link)
      .then(returnResult=>{
        this.props.dispatch({type:'ADD_SONG_TO_FIRST_PLAYLIST',item:item,mp3Source:returnResult});
        this.props.dispatch({type:'IS_LOADING_FALSE'});
      })
  
      this.props.dispatch({type:'LOAD_SONG'});
    }
    
  }

  render() {
    return (
      <View style={{backgroundColor: '#e4f1fe'}}>
        {this.props.isLoading&&
                <View>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
              }
        <View>
            <Button
            onPress={()=>{
              this.props.navigation.navigate('Search');

            }}
            title="Tìm kiếm...."
            color="#841584"
            />

        </View>

        {this.props.isShowMiniPlayer&&
          <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
              <Button title="Stop"
                color="#841584"
                onPress={()=>{
                  this.props.dispatch({type:'STOP_SONG'});
                }}
              />
              </View>

              <View style={{flex:1}}>
              
              <Button title="Pause"
                  color="#841584"
                  onPress={()=>{
                    this.props.dispatch({type:'PAUSE_SONG'});
                  }}
                />
              </View>

              <View style={{flex:1}}>
                <Button title="Start"
                    color="#841584"
                    onPress={()=>{
                      if(this.props.whoosh=='') this.props.dispatch({type:'LOAD_SONG'});
                      else
                        this.props.dispatch({type:'START_SONG'});
                    }}
                  />
              </View>
              <View style={{flex:1}}>
              <Button title="Next"
                  color="#841584"
                  onPress={()=>{
                    this.props.dispatch({type:'NEXT'});
                    this.props.dispatch({type:'LOAD_SONG'});
                  }}
                />
              </View>
              

              <View style={{flex:1}}>
              <Button
                onPress={()=>{
                  this.props.navigation.navigate('Mp3Player');

                }}
                title="ZOOM"
                color="#841584"
                />
              </View>
          </View>
 
      }

      <TouchableOpacity onPress = {() => {this.props.dispatch({type:'CHANGE_MINI_PLAYER'})}}>
        <View style = {{backgroundColor: '#841584', alignItems: 'center',justifyContent: 'center',heiht:10}}>
            <Text style = {{color: 'white'}}>...</Text>
        </View>
      </TouchableOpacity>

      <ScrollView 
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          />}>
          
        {this.state.isLoading?
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>:
        <View>
            <View>

                  <Text style={styles.labelText}>Nghe gì hôm nay</Text>
                  <FlatList
                    horizontal={true}
                    data={this.state.listNgheGiHomNay}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListVideoNgang item={item} key={i} onPress={this.playPlaylist}/>
                    }>        
                  </FlatList>

              </View>

              <View>

                  <Text style={styles.labelText}>Album Hot</Text>
                  <FlatList
                    horizontal={true}
                    data={this.state.listAlbumHot}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListVideoNgang item={item} key={i} onPress={this.playPlaylist}/>
                    }>        
                  </FlatList>

              </View>
            
              <View>

                  <Text style={styles.labelText}>Bài hát trong ngày</Text>
                  <FlatList
                    horizontal={true}
                    data={this.state.listBaiHatHot}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListSongNgang item={item} key={i} onPress={this.playSong} onLongPress={this.addSongToPlayList}/>
                    }>        
                  </FlatList>

              </View>
        </View>
      }

              

      </ScrollView>
      
      
  </View>
  );
  }
}

const styles = StyleSheet.create({
  labelText: {
    color:'red',
    fontWeight: 'bold',

  },
  tabView:{
    flex: 1,
    borderWidth:5,

  },
  tabViewChosen:{
    flex: 1,
    borderWidth:5,
    backgroundColor: 'blue',

  }
});









function mapStateToProps(state)
{
  return{
    playList:state.playList,
    whoosh:state.whoosh,
    isPlaying:state.isPlaying,
    currentSongNum:state.currentSongNum,
    isPaused:state.isPaused,
    state:state,
    isShowMiniPlayer:state.isShowMiniPlayer,
    isLoading:state.isLoading,
  }
}

export default connect(mapStateToProps)(HomeScreen);
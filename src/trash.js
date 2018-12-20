<Modal 
						visible={this.state.isFullscreen}
						
				        onBackButtonPress={()=>{
				        	this.setState({
				        		isFullscreen:false,
				        	})
				        }}
						>
	                    <View>
							<Video 
								source={{uri: this.state.fileSource}}   // Can be a URL or a local file.
						    	ref={(ref) => {
						         this.player = ref
						    	}}
						    	paused={this.state.paused}
						    	style={{width,height}}
						    	resizeMode="contain"
						    	onLoad={this.handleLoad}
						    	onProgress={this.handleProgress}
						    	onEnd={this.handleEnd}
						    	                            
						    />

							<View style={styles.controls}>
								<TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
					            	<Icon name={!this.state.paused ? "play-circle" : "pause-circle"} size={30} color="#FFF" />
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

							</View>
                	</Modal>



                	
for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[1].childNodes[1].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));	        
	        avatar=avatar[1];
	        //console.log(avatar);   

	        title=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.title;
	        link=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.href;
	        singer_name=liList.get(i).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
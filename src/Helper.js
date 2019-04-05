const cheerio = require('cheerio-without-node-native')
import React from 'react';


export default class Helper
{	
	static async getMp3SourceFromXml(xmlUrl){//lay link source mp3 tu url bai hat
		
		let response = await fetch(xmlUrl);
	    let htmlString = await response.text();
	    var returnResult;
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString,{
	    	normalizeWhitespace: true,
    		xmlMode: true
	    });
	    //console.log($.xml());

	    var parseString = require('react-native-xml2js').parseString;//thu vien chuyen xml to json
		var xml =$.xml();
		parseString(xml, function (err, result) {//xu ly loc json ra source
			returnResult=result.tracklist.track[0].location[0];
			returnResult=returnResult.split(' ').join('');
			returnResult=returnResult.split('\n').join('');

			//console.log(returnResult);
		    
		});

		return returnResult;



	}
	static async getMp3Source(url){//lay link source mp3 tu url bai hat
		console.log('get mp3 '+url);
		var xmlUrl=await this.getXmlUrl(url);//tu link bai hat, lay link xml
		let response = await fetch(xmlUrl);
	    let htmlString = await response.text();
	    var returnResult;
	    console.log(htmlString);
	    const $ = cheerio.load(htmlString,{
	    	normalizeWhitespace: true,
    		xmlMode: true
	    });
	    console.log($.xml());

	    var parseString = require('react-native-xml2js').parseString;//thu vien chuyen xml to json
		var xml =$.xml();
		parseString(xml, function (err, result) {//xu ly loc json ra source
			returnResult=result.tracklist.track[0].location[0];
			returnResult=returnResult.split(' ').join('');
			returnResult=returnResult.split('\n').join('');

			console.log(returnResult);
		    
		});

		return returnResult;



	}
	static async getXmlUrl(url){
    if(url!='')
	    {
	    
	    let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString);
	    const temp=$(".playing_absolute");
	    console.log(temp);
	    //console.log(temp.get(0).childNodes[7].childNodes[0].data);
	    var firstvariable = "player.peConfig.xmlURL = ";
	    var secondvariable = ";n                                player.peConfig.defaultIndex";
	    var linksource = JSON.stringify(temp.get(0).childNodes[13].childNodes[0].data);
	    linksource=linksource.split('"').join('');
	    linksource = linksource.replace(/\n|\r|\\/g, "");

	        
	    linksource=linksource.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	    //console.log(linksource[1]); 
	    return linksource[1];
	    }  
  	}
  	static async getXmlUrlVideo(url){
    if(url!='')
	    {
	    
	    let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString);
	    const temp=$(".box-view-player");
	    //console.log(temp);
	    var firstvariable = "player.peConfig.xmlURL=";
	    var secondvariable = ";nplayer.load";
	    var linksource = JSON.stringify(temp.get(0).childNodes[3].childNodes[0].data);
	    linksource=linksource.split('"').join('');
	    linksource=linksource.split(' ').join('');
	    linksource=linksource.replace(/\n|\r|\\/g, "");
	    //console.log(linksource); 
	    linksource=linksource.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	    //console.log(linksource[1]); 
	    return linksource[1];
	    }  
  	}
  	static async getVideoSource(url){
		var xmlUrl=await this.getXmlUrlVideo(url);
		let response = await fetch(xmlUrl);
	    let htmlString = await response.text();
	    var returnResult;
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString,{
	    	normalizeWhitespace: true,
    		xmlMode: true
	    });
	    //console.log($.xml());

	    var parseString = require('react-native-xml2js').parseString;
		var xml =$.xml();
		parseString(xml, function (err, result) {
				
			returnResult=result.tracklist.track[0].item[0].location[0];
			//console.log(returnResult);
		    
		});

		return returnResult;



	}
	static async getSearchSongRespone(keyword)
	{	
		//console.log('Helper Function getSearchSongRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/bai-hat?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".sn_search_single_song");
	    //console.log(liList);
	    for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[0].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');     
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	        avatar=avatar[1];
	        title=liList.get(i).childNodes[1].attribs.title;
	        link=liList.get(i).childNodes[1].attribs.href;
	        singer_name=liList.get(0).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
	     //console.log(listItem);



		return listItem;
	}
	static async getSearchVideoRespone(keyword)
	{	
		//console.log('Helper Function getSearchVideoRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/mv?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".small_item_video");
	    //console.log(liList);
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
	     //console.log(listItem);



		return listItem;
	}
	static async getSearchKaraokeRespone(keyword)
	{	
		//console.log('Helper Function getSearchKaraokeRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/karaoke?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".small_item_video");
	    //console.log(liList);
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
	     //console.log(listItem);



		return listItem;
	}
	static async getSearchPlaylistRespone(keyword)
	{	
		//console.log('Helper Function getSearchPlaylistRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/playlist?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".search_item_album");
	    //console.log(liList);
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
	     //console.log(listItem);



		return listItem;
	}
	static async getSongFromPlaylist(url)
	{	
		var returnResult=[];
		//console.log('Helper Function getSongFromPlaylist');
		let response = await fetch(url);
	    let htmlString = await response.text();
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".list_song_in_album");
	    var temp=liList[0].childNodes[1].childNodes;
	    //console.log(temp);

	    for(i=0;i<temp.length;i++)
	    {	
	    	if(temp[i].type=='tag')
	    	{	
	    		var mp3Source;
	    		var temp1=temp[i];
	    		var title=temp1.childNodes[1].attribs.content;
	    		var link=temp1.childNodes[3].attribs.content;
	    		mp3Source=await this.getMp3Source(link);
	    		returnResult=[...returnResult,{
	    		'item':{
	    			'title':title,
		        	'link':link,
		        	'avatar':'',
		        	'singer_name':'N/A',
		    		},
		    	'mp3Source':mp3Source,
	        	
	        	}];
	    	}
	    }
		//console.log('returnResult: ',returnResult);
		return returnResult;
	}	



	static async getNgheGiHomNay()
	{	
		//console.log('Helper Function getNgheGiHomNay')
		//var avatar,title,link,singer_name;
		var listItem=[];

		
		const url= 'https://www.nhaccuatui.com';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".ngheGiHomNay");


	    var temp=liList[0].childNodes[1].childNodes[3];

	    //console.log(temp);
	    
	    for(i=1;i<temp.childNodes.length;i+=2)
	    {	
	    	var avatar=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[3].childNodes[0].attribs.src;
	    	var link=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.href;
	    	var title=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.title;
	    	//console.log(title,avatar,link);
	    	listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':'',
	        }];
	    }
	   	
	    //console.log('Nghe gi hom nay: ',listItem);
	    
	    



		return listItem;
	} 
	static async getAlbumHot()
	{	
		//console.log('Helper Function getAlbumHot')
		//var avatar,title,link,singer_name;
		var listItem=[];

		
		const url= 'https://www.nhaccuatui.com';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".albumHot");


	    var temp=liList[0].childNodes[1].childNodes[3];

	    //console.log(temp);
	    
	    for(i=1;i<temp.childNodes.length;i+=2)
	    {	
	    	var avatar=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[3].childNodes[0].attribs.src;
	    	var link=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.href;
	    	var title=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.title;
	    	//console.log(title,avatar,link);
	    	listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':'',
	        }];
	    }
	   	
	    //console.log('Album Hot: ',listItem);
	    
	    



		return listItem;
	}
	static async getBaiHatHot()
	{	
		//console.log('Helper Function getBaiHatHot')
		//var avatar,title,link,singer_name;
		var listItem=[];

		
		const url= 'https://www.nhaccuatui.com';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".listSong");


	    var temp=liList[0].childNodes[1].childNodes[3];

	    //console.log(temp);
	    
	    for(i=1;i<temp.childNodes.length;i+=2)
	    {	
	    	//console.log(temp.childNodes[i]);
	    	var link=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[1].attribs.href;
	    	var title=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[1].attribs.title;
	    	var avatar=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].attribs.src;
	    	// var avatar=temp.childNodes[i].childNodes[1].childNodes[1].childNodes[3].childNodes[0].attribs.src;
	    	// var link=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.href;
	    	// var title=temp.childNodes[i].childNodes[3].childNodes[1].childNodes[0].attribs.title;
	    	// //console.log(title,avatar,link);
	    	listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':'',
	        }];
	    }
	   	
	    //console.log('Bai Hat Hot: ',listItem);
	    
	    



		return listItem;
	}  
} 
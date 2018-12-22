# Ứng dụng nghe nhạc CloneNCT

- Đồ án môn học: Lập trình trên thiết bị di động SE346.J11 Học kì 2018-2019
- Lớp: SE346.J11 Học kì 2018-2019
- Giáo viên: Mr. Huỳnh Tuấn Anh [Github](https://github.com/anhhna/ "Github")
- Apk file: 

## Giới thiệu
- Tại sao lại là Clone NCT?
- Trong suốt quá trình học, nhóm luôn muốn làm một ứng dụng nghe nhạc. Tuy nhiên để lấy được một kho nhạc lớn, đòi hỏi phải có một hệ thống cơ sở dữ liệu online. Việc này hơi quá sức nên nhóm quyết định bóc HTML của nhaccuatui.com để lấy source mp3 :3

## Thành viên
- 16520068: Nguyễn Xuân Bắc

## Chức năng chính
- Tìm kiếm: Bài hát, Video, Playlist, Karaoke từ Nhaccuatui
- Phát bài hát đơn, PLaylist. Tùy chỉnh playlist
- Lấy dữ liệu Hot trend từ trang chủ

## Công nghệ 
- Lập trình bằng React Native. Sử dụng Cheerio Module để Crawl Data từ Nhaccuatui.
#####  Phương pháp Crawl Data:
Sử dụng fetch URL của JavaScript, sau đó sử dụng Module Cheerio để lọc theo class Id cần tìm.
Xử lý xml: Sử dụng module react-native-xml2js để chuyển XML sang Json-> Dễ xử lí :D 
1. Crawl Data lấy đường dẫn file mp3 từ link có ID:
Ví dụ ca khúc Thì Thôi Reddy (Hữu Duy) có đường dẫn: https://www.nhaccuatui.com/bai-hat/thi-thoi-reddy-huu-duy.bwt6Hz07kPCy.html
Khi mở Source sẽ thấy một đoạn script:
```javascript
<script type="text/javascript">
                            var dataSong = {key: 'bwt6Hz07kPCy', type: 'song'};
                            $("#box_playing_id").prepend('<div class="adsZoneMp3"><div id="S_Inner" class="nqc-zone"></div></div><div id="S_Corner" class="ads_80_120 nqc-zone" style="display:none;"></div></div>');
                            var player = new NCTPlayer();
                            $(document).ready(function(){
                                //player.adsMp3.link = "https://apinas.nct.vn/v4/delivery?zl=S_Inner";    
                                player.adsMp3.openAudioAds = true;
                                player.peConfig.xmlURL = "https://www.nhaccuatui.com/flash/xml?html5=true&key1=d9e32dba6ef4322ad211335af305ea47";
                                player.peConfig.defaultIndex = "0";
                                player.peConfig.pushGAPercent = [];
                                player.peConfig.pushGASecond = [];
                                player.load("flashPlayer");
                                NCTNowPlaying.type = "song";
                                var onOffCookieValCheck = common.getCookie(NCTAdv.onOffAdvCookie);
                                if (typeof onOffCookieValCheck == "undefined" || onOffCookieValCheck == null || onOffCookieValCheck == "") {
                                    $("#playerMp3flashPlayer").append('<div id="S_HotCorner" class="nqc-zone" style="display:none;"></div>');
                                }
                            });
                        </script>
```
Có giá trị  player.peConfig.xmlURL là một đường dẫn đến một trang khác. Khi mở source của trang đó:
```xml
<tracklist>
    <type>song</type>
    <track>
    <title>
        <![CDATA[Thì Thôi]]>
    </title>
    <time>
        <![CDATA[0:00]]>
    </time>
    <creator>
        <![CDATA[Reddy (Hữu Duy)]]>
    </creator>
    <location>
        <![CDATA[https://aredir.nixcdn.com/NhacCuaTui963/ThiThoi-Reddy-5461229.mp3?st=gYgshVwl7zpJxcK9XAdeFg&e=1545533052]]>
    </location>
    <locationHQ>
        <![CDATA[]]>
    </locationHQ>
    <hasHQ>
        <![CDATA[true]]>
    </hasHQ>
    <info>
        <![CDATA[https://www.nhaccuatui.com/bai-hat/thi-thoi-reddy-huu-duy.bwt6Hz07kPCy.html]]>
    </info>
    <lyric><![CDATA[https://lrc-nct.nixcdn.com/2018/10/15/f/c/7/d/1539593095253.lrc]]></lyric>
    <bgimage><![CDATA[https://avatar-nct.nixcdn.com/singer/avatar/2018/10/04/c/d/0/b/1538635157374_600.jpg]]></bgimage>
    <avatar><![CDATA[https://avatar-nct.nixcdn.com/song/2018/04/30/b/9/b/6/1525060858674.jpg]]></avatar>
    <coverimage><![CDATA[https://avatar-nct.nixcdn.com/song/2018/04/30/b/9/b/6/1525060858674_500.jpg]]></coverimage>
    <newtab><![CDATA[https://www.nhaccuatui.com/nghe-si-reddy-huu-duy.html]]></newtab>
    <kbit><![CDATA[320]]></kbit>
    <key><![CDATA[bwt6Hz07kPCy]]></key>
    </track>
</tracklist>
```
Trong thẻ Location sẽ là Đường dẫn source file cần tìm.
2. Đối với Video cũng tương tự.
3. Đối với Item trong trang chủ: 
Website NCT quản lí từng item theo ID. Ví dụ Danh sách Playlist "Nghe gì hôm nay" sẽ nằm trong class có id: ngheGiHomNay. Chỉ cần sử dụng cheerio lọc theo class id sẽ thu được thứ cần tìm, 
4. Đối với Chức năng tìm kiếm:
https://www.nhaccuatui.com/tim-kiem/bai-hat?q={query}&b=keyword&l=tat-ca&s=default
Chỉ cần fetch() url có query như trên sẽ ra được danh sách kết quả trả về. 
Lọc theo class id='sn_search_single_song' để lấy từng item.
## Package sử dụng:

    "cheerio-without-node-native": "0.20.2",
    "react": "16.6.1",
    "react-native": "0.57.7",
    "react-native-cheerio": "^1.0.0-rc.4",
    "react-native-gesture-handler": "^1.0.10",
    "react-native-orientation": "^3.1.3",
    "react-native-progress": "^3.5.0",
    "react-native-sound": "^0.10.9",
    "react-native-swipe-gestures": "^1.0.3",
    "react-native-tab-view": "^1.3.1",
    "react-native-vector-icons": "^6.1.0",
    "react-native-video": "^4.1.0",
    "react-native-xml2js": "^1.0.3",
    "react-navigation": "^3.0.5",
    "react-redux": "^6.0.0",
    "react-timer-mixin": "^0.13.4",
    "redux": "^4.0.1",

## Giao diện ứng dụng
- Màn hình chính:
![](https://i.imgur.com/xKDXUbJ.png)
- Giao diện tìm kiếm:
![](https://i.imgur.com/fCpA62u.png)
- Giao diẹn phát Nhạc, playlist:
![](https://i.imgur.com/oWauPfZ.png)
- Giao diện phát Video, Karaoke:
![](https://i.imgur.com/7y6NdwW.png?2)

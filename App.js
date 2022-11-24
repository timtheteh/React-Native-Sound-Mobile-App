// //Demo App

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Hi <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;




// react-native-sound-playerview
// import React from 'react'
// import { View, Image, Text, TouchableOpacity, Platform, Alert} from 'react-native';
// import Slider from '@react-native-community/slider';

// import Sound from 'react-native-sound';

// const img_speaker = require('./resources/ui_speaker.png');
// const img_pause = require('./resources/ui_pause.png');
// const img_play = require('./resources/ui_play.png');
// const img_playjumpleft = require('./resources/ui_playjumpleft.png');
// const img_playjumpright = require('./resources/ui_playjumpright.png');

// export default class PlayerScreen extends React.Component{

//     static navigationOptions = props => ({
//         title:props.navigation.state.params.title,
//     })

//     constructor(){
//         super();
//         this.state = {
//             playState:'paused', //playing, paused
//             playSeconds:0,
//             duration:0
//         }
//         this.sliderEditing = false;
//     }

//     componentDidMount(){
//         this.play();
        
//         this.timeout = setInterval(() => {
//             if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
//                 this.sound.getCurrentTime((seconds, isPlaying) => {
//                     this.setState({playSeconds:seconds});
//                 })
//             }
//         }, 100);
//     }
//     componentWillUnmount(){
//         if(this.sound){
//             this.sound.release();
//             this.sound = null;
//         }
//         if(this.timeout){
//             clearInterval(this.timeout);
//         }
//     }

//     onSliderEditStart = () => {
//         this.sliderEditing = true;
//     }
//     onSliderEditEnd = () => {
//         this.sliderEditing = false;
//     }
//     onSliderEditing = value => {
//         if(this.sound){
//             this.sound.setCurrentTime(value);
//             this.setState({playSeconds:value});
//         }
//     }

//     play = async () => {
//         if(this.sound){
//             this.sound.play(this.playComplete);
//             this.setState({playState:'playing'});
//         }else{
//             const filepath = this.props.navigation.state.params.filepath;
//             var dirpath = '';
//             if (this.props.navigation.state.params.dirpath) {
//                 dirpath = this.props.navigation.state.params.dirpath;
//             }
//             console.log('[Play]', filepath);
    
//             this.sound = new Sound(filepath, dirpath, (error) => {
//                 if (error) {
//                     console.log('failed to load the sound', error);
//                     Alert.alert('Notice', 'audio file error. (Error code : 1)');
//                     this.setState({playState:'paused'});
//                 }else{
//                     this.setState({playState:'playing', duration:this.sound.getDuration()});
//                     this.sound.play(this.playComplete);
//                 }
//             });    
//         }
//     }
//     playComplete = (success) => {
//         if(this.sound){
//             if (success) {
//                 console.log('successfully finished playing');
//             } else {
//                 console.log('playback failed due to audio decoding errors');
//                 Alert.alert('Notice', 'audio file error. (Error code : 2)');
//             }
//             this.setState({playState:'paused', playSeconds:0});
//             this.sound.setCurrentTime(0);
//         }
//     }

//     pause = () => {
//         if(this.sound){
//             this.sound.pause();
//         }

//         this.setState({playState:'paused'});
//     }

//     jumpPrev15Seconds = () => {this.jumpSeconds(-15);}
//     jumpNext15Seconds = () => {this.jumpSeconds(15);}
//     jumpSeconds = (secsDelta) => {
//         if(this.sound){
//             this.sound.getCurrentTime((secs, isPlaying) => {
//                 let nextSecs = secs + secsDelta;
//                 if(nextSecs < 0) nextSecs = 0;
//                 else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
//                 this.sound.setCurrentTime(nextSecs);
//                 this.setState({playSeconds:nextSecs});
//             })
//         }
//     }

//     getAudioTimeString(seconds){
//         const h = parseInt(seconds/(60*60));
//         const m = parseInt(seconds%(60*60)/60);
//         const s = parseInt(seconds%60);

//         return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
//     }

//     render(){

//         const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
//         const durationString = this.getAudioTimeString(this.state.duration);

//         return (
//             <View style={{flex:1, justifyContent:'center', backgroundColor:'black'}}>
//                 <Image source={img_speaker} style={{width:150, height:150, marginBottom:15, alignSelf:'center'}}/>
//                 <View style={{flexDirection:'row', justifyContent:'center', marginVertical:15}}>
//                     <TouchableOpacity onPress={this.jumpPrev15Seconds} style={{justifyContent:'center'}}>
//                         <Image source={img_playjumpleft} style={{width:30, height:30}}/>
//                         <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
//                     </TouchableOpacity>
//                     {this.state.playState == 'playing' && 
//                     <TouchableOpacity onPress={this.pause} style={{marginHorizontal:20}}>
//                         <Image source={img_pause} style={{width:30, height:30}}/>
//                     </TouchableOpacity>}
//                     {this.state.playState == 'paused' && 
//                     <TouchableOpacity onPress={this.play} style={{marginHorizontal:20}}>
//                         <Image source={img_play} style={{width:30, height:30}}/>
//                     </TouchableOpacity>}
//                     <TouchableOpacity onPress={this.jumpNext15Seconds} style={{justifyContent:'center'}}>
//                         <Image source={img_playjumpright} style={{width:30, height:30}}/>
//                         <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row'}}>
//                     <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
//                     <Slider
//                         onTouchStart={this.onSliderEditStart}
//                         // onTouchMove={() => console.log('onTouchMove')}
//                         onTouchEnd={this.onSliderEditEnd}
//                         // onTouchEndCapture={() => console.log('onTouchEndCapture')}
//                         // onTouchCancel={() => console.log('onTouchCancel')}
//                         onValueChange={this.onSliderEditing}
//                         value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
//                         style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
//                     <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
//                 </View>
//             </View>
//         )
//     }
// }

// start working here

import React, {Component} from 'react';
import { useState } from "react";

import {StyleSheet, Button, Text, TouchableOpacity, View, ScrollView, Alert, SafeAreaView} from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const frogSound = new Sound(require('./pew2.aac'));

export default function App() {
    const [start, setStart] = useState(false);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(null);

    return (
        <SafeAreaView style = {styles.container}>
            <Button
                title="Generate Sound 2FA"
                onPress={() => Alert.alert('Sound Generated')}
            />
            <Button
                title="Play Sound"
                onPress={() => {
                    if (!start) {
                      frogSound.play();
                      const myTimer = setInterval(() => {
                        setCounter(counter => counter - 1);
                      }, 1000);
                      setTimer(myTimer);
                      setStart(start => !start);
                    } else {
                      frogSound.pause();
                      clearInterval(timer);
                      setCounter(null);
                      setStart(start => !start);
                    }
                  }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})

//end


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {},
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingTop: 30,
//     padding: 20,
//     textAlign: 'center',
//     backgroundColor: 'rgba(240,240,240,1)',
//   },
//   button: {
//     fontSize: 20,
//     backgroundColor: 'rgba(220,220,220,1)',
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: 'rgba(80,80,80,0.5)',
//     overflow: 'hidden',
//     padding: 7,
//   },
//   header: {
//     textAlign: 'left',
//   },
//   feature: {
//     flexDirection: 'row',
//     padding: 10,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: 'rgb(180,180,180)',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgb(230,230,230)',
//   },
// });

// const Button = ({title, onPress}) => (
//   <TouchableOpacity onPress={onPress}>
//     <Text style={styles.button}>{title}</Text>
//   </TouchableOpacity>
// );

// const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>;

// const Feature = ({title, onPress, buttonLabel = 'PLAY', status}) => (
//   <View style={styles.feature}>
//     <Header style={{flex: 1}}>{title}</Header>
//     {status ? <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text> : null}
//     <Button title={buttonLabel} onPress={onPress} />
//   </View>
// );

// const resultIcons = {
//   '': '',
//   pending: '?',
//   playing: '\u25B6',
//   win: '\u2713',
//   fail: '\u274C',
// };

// const audioTests = [
//   {
//     title: 'mp3 in bundle',
//     url: 'advertising.mp3',
//     basePath: Sound.MAIN_BUNDLE,
//   },
//   {
//     title: 'mp3 in bundle (looped)',
//     url: 'advertising.mp3',
//     basePath: Sound.MAIN_BUNDLE,
//     onPrepared: (sound, component) => {
//       sound.setNumberOfLoops(-1);
//       component.setState({loopingSound: sound});
//     },
//   },
//   {
//     title: 'mp3 via require()',
//     isRequire: true,
//     url: require('./advertising.mp3'),
//   },
//   {
//     title: 'mp3 remote download',
//     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
//   },
//   {
//     title: 'mp3 remote - file doesn\'t exist',
//     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/file-not-here.mp3',
//   },
//   {
//     title: 'aac remote download',
//     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
//   },
//   {
//     title: 'wav remote download',
//     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
//   },
//   {
//     title: 'aac via require()',
//     isRequire: true,
//     url: require('./pew2.aac'),
//   },
//   {
//     title: 'wav via require()',
//     isRequire: true,
//     url: require('./frog.wav'),
//   },
// ];

// function setTestState(testInfo, component, status) {
//   component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
// }

// /**
//  * Generic play function for majority of tests
//  */
// function playSound(testInfo, component) {
//   setTestState(testInfo, component, 'pending');

//   const callback = (error, sound) => {
//     if (error) {
//       Alert.alert('error', error.message);
//       setTestState(testInfo, component, 'fail');
//       return;
//     }
//     setTestState(testInfo, component, 'playing');
//     // Run optional pre-play callback
//     testInfo.onPrepared && testInfo.onPrepared(sound, component);
//     sound.play(() => {
//       // Success counts as getting to the end
//       setTestState(testInfo, component, 'win');
//       // Release when it's done so we're not using up resources
//       sound.release();
//     });
//   };

//   // If the audio is a 'require' then the second parameter must be the callback.
//   if (testInfo.isRequire) {
//     const sound = new Sound(testInfo.url, error => callback(error, sound));
//   } else {
//     const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
//   }
// }

// class MainView extends Component {
//   constructor(props) {
//     super(props);

//     Sound.setCategory('Playback', true); // true = mixWithOthers

//     // Special case for stopping
//     this.stopSoundLooped = () => {
//       if (!this.state.loopingSound) {
//         return;
//       }

//       this.state.loopingSound.stop().release();
//       this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
//     };

//     this.state = {
//       loopingSound: undefined,
//       tests: {},
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Header style={styles.title}>react-native-sound-demo</Header>
//         <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
//           {audioTests.map(testInfo => {
//             return (
//               <Feature
//                 status={this.state.tests[testInfo.title]}
//                 key={testInfo.title}
//                 title={testInfo.title}
//                 onPress={() => {
//                   return playSound(testInfo, this);
//                 }}
//               />
//             );
//           })}
//           <Feature title="mp3 in bundle (looped)" buttonLabel={'STOP'} onPress={this.stopSoundLooped} />
//         </ScrollView>
//       </View>
//     );
//   }
// }

// export default MainView;

// frontend/screens/History.js
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import React, { Component, useState } from 'react';
import { sendvideo, sendgame } from './redux/actions';
import { StyleSheet,Image,View,FlatList,TouchableOpacity} from 'react-native';
const win = Dimensions.get('window');

// This will render activity history of the current user
class History extends Component {
    constructor(props) {
        super(props)
            this.state = {
                result: [],
            }}
    componentDidMount() {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:myHeaders
    };
    fetch(`https://blackpearl2.ew.r.appspot.com/historys/?user=${this.props.user?.username}&kind=`, requestOptions)
        .then(response => response.json())
        .then(result => {this.setState({result})})
        .catch(error => console.error(error));
    }
    go(x){
        // When clicking on a history item visits the page again
       if(x.kind==="video"){sendvideo(x.link);this.props.navigation.navigate(x.kind)}
       else{sendgame(x.link);this.props.navigation.navigate(x.kind)}
    }
    render() {
        return(
            <View style={styles.container}>
            <View style={styles.content}>
                    <FlatList
                                    data={this.state.result}
                                    renderItem={({ item,i }) => (
                                        <TouchableOpacity style={styles.container} onPress={()=>this.go(item)} key={i}>
                                    <View >
                                    <Image 
                                     source={{uri: item.thumbnail}}

                                     style={{ width: win.width/3,
                                        height: win.width/3, borderRadius:8, margin:win.width/40}}
                                     />
                                     </View>
                                     </TouchableOpacity>  
                                    )}
                                    numColumns={2}
                                    keyExtractor={(index,key)=>{return key}}
                    />
                </View>
        </View>
    )}
}

// Styles
const styles = StyleSheet.create({
   
    container: {
        flex: 1
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        padding: win.width/10,
        justifyContent: 'center',
        paddingTop: win.width/50
    },
});

// Redux
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
      sendgame: (z) => { dispatch(sendgame(z)) },
      sendvideo: (z) => { dispatch(sendvideo(z)) },
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(History);
import React from 'react';
import { StyleSheet, View,Platform, Alert} from 'react-native';
import {Container, Header, Content, Body, Text, Footer, Item, Input, Icon, Label,Form,Picker, Button, Spinner,FooterTab} from 'native-base'
import ValidationComponent from 'react-native-form-validator'
import {Font, StoreReview} from 'expo'
import GoogleMaps from './GoogleMaps'
import Modal from 'react-native-modal'
import * as firebase from 'firebase'
import 'firebase/firestore'
import db from './firebase'

const email = "gusr@icloud.com"
const pass = "123456"
firebase.auth().signInWithEmailAndPassword('gusr@icloud.com','123456')

db.collection('users').doc(email).set({
  email,
  pass
})
export default class HomeScreen extends ValidationComponent {
    constructor(props){
        super(props)
        this.state={
            bill:"20",
            tip:'',
            score:'',
            percent:0,
            nice:0,
            time:0,
            knowledge:2,
            total:0,
            tip:5.25,
            loading:false,
            storeName:""
        }

         this.calculateTip = this.calculateTip.bind(this)
         this.renderTip = this.renderTip.bind(this)
         var observer= db.collection('storesTipped').doc('jMvrkejCdGl8t7fGet1b').onSnapshot( (snap)=> {this.setState({storeName: snap.data().name})})
    }

    _onSubmit() {
  // Call ValidationComponent validate method
  this.validate({
    bill: {minlength:1, required: true},

  });
}



    renderInputs(){
        if (!this.state.bill.length > 0){
            return(<Item fixedlabel>
                        <Label>$</Label>
                        <Input placeholder="How much was the bill?" value={this.state.bill} onChangeText={event => this.setState({
                                bill: event
                            })

                        } />

                    </Item>)
        }else if (this.state.bill.length > 0 && this.validate({bill:{numbers: true}})){
           return( <Item fixedlabel success>
                        <Label style={{color:"green"}}>$</Label>
                        <Input placeholder="How much was the bill?" value={this.state.bill} onChangeText={event => this.setState({
                                bill: event
                            })
                        } />
                        <Icon name='checkmark-circle' />

                    </Item>

                 )
        }
        else if(!this.validate({bill:{numbers:false}})){
            return( <Item fixedlabel error>
                        <Label style={{color:"red"}}>$</Label>
                        <Input placeholder="How much was the bill?" value={this.state.bill} onChangeText={event => this.setState({
                                bill: event
                            })
                        } />
                        <Icon name='close-circle' />

                    </Item>)
        }else{
            return( <Item fixedlabel >
                        <Label>$</Label>
                        <Input placeholder="How much was the bill?" value={this.state.bill} onChangeText={event => this.setState({
                                bill: event
                            })
                        } />
                        <Icon name='checkmark-circle' />
                    </Item>)
        }
    }

    renderNice(){
        if(this.state.nice === null){
            return(<Item stackedLabel>

                    <Label>Was Your Server Nice to You?</Label>
                    <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                          style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                          selectedValue={this.state.nice}
                          onValueChange={value => this.setState({nice: value})}
                        >
                          <Picker.Item label="Miserable" value={-2} />
                          <Picker.Item label="Unfriendly" value={-1} />
                          <Picker.Item label="Neutral" value={0}/>
                          <Picker.Item label="Friendly" value={1} />
                          <Picker.Item label="Very Friendly" value={2} />
                          <Picker.Item disabled label="Select an option" value={null}/>
                        </Picker>
                    </Item>)
        }
        else{
            return(<Item stackedLabel success>

                    <Label>Was Your Server Nice to You?</Label>
                    <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                            style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}

                          selectedValue={this.state.nice}
                          onValueChange={value => this.setState({nice: value})}
                        >
                          <Picker.Item label="Miserable" value={-2} />
                          <Picker.Item label="Unfriendly" value={-1} />
                          <Picker.Item label="Neutral" value={0}/>
                          <Picker.Item label="Friendly" value={1} />
                          <Picker.Item label="Very Friendly" value={2} />
                          <Picker.Item disabled label="Select an option" value={null}/>
                        </Picker>

                    </Item>)
        }
    }

    renderTime(){
        if(this.state.time===null){
            return(
                 <Item stackedLabel>
                        <Label>Was Your Food On Time?</Label>
                            <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                          iosHeader="Pick an option:"
                          style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                          selectedValue={this.state.time}
                          onValueChange={value => this.setState({time: value})}
                        >
                          <Picker.Item label="Very Late" value={-2} />
                          <Picker.Item label="A Little Longer Than Expected" value={-1} />
                          <Picker.Item label="On Time" value={0}/>
                          <Picker.Item label="Quicker Than Expected" value={1} />
                          <Picker.Item label="Came Extremely Quick!" value={2} />
                          <Picker.Item label="Select an option..." value={null}/>
                        </Picker>

                </Item>
            )
        }else{
           return( <Item stackedLabel success>
                        <Label>Was Your Food On Time?</Label>
                            <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                          iosHeader="Pick an option:"
                          style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                          selectedValue={this.state.time}
                          onValueChange={value => this.setState({time: value})}
                        >
                          <Picker.Item label="Very Late" value={-2} />
                          <Picker.Item label="A Little Longer Than Expected" value={-1} />
                          <Picker.Item label="On Time" value={0}/>
                          <Picker.Item label="Quicker Than Expected" value={1} />
                          <Picker.Item label="Came Extremely Quick!" value={2} />
                          <Picker.Item label="Select an option..." value={null}/>
                        </Picker>

                </Item>)
        }
    }

    renderKnowledge(){
        if (this.state.knowledge===null){
            return(
                 <Item stackedLabel>
                        <Label>Was There Any Mistakes In Your Order?</Label>
                            <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                          iosHeader="Pick an option:"
                          style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                          selectedValue={this.state.knowledge}
                          onValueChange={value => this.setState({knowledge: value})}
                        >
                          <Picker.Item label="Total Order Was a Mistake" value={-2} />
                          <Picker.Item label="Some Small Mistakes, But Were Fixed" value={0} />
                          <Picker.Item label="Everything Came Out Perfect" value={2}/>
                          <Picker.Item label="Select an option..." value={null}/>

                        </Picker>

                </Item>
            )
        }else{
            return(
                 <Item stackedLabel success>
                        <Label>Was There Any Mistakes In Your Order?</Label>
                            <Picker
                          iosIcon={<Icon name="ios-arrow-down-outline"/>}
                          mode="dropdown"
                          iosHeader="Pick an option:"
                          style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                          selectedValue={this.state.knowledge}
                          onValueChange={value => this.setState({knowledge: value})}
                        >
                          <Picker.Item label="Total Order Was a Mistake" value={-2} />
                          <Picker.Item label="Some Small Mistakes, But Were Fixed" value={0} />
                          <Picker.Item label="Everything Came Out Perfect" value={2}/>
                          <Picker.Item label="Select an option..." value={null}/>

                        </Picker>

                </Item>
            )
        }
    }
    renderButton(){
        if(this.state.nice !== null && this.state.time !== null && this.state.bill !== '' && this.state.knowledge !==null){
            return (
                <Button success onPress={() => this.calculateTip()}><Text>Calculate Tip</Text></Button>
            )
        }
    }
    calculateTip(){
        const {nice, time, knowledge} = this.state

        const score = nice + time + knowledge

        if(score < 0 ){
            this.setState({
                percent: .05
            })
        } else if(score === 0){
            this.setState({
                percent: .10
            })
        }else if (score === 1){
            this.setState({
                percent: .11
            })
        }else if (score===2){
            this.setState({
                percent: .12
            })
        }else if (score===3){
            this.setState({
                percent: .15
            })
        }else if (score===4 || score === 5){
            this.setState({
                percent: .17
            })
        } else if (score===6){
            this.setState({
                percent: .20
            })
        }

    }
    renderTip(){
      let {bill, percent} = this.state
      bill=parseInt(bill)
      let tip = (bill * percent)
      let total= bill+tip

      tip=tip.toFixed(2)
      total=total.toFixed(2)
      if(tip < 1){
        return (<Text></Text>)
      }
      else{
        this.setState({tip})
        return(


          <Button onPress={()=>{this.saveTip()}}><Icon primary type="FontAwesome" block name="save"/><Text>Save Tip</Text></Button>

        )
      }



    }



    saveTip(){
      const {tip, storeName} = this.state
      const curTime= new Date().toLocaleString()

      db.collection('tips').add({

          tip,
          storeName,
          user: email,
          time: curTime

      }).then(db.collection('storesTipped').doc(storeName).set({
        name: storeName


      })).then(db.collection('storesTipped').doc(storeName).collection('times').add({
        time: curTime
      })).then(Alert.alert("Tip Saved!"))
    }
    closeDrawer  ()  {
     this.drawer._root.close()
    };
    openDrawer ()  {
     this.drawer._root.open()
    };
  render() {

    return (

        <Container >
          

            <Content
                contentContainerStyle={{justifyContent:"center"}}
                  >

                    <Body>

                        <Modal
                        isVisible={this.state.isVisible === 2}

            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
                      >
                        <View style={styles.modalContent}>
                        <GoogleMaps />
                        <Button onPress={()=> this.setState({isVisible:null})}><Text>Close</Text></Button>
                        </View>
                      </Modal>
                    <Text>Never Under or Over Tip Again!</Text>
                    <Text>{this.state.storeName}</Text>
                </Body>

                    <Form >

                    {this.renderInputs()}
                   {this.renderNice()}
                   {this.renderTime()}
                        {this.renderKnowledge()}
                    </Form>
                  {this.renderButton()}
                    <Button success block onPress={()=> this.setState({isVisible:2})}><Text><Icon type="FontAwesome" active={false}name="compass"/> Enter Location</Text></Button>
            </Content>
            <Footer>
              {this.renderTip()}
            </Footer>
        </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },modalContent: {
    backgroundColor: 'white',
    padding: 22,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#2ecc71',
  }
});

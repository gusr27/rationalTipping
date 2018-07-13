import React from 'react';
import { StyleSheet, View,Platform} from 'react-native';
import {Container, Header, Content, Body, Text, Footer, Item, Input, Icon, Label,Form,Picker, Button } from 'native-base'
import ValidationComponent from 'react-native-form-validator'
import {Font, StoreReview} from 'expo'

export default class App extends ValidationComponent {
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
            tip:0
        }

         this.calculateTip = this.calculateTip.bind(this)
         this.renderTip = this.renderTip.bind(this)
    }

    _onSubmit() {
  // Call ValidationComponent validate method
  this.validate({
    bill: {minlength:1, required: true},

  });
}
async componentWillMount() {
   await Font.loadAsync({
     Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
     Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
   })
 }
    renderInputs(){
        if (!this.state.bill.length > 0){
            return(<Item fixedlabel>
                        <Label>$</Label>
                        <Input placeholder="How much was the bill?" value={this.state.bill} onChangeText={event => this.setState({
                                bill: event
                            })

                        } />
                        <Icon name='checkmark-circle' />
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
      const {bill, percent} = this.state
      let tip = parseInt(bill) * parseInt(percent)
      tip = tip.toFixed(2)
      let total = bill + tip

        return(

          <Text>The tip should be ${tip}</Text>

        )


    }

  render() {
    return (
      <Container >
            <Header>
                <Body>
                    <Text>Rational Tipper</Text>
                </Body>
            </Header>
            <Content scrollEnabled={false}
                contentContainerStyle={{justifyContent:"center"}}
                >

                    <Body>
                    <Text>Never Under or Over Tip Again!</Text>
                </Body>

                    <Form >

                    {this.renderInputs()}
                   {this.renderNice()}
                   {this.renderTime()}
                        {this.renderKnowledge()}
                    </Form>
                  {this.renderButton()}
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
  },
});

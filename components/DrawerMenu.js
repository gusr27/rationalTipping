import React,{Component} from 'react'
import {Container, Header, List, ListItem,Body, Text, Button, View} from 'native-base'
import {TouchableOpacity} from 'react-native'

export default class DrawerMenu extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <Container style={{ paddingTop:"3%"}}>
           <Header >
            <Body>
                <Text>Extras</Text>
            </Body>
          </Header>
            <List>

                <View style={{paddingTop:"50%"}}>
                <TouchableOpacity >
                <ListItem>

                        <Text>Extras</Text>

                </ListItem>
                </TouchableOpacity>

               <TouchableOpacity>
                <ListItem>

                        <Text>Extras</Text>

                </ListItem>
                    </TouchableOpacity>
                <TouchableOpacity>
                <ListItem>

                        <Text>Extras</Text>

                </ListItem>
                    </TouchableOpacity>
                </View>
            </List>

        </Container>
    )
  }
}

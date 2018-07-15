import React, {Component} from 'react'
import { Icon} from 'native-base'
import { Router, Scene, Stack,Actions } from 'react-native-router-flux'
import Expo, {Font, AppLoading} from 'expo'
import DrawerMenu from './components/DrawerMenu'
import HomeScreen from './components/HomeScreen'
import Drawer from 'react-native-drawer'

export default class App extends Component{
  state={
    open: false,
    loading: true
  }

     closeDrawer = () => {
      this.drawer.close()
    };
    openDrawer = () => {
      this.drawer.open()
    };

    drawerLogic= ()=>{
        if(this.state.open){
            this.setState={
                open: false
            }
            this.closeDrawer()
        }else{
            this.setState={
                open: true
            }
            this.openDrawer()
        }
    }

async componentWillMount(){
  await Expo.Font.loadAsync({
   Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
   Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
   Bubblegum: require("./assets/BubblegumSans-Regular.ttf")
 })
 this.setState({loading:false})
}

  render(){
    if(this.state.loading){
      return <AppLoading  />
    }else {
        return(
            <Drawer
              ref={(ref) => this.drawer = ref}
              openDrawerOffset={.2}
              content={<DrawerMenu/>}
              tweenHandler={Drawer.tweenPresets.parallax}
              tapToClose={true}
              >
            <Router>
              <Stack key="root">
                <Scene key='home' component={HomeScreen} initial="true"
                  onLeft={()=>this.drawerLogic()}
                  leftTitle={<Icon ios="ios-menu" android="md-menu" style={{fontSize:20}}/>}
                  title="Rational Tipper"
                  titleStyle={{fontFamily:"Bubblegum", fontSize:30}}
                />
              </Stack>
            </Router>
          </Drawer>
        )
      }
  }
}

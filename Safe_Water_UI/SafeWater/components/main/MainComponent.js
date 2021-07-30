import React from 'react';
import { AuthContext } from "../../App";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import Verification from '../verification/VerificationComponent';
import OTP from '../otp/OtpComponent';
import Home from '../home/HomeComponent';
import Watson from '../watson/WatsonComponent';
import Profile from '../profile/ProfileComponent';
import Spots from '../spots/SpotsComponent';
import Map from '../maps/MapsComponent';
import Register from '../register/registerComponent';
import Category from '../categorySelection/CategoryComponent';
import addSafeDrinkingSpot from '../vendor-add-action/addSafeDrinkingSpotComponent';
import addSafeDrinkingSpotSuccess from '../vendor-add-action/addSafeDrinkingSpotSucessComponent';
import { HeaderBackButton } from 'react-navigation-stack';
import HomeVendorComponent from '../home/Home_Vendor';
import HomeCustomerComponent from '../home/Home_Customer';
import HomeVendorSpotListComponent from '../home/Home_Vendor_SpoltList';
import adminDashboard from '../admin/adminDashboard';
import HomeWaterQualityComponent from '../home/HomeWaterQuality'
import WaterQualityDetailsComponent from '../home/WaterQualityDetails'
import RaiseComplaintComponent from '../home/RaiseComplaint'
import CurrentLocation from '../home/CurrentLocation'
import Language from '../language/LanguageComponent'
import ComplaintComponent from '../home/Complaint'


const stackTabNavigator = createStackNavigator({
    Language: {screen: Language, navigationOptions: { headerShown: true, title: 'Select Language' } },
    CurrentLocation : { screen: CurrentLocation, navigationOptions: { headerShown: false }},
},{
    initialRouteName: 'Language',
})

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({
            Home: { screen: Home, navigationOptions: { headerShown: false } },
            Spots: { screen: Spots, navigationOptions: { headerShown: true, title: 'Water Sites' } },
            OTP: { screen: OTP, navigationOptions: { headerShown: true, title: 'Back' } },
            Category: { screen: Category, navigationOptions: { headerShown: true, title: 'Select Category' } },
            Verification: { screen: Verification, navigationOptions: { headerShown: true, title: 'Back' } },
            Map : { screen: Map, navigationOptions: { headerShown: false }},
            CurrentLocation : { screen: CurrentLocation, navigationOptions: { headerShown: false }},
            addSafeDrinkingSpotSuccess: {
                screen: addSafeDrinkingSpotSuccess,
                navigationOptions: ({ navigation }) => ({
                    headerShown: true,
                    title: 'Back',
                    headerLeft: (
                        <HeaderBackButton
                            onPress={(a, b, c) => {
                                navigation.navigate('Home')
                            }}
                        />
                    )
                })
            },
            addSafeDrinkingSpot: { screen: addSafeDrinkingSpot, navigationOptions: { headerShown: true, title: 'Add Site' } },
            Admin : { screen: adminDashboard, navigationOptions: { headerShown: false }},  
            Register: {screen: Register, navigationOptions: { headerShown: true, title: 'Register' } },
            HomeVendor: { screen: HomeVendorComponent, navigationOptions: { headerShown: false }},
            HomeCustomer: { screen: HomeCustomerComponent, navigationOptions: { headerShown: false }},
            HomeVendorSpot: {screen: HomeVendorSpotListComponent, navigationOptions:{headerShown: false}},
            HomeWaterQuality: {screen: HomeWaterQualityComponent, 
                navigationOptions: { 
                    headerShown: false , 
                    title: 'Water Quality'
            }},
            WaterQualityDetails: {screen: WaterQualityDetailsComponent, navigationOptions: { headerShown: true, title: 'Water Quality' } },
            RaiseComplaint: {screen: RaiseComplaintComponent, navigationOptions: { headerShown: true, title: 'Raise a request' } },
            Complaint: {screen: ComplaintComponent, navigationOptions: { headerShown: true, title: 'My Requests' } },
            addSafeDrinkingSpotSuccess : { 
                screen: addSafeDrinkingSpotSuccess, 
                navigationOptions: ({navigation}) => ({ 
                    headerShown: true , 
                    title: 'Back', 
                    headerLeft: (
                    <HeaderBackButton
                        onPress={() => {
                            navigation.push('Home')
                        }}
                    />
            )})}
        }, {
            initialRouteName: 'Home',
        }),
        navigationOptions: ({ navigation }) => {
            let tabBarVisible = true;
            let tabBarIcon = ({ tintColor }) => <Icon type='font-awesome' name="home" color={tintColor} size={22} />
            console.log(navigation.state.routes);
            for (let i = 0; i < navigation.state.routes.length; i++) {
                if (navigation.state.routes[i].routeName == "Verification" || navigation.state.routes[i].routeName == "OTP"
                    || navigation.state.routes[i].routeName == "Register" || navigation.state.routes[i].routeName == "Category" 
                    || navigation.state.routes[i].routeName == "Language") {
                    tabBarVisible = false;
                } else {
                    tabBarVisible = true;
                }
            }
            return {
                tabBarVisible,
                tabBarOptions: {
                    labelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                        marginBottom: 5,
                    },
                    activeTintColor: '#1194E9'
                },
                tabBarIcon
            };
        }
    },
    Watson: {
        screen: Watson,
        navigationOptions: {
            title: 'Ask Watson',
            tabBarVisible: true,
            tabBarOptions: {
                labelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 5,
                },
                activeTintColor: '#1194E9'
            },
            tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="comments" color={tintColor} size={22} />
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            tabBarVisible: true,
            tabBarOptions: {
                labelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 5,
                },
                activeTintColor: '#1194E9'
            },
            tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="user" color={tintColor} size={22} />
        }
    }
}, {
    initialRouteName: 'Home'
});


const Main = () => {
    const { state: authState } = React.useContext(AuthContext);
    console.log(authState);
    const MainAppNavigator = authState.language ? createAppContainer(BottomTabNavigator) : createAppContainer(stackTabNavigator);
    return (
        <MainAppNavigator />
    )
}

export default Main;
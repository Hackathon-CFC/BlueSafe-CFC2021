import React, { useState, useEffect } from 'react';
import Main from './components/main/MainComponent';
import { AppRegistry } from 'react-native'
export const AuthContext = React.createContext();
import globalConstant from './constant/globalConstant';
import NoticationDialog from './shared/NotificationDialog';
import SuccessDialog from './shared/SuccesDialog';
import { _retrieveData, _storeData } from './service/storageService'

const initialState = {
  isAuthenticated: false,
  isRegistered: false,
  token: '',
  userRole: globalConstant.user_role.CUSTOMER,
  category: 'Safe Drinking Water',
  mobileNumber: '',
  userRole: globalConstant.user_role.VENDOR,
  language: '',
  location: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.mobileNumber ? true : false,
        token: action.token,
        userRole: action.userRole,
        category: action.category,
        mobileNumber: action.mobileNumber,
        isRegistered: action.isRegistered
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        category: 'Safe Drinking Water',
        token: '',
        userRole: '',
        isRegistered: false
      };
    case 'TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'REGISTER':
      return {
        ...state,
        isRegistered: true
      };
    case 'LANGUAGE':
      return {
        ...state,
        language: action.language,
        location: action.location
      };
    default:
      return state;
  }
};

AppRegistry.registerComponent('CFC_2021', () => App);
export default function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [favSpots, setFavSpots] = useState([]);

  const onNotificationSubmitSucess = () => {
    setShowSuccessDialog(true);
  };

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const startTime = '09:00:00';
      const endTime = '10:00:00';
      const currentDate = new Date()
      const startDate = new Date(currentDate.getTime());
      startDate.setHours(startTime.split(":")[0]);
      startDate.setMinutes(startTime.split(":")[1]);
      startDate.setSeconds(startTime.split(":")[2]);

      const endDate = new Date(currentDate.getTime());
      endDate.setHours(endTime.split(":")[0]);
      endDate.setMinutes(endTime.split(":")[1]);
      endDate.setSeconds(endTime.split(":")[2]);

      _retrieveData('favouriteSpots').then(data => {
        if (data && data !== '') {
          const favSpots = JSON.parse(data);
          if (favSpots.length > 0 && startDate < currentDate && endDate > currentDate) {
            _retrieveData('notificationShowDate').then(result => {
              if (result && result !== '') {
                const lastCalledDate = new Date(result);
                const hours = Math.abs(currentDate - lastCalledDate) / 36e5;
                if (hours > 20) {
                  setFavSpots(favSpots);
                  setShowNotificationModal(true);
                  clearInterval(notificationInterval);
                  _storeData("notificationShowDate", currentDate.toString())
                } else {
                  clearInterval(notificationInterval);
                }
              } else {
                setFavSpots(favSpots);
                setShowNotificationModal(true);
                clearInterval(notificationInterval);
                _storeData("notificationShowDate", currentDate.toString())
              }
            });
          }
        }
      });
    }, 5000);

    return () => {
      clearInterval(notificationInterval)
    };

  }, []);

  return (
    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      <>
        <Main />
        {
          showNotificationModal &&
          <NoticationDialog favSpots={favSpots} setShowNotificationModal={setShowNotificationModal} onSuccess={onNotificationSubmitSucess} />
        }
        {
          showSuccessDialog &&
          <SuccessDialog setShowSuccessDialog={setShowSuccessDialog} />
        }
      </>
    </AuthContext.Provider>
  );
}

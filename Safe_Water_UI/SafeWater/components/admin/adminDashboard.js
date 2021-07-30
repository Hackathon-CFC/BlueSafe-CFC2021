import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity , ActivityIndicator} from 'react-native';
import styles from '../../styles/globalStyles';
import AdminAllSpots from './adminAllSpots';
import useAPI from '../../service/apiService';

const adminDashboardComponent = ({navigation}) => {

    const spots= [...navigation.getParam('spots')];
    const [selectedTab, setSelectedTab] = useState(1);
    const [spolList, setSpotList] = useState(spots.filter(() => true));
    const { putRequest, ENDPOINTS } = useAPI();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
      switch(selectedTab) {
        case 1: 
          setSpotList([...spots.filter(() => true)])
          break;
        case 2: 
          setSpotList([...spots.filter(spot => (spot.approval_stat && spot.approval_stat.status && spot.approval_stat.status === "Approved"))])
          break;
        case 3: 
          setSpotList([...spots.filter(spot => (spot.approval_stat && spot.approval_stat.status && spot.approval_stat.status === "Rejected"))])
          break;
        default: 
          setSpotList([...spots.filter(() => true)])
      }
    }, [selectedTab])
    
    const onUpdate = (spot, status) => {
      setShowLoader(true);
      const payload  = {
          "approval_stat": {
            status,
            "comment": "No image available for verification",
            "admin_id": "4429bbfadcf2a3ba34e657bdb709cb86"
          }
      };
      putRequest(ENDPOINTS.updateSpot, payload, spot._id).then(() => {
        navigation.push('Home');
        setShowLoader(false);
      }).catch(error => {
          console.log(error.message);
          setShowLoader(false);
      });
    };

    
    return (
      <View style={{height: '100%'}}>
              <View style={{marginHorizontal: 20}}>
                  <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 40, color: 'black' }}>Home</Text>
              </View>
              <View style={styles.tabview}> 
                  <TouchableOpacity style={selectedTab == 1 ? [styles.tab, styles.activeTab]: [styles.tab]} onPress={() => { setSelectedTab(1) }}>
                    <Text style={{fontSize: 11,fontWeight: selectedTab == 1 ? 'bold': 'normal'}} >All Entries</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={selectedTab == 2 ? [styles.tab, styles.activeTab]: [styles.tab]} onPress={() => { setSelectedTab(2) }}>
                    <Text style={{fontSize: 11,fontWeight: selectedTab == 2 ? 'bold': 'normal'}}>Aprroved Entries</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={selectedTab == 3 ? [styles.tab, styles.activeTab]: [styles.tab]} onPress={() => { setSelectedTab(3) }}>
                    <Text style={{fontSize: 11,fontWeight: selectedTab == 3 ? 'bold': 'normal'}}>Disaprroved Entries</Text>
                  </TouchableOpacity>
              </View>
              <View style={{height: '73%', marginRight: 30}}>
                  <ScrollView contentContainerStyle={{ paddingLeft: 15, paddingRight: 15, flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}>
                      <View>
                        {!showLoader && 
                          <AdminAllSpots  spots={spolList} onUpdate={onUpdate} />
                        }
                      </View>
                  </ScrollView>
              </View>
        {
          showLoader &&
            <View style={{position: 'absolute',  height: '100%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#c1c7cd" />
            </View>
        }
      </View>
    );
}



export default adminDashboardComponent;

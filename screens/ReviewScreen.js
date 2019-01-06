import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation: { navigate } }) => {
        return ({
            title: 'Review Jobs',
            headerRight: (
               <Button
                   title='Settings'
                   onPress={() => { navigate('settings') }}
                   backgroundColor='rgba(0,0,0,0)'
                   color='rgba(0, 122, 255, 1)'
                   icon={{ name: 'settings', size: 15, color: 'black' }} 
               />
           ),
            headerLeft: <Text></Text>,
/* not needed but kept as an example of platform specific formatting
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
*/

            tabBarIcon: ({ tintColor }) => {
                return <Icon name='favorite' size={30} color={tintColor}/>
            }

        });
    }


    renderLikedJobs() {
        return this.props.likedJobs.map((job) => {
            const {
                jobtitle,
                jobkey,
                company,
                formattedRelativeTime,
                formattedLocation,
                url,
                longitude,
                latitude
            } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.002,
                latitudeDelta: 0.0045
            };
    

            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android'}
                            initialRegion={initialRegion}
                        >
                            <Marker
                                coordinate={initialRegion}
                                title={company}
                                description={formattedLocation}
                            />
                        </MapView>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title='Apply Now'
                            backgroundColor='#03A9F4'
                            onPress={() => { Linking.openURL(url).catch(err => console.error('An error occurred', err));}}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        marginTop: 10, 
        marginBottom: 10, 
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
};

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);

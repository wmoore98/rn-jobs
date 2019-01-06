import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {

    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='description' size={30} color={tintColor}/>
        }
    }

    renderCard = (job) => {

        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.002,
            latitudeDelta: 0.0045
        };

        return (
            <Card title={job.jobtitle}>
                <View style={{ height: 200 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialRegion}
                    >
                        <Marker
                            coordinate={initialRegion}
                            title={job.company}
                            description={job.formattedLocation}
                        />
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        );
    };

    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs">
                <Button
                    title='Back To Map'
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor='#03A9F4'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }
    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <Swipe
                    data={this.props.jobs}
                    keyProp={'jobkey'}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        );
    }
}

function mapStateToProps( { jobs }) {
    return { jobs };
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

export default connect(mapStateToProps, actions)(DeckScreen);

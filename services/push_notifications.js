import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    // Check if a token already exists
    let previousToken = await AsyncStorage.getItem('push_token');

    // If so, exit early, user already gave permission to send notifications
    if (previousToken) return;

    // Ask permission to send notifications
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // User denied us permission to send notifications, exit
    if (status !== 'granted') return;

    // Generate a push token
    let token = await Notifications.getExpoPushTokenAsync();

    // Store token on server
    await axios.post(PUSH_ENDPOINT, { token: { token } });

    // Store token locally
    AsyncStorage.setItem('push_token', token);
}
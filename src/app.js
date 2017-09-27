import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Button, CardSection, Header, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyD-u3Rn3bH4_r0hIokNaKUeXpsuPvWXOX8",
            authDomain: "auth-61cce.firebaseapp.com",
            databaseURL: "https://auth-61cce.firebaseio.com",
            projectId: "auth-61cce",
            storageBucket: "auth-61cce.appspot.com",
            messagingSenderId: "456965028310"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
            );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }

        if (this.state.loggedIn) {
            return (
                <CardSection>
                    <Button>
                        Log Out
                    </Button>
                </CardSection>
            );
        }

        return <LoginForm />;
    }

    render() {
        return (
            <View>
                <Header headerText={"Authentication"} />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
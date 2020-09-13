import React from "react";
import {
    ActivityIndicator,
    Button,
    Clipboard,
    FlatList,
    Image,
    Share,
    StyleSheet,
    Text,
    ScrollView,
    View,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuid } from "uuid";

// import Environment from '../../../config/environment';
import { firebase } from "../../firebase/config";

class AddItemScreen extends React.Component {
    state = {
        image: null,
        uploading: false,
        googleResponse: null,
    };

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    render() {
        let { image } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.getStartedContainer}>
                        {image ? null : (
                            <Text style={styles.getStartedText}>
                                Lets first take a snap of what you are selling
                            </Text>
                        )}
                    </View>

                    <View style={styles.helpContainer}>
                        <View style={{ margin: 10, padding: 5 }}>
                            <Button
                                onPress={this._pickImage}
                                title="Pick an image from camera roll"
                                color="#841584"
                            />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button onPress={this._takePhoto} color="#ff0054" title="Take a photo" />

                        </View>
                        {this.state.googleResponse && (
                            <FlatList
                                data={this.state.googleResponse.responses[0].labelAnnotations}
                                extraData={this.state}
                                keyExtractor={this._keyExtractor}
                                renderItem={({ item }) => <Text style={{ backgroundColor: "#0fa3b1", margin: 2, borderRadius: 8, padding: 5, borderColor: "#ff004d" }}>{item.description}</Text>}
                            />
                        )}
                        {this._maybeRenderImage()}
                        {this._maybeRenderUploadingOverlay()}
                    </View>
                </View>
            </View>
        );
    }

    organize = (array) => {
        return array.map(function (item, i) {
            return (
                <View key={i}>
                    <Text>{item}</Text>
                </View>
            );
        });
    };

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: "rgba(0,0,0,0.4)",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let { image, googleResponse } = this.state;
        if (!image) {
            return;
        }

        return (
            <View
                style={{
                    marginTop: 20,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2,
                }}
            >
                <Text
                    onPress={() => {
                        this.props.navigation.navigate("AddItemDetail", {
                            imageUrl: this.state.image,
                        });
                    }}
                    style={{ color: "#ff70a6", alignSelf: "center", fontSize: 20, margin: 10 }}
                >
                    Add the details and submit
        </Text>
                <Button
                    style={{ marginBottom: 10 }}
                    onPress={() => this.submitToGoogle()}
                    title="Analyze!"
                    color="#d883ff"
                />

                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 8,
                        shadowColor: "rgba(0,0,0,1)",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 10, height: 4 },
                        shadowRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
                </View>
                <Text
                    onPress={this._copyToClipboard}
                    onLongPress={this._share}
                    style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                />
            </View>
        );
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = (item) => {
        <Text>response: {JSON.stringify(item)}</Text>;
    };

    _share = () => {
        Share.share({
            message: JSON.stringify(this.state.googleResponse.responses),
            title: "Check it out",
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert("Copied to clipboard");
    };

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async (pickerResult) => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                let uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            this.setState({ uploading: false });
        }
    };

    submitToGoogle = async () => {
        try {
            this.setState({ uploading: true });
            let { image } = this.state;
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: "LABEL_DETECTION", maxResults: 10 },
                            { type: "LANDMARK_DETECTION", maxResults: 5 },
                            { type: "FACE_DETECTION", maxResults: 5 },
                            { type: "LOGO_DETECTION", maxResults: 5 },
                            { type: "TEXT_DETECTION", maxResults: 5 },
                            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                            { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                            { type: "IMAGE_PROPERTIES", maxResults: 5 },
                            { type: "CROP_HINTS", maxResults: 5 },
                            { type: "WEB_DETECTION", maxResults: 5 },
                        ],
                        image: {
                            source: {
                                imageUri: image,
                            },
                        },
                    },
                ],
            });
            let response = await fetch(
                "https://vision.googleapis.com/v1/images:annotate?key=" +
                "AIzaSyDev_ZWxjYqJ3wzAkxm2ihxmtqIRoej0kI",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: body,
                }
            );
            let responseJson = await response.json();
            //   console.log(responseJson);
            this.setState({
                googleResponse: responseJson,
                uploading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    // TODO: change back to uuid()
    const ref = firebase.storage().ref().child("testing");
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
}

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 10,
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center",
    },
    contentContainer: {
        paddingTop: 30,
    },

    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50,
    },

    getStartedText: {
        marginTop: 20,
        fontSize: 23,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center",
    },

    helpContainer: {
        marginTop: 15,
        alignItems: "center",
    },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  text: {
    fontSize: 25,
    margin: 20,
  },
  card: {
    backgroundColor: "#999",
    borderRadius: 30,
    // height: 400,
    marginTop: 10,
    padding: 20,
    marginLeft: 50,
    // justifyContent: 'center',
  },
  headerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  ImageIconStyle: {
    height: 220,
    width: 220,
    borderRadius: 20,
    resizeMode: "cover",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    color: "#f7fef2",
    fontWeight: "bold",
    margin: 5,
  },
});

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'tomato',
//       padding:40
//     },
//     buttonContainer: {
//           height: 40,
//           margin: 20
//     },

//       button: {
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center'
//       },
//       buttonText: {
//           color: '#fff',
//           fontSize: 18
//       }
//   });

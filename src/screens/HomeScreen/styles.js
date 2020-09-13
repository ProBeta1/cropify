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
  searchIcon: {
    height: 80,
    width: 80,
  },
  sellIcon: {
    width: 80,
    height: 50
  },
  buyIcon: {
    width: 80,
    height: 80
  },
  Box: {
    borderColor: 'black',
    borderStyle: "dashed",
    backgroundColor: '#ffea00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 50
  },
  headText: {
    fontSize: 22,
    margin: 10,
    fontWeight: 'bold',
    color: '#780116',
    borderBottomColor: 'black',
    borderBottomWidth: 3
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff006e"
  },
  headerView: {
    // flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  footerView: {
    // flex: 1,
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
    fontSize: 20,
  },
});

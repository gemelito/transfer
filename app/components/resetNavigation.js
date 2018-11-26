import { StackActions, NavigationActions } from "react-navigation";

export default resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Search" })]
});

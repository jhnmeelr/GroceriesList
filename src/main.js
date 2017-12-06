import React from 'react';
import { StackNavigator } from 'react-navigation';

import ShoppingList from './screens/shopping-list.js';
import AddProduct from './screens/add-product.js';

const Navigator = StackNavigator({
  ShoppingList: { screen: ShoppingList },
  AddProduct: { screen: AddProduct }
});

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Navigator />;
  }
}

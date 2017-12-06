import React from 'react';
import { AsyncStorage } from 'react-native';
import prompt from 'react-native-prompt-android';

import { Body, Container, Content, Right, Text, List, ListItem, Fab, Icon } from 'native-base';

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      productsInList: []
    };
  }

  async componentWillMount() {
    const savedProducts = await AsyncStorage.getItem('@allProducts');

    if (savedProducts) this.setState({ allProducts: JSON.parse(savedProducts) });

    this.setState({ productsInList: this.props.navigation.state.params.productsInList });
  }

  async addNewProduct(name) {
    const newProductsList = this.state.allProducts.concat({
      name: name,
      id: Math.floor(Math.random() * 100000)
    });

    await AsyncStorage.setItem('@allProducts', JSON.stringify(newProductsList));

    this.setState({ allProducts: newProductsList });
  }

  handleAddProductPress = () => {
    prompt('Enter product name', '', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: this.addNewProduct.bind(this) }
    ], { type: 'plain-text' });
  }

  handleProductPress = (product) => {
    const { navigation } = this.props;
    const { productsInList } = this.state;

    const productIndex = productsInList.findIndex(p => p.id === product.id);

    if (productIndex > -1) {
      this.setState({ productsInList: productsInList.filter(p => p.id !== product.id ) });
      navigation.state.params.deleteProduct(product);
    } else {
      this.setState({ productsInList: productsInList.concat(product) });
      navigation.state.params.addProduct(product);
    }
  }

  async handleRemovePress(product) {
    const { allProducts } = this.state;

    this.setState({ allProducts: allProducts.filter(p => p.id !== product.id) });

    await AsyncStorage.setItem('@allProducts', JSON.stringify(allProducts.filter(p => p.id !== product.id)));
  }

  render() {
    const { allProducts, productsInList } = this.state;

    return (
      <Container>
        <Content>
          <List>
            {
              allProducts.map(product => {
                const productIsInList = productsInList.find(p => p.id === product.id);

                return (
                  <ListItem key={product.id} onPress={() => this.handleProductPress(product)}>
                    <Body>
                      <Text style={{ color: productIsInList ? '#bbb' : '#000' }}>{product.name}</Text>
                      {productIsInList && <Text note>{'Already in shopping list'}</Text>}
                    </Body>
                    <Right>
                      <Icon
                        ios="ios-remove-circle"
                        android="md-remove-circle"
                        style={{ color: 'red' }}
                        onPress={this.handleRemovePress.bind(this, product)}
                      />
                    </Right>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this.handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

import React from 'react';
import { Alert } from 'react-native';
import { Body, Container, Content, Right, Text, CheckBox, List, ListItem, Fab, Icon } from 'native-base';

export default class ShoppingList extends React.Component {
  static navigationOptions = {
    title: 'My Groceries List'
  };

  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  handleProductPress = (product) => {
    const { products } = this.state;

    products.forEach(p => {
      if (product.id === p.id) p.gotten = !p.gotten;
      return p;
    });

    this.setState({ products });
  }

  handleAddProductPress = () => {
    const { products } = this.state;

    this.props.navigation.navigate('AddProduct', {
      addProduct: product => {
        this.setState({ products: products.concat(product) });
      },
      deleteProduct: product => {
        this.setState({ products: products.filter(p => p.id !== product.id) });
      },
      productsInList: products
    });
  }

  handleClearPress = () => {
    Alert.alert('Clear all items?', null, [
      { text: 'Cancel' },
      { text: 'Ok', onPress: () => this.setState({ products: [] }) }
    ]);
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {
              this.state.products.map(p => {
                return (
                  <ListItem key={p.id} onPress={() => this.handleProductPress(p)}>
                    <Body>
                      <Text style={{ color: p.gotten ? '#bbb' : '#000' }}>{p.name}</Text>
                    </Body>
                    <Right>
                      <CheckBox checked={p.gotten} onPress={() => this.handleProductPress(p)}/>
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
        <Fab
          style={{ backgroundColor: 'red' }}
          position="bottomLeft"
          onPress={this.handleClearPress}
        >
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}

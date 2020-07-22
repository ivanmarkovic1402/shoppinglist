import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v1 as uuidv1 } from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    componentDidMount(){
        this.props.getItems();
    }


    render() {
        const { items } = this.props.item;
        return(
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if(name){
                            this.setState(state => ({
                                items: [...state.items, {id: uuidv1(), name}]
                            }));
                        }
                    }}
                >
                    Add Item
                </Button>

                <ListGroup>
                    <div className="shopping-list">
                        {items.map(({ id, name}) => (
                                <ListGroupItem key={id}>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => this.setState(state => ({
                                            items: this.state.items.filter(item => item.id !== id)
                                        }))
                                    }
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                        ))}
                    </div>
                </ListGroup>
            </Container>
        );
    }

}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList);
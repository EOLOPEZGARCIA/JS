import React from "react";
import {View } from "react-native";
import { Container, Button,Text, H1, Input,Form, Item, Toast  } from "native-base";


const Login = () => {
    return (
        <Container>
            <View>
                <H1>UpTask</H1>
                <Form>
                    <Item inlineLabel last>
                        <Input
                        placeholder="Email"/>
                    </Item>
                </Form>
            </View>
        </Container>
      );
}
 
export default Login;
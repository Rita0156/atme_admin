// CustomEdit.js
import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, ImageInput, SaveButton, Toolbar, useNotify, useRedirect } from 'react-admin';

const UserEditToolbar = props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

const UserEdit = props => {
    const notify = useNotify();
    const redirect = useRedirect();
     console.log(props,'props%%%%%%%%%%%%%%%%%%%%%%%%')
    const handleSave = (values) => {
        // Send edited data to your API endpoint
        console.log(values,'values')
        fetch(`https://atme-quiz.onrender.com/api/${props.id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
            notify('Changes saved');
            redirect('/your-resource');
        })
        .catch((error) => {
            notify(`Error: ${error.message}`, 'error');
        });
    };
   
    return (
        <Edit {...props} save={handleSave}>
            <SimpleForm toolbar={<UserEditToolbar />} redirect="list">
               
                <TextInput source="name" />
                <NumberInput source="winningCoins" />
                <ImageInput source="quizImage" label="Avatar" accept="image/*" />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;

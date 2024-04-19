const initialState = [
    {
        id:0,
        name:"Raman Sharma",
        email:"rs@g.com",
        number:"1234567890"
    },
    {
        id:1,
        name:"abc xyz",
        emai:"ax@g.com",
        number:"12345693637"
    }
];

const contactreducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_STUDENT":
            state = [...state, action.payload];
            return state;
        case "DELETE_CONTACT":
            const contactFilter = state.filter((contact) =>
            contact.id === action.payload ? null : contact
            );
            state = contactFilter;
            return state;
        case "UPDATE_CONTACT":
            const contactUpdate = state.filter((contact) =>
            contact.id === action.payload.id
            ? Object.assign(contact, action.payload)
            : contact
            );
            state = contactUpdate;
            return state;
        default:
            return state;
    }
};

export default contactreducer;
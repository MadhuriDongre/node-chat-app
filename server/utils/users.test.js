const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: "Madhuri",
            room: "Node Course"
        },
        {
            id:'2',
            name:"Madhu",
            room:"Node Course"
        },
        {
            id:'3',
            name:"MadhuriD",
            room:"Course ES6"
        }
    ];
    });

    it('should add new user',()=>{
        let users = new Users();
        let user = {
            id:'4',
            name:"May",
            room:"React Course"
        };
        let response = users.addUser(user.id, user.name,user.room);
        expect(response).toEqual(user);
    });

    it('should get all user in given chatroom',()=>{
        let room ='Node Course';
        let response = users.getUserList(room);
        expect(response.length).toBe(2);
        expect(response).toEqual(['Madhuri','Madhu']);
    });

    it('should remove user from usersList',()=>{
        let response = users.removeUser('1');
        expect(response.name).toBe('Madhuri');
        expect(response.length).toBe(2);
    });

    it('should not remove user from usersList', () => {
        let response = users.removeUser('11');
        expect(response).toBeFalsy();
        expect(response.length).toBe(3);
    });

    it('should get user from usersList', () => {
        let response = users.getUser('1');
        expect(response).toEqual(users.users[0]);
    });

    it('should not get user from usersList', () => {
        let response = users.getUser('11');
        expect(response).toBeFalsy();
    });
});
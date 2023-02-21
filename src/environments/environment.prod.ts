
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api/",
  websocketURL: "ws://localhost:8080/api/",
  apiEndpoints: {
    login: "login/",
    persons: "persons/",
    personsWithException: "persons/except/",
    personsCreate: "persons/create/",
    personsUpdate: "persons/update/",
    chat: "chat/",
    chatConnect: "chat/connect-to-chat",
    register: "persons/register/",
    devices: "devices/",
    devicesCreate: "devices/create",
    devicesUpdate: "devices/update",
    devicesPerson: "devices/person/",
    resetPassword: "person/resetpassword/",
    measurement: "persons/measure/",
    websocket: "ws/"
  },
};

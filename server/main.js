import { Meteor } from 'meteor/meteor';
import { Attempts } from '../imports/api/attempts.js';

var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

Api.addCollection(Attempts, {
    excludedEndpoints: ['put', 'delete'],
    endpoints: {
        post: {
            action: function () {
                try {
                    const request = this;
                    //const request = CryptoJS.AES.decrypt(this, Meteor.Setting.passPhrase);

                    console.log(request.bodyParams);
                    
                    check(request.bodyParams.user, String);
                    check(request.bodyParams.temperature, String);

                    if (request.bodyParams.user.length > 30)
                        throw new Meteor.Error('bad-request', 'Username must have 30 char max');

                    request.bodyParams.temperature = parseInt(request.bodyParams.temperature);
                    
                    Attempts.insert(_.extend(request.bodyParams, {createdAt: new Date()}));

                    return {status: 'success', data: {message: 'Attempt inserted'}};
                } catch (e) {
                    return {
                        statusCode: 400,
                        body: {status: 'fail', message: e.reason}
                    };
                }
            }
        }
    }
});

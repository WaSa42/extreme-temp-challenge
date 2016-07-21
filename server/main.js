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
                const doc = this;
                //const doc = CryptoJS.AES.decrypt(this, Meteor.Setting.passPhrase);
                
                check(doc.bodyParams.user, String);
                check(doc.bodyParams.temperature, String);

                if (Attempts.insert(_.extend(doc.bodyParams, {createdAt: new Date()}))) {
                    return {status: 'success', data: {message: 'Attempt inserted'}};
                }

                return {
                    statusCode: 400,
                    body: {status: 'fail', message: 'Bad request'}
                };
            }
        }
    }
});

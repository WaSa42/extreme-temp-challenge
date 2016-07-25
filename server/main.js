import { Meteor } from 'meteor/meteor';
import { Attempts } from '../imports/api/attempts.js';

const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

Api.addCollection(Attempts, {
    excludedEndpoints: ['put', 'delete'],
    endpoints: {
        post: {
            action: function () {
                try {
                    check(this.bodyParams.user, String);
                    check(this.bodyParams.temperature, String);

                    if (this.bodyParams.user.length > 30) {
                        throw new Meteor.Error('bad-request', 'Username must have 30 char max');
                    }

                    this.bodyParams.temperature = parseInt(this.bodyParams.temperature);

                    const attempt = Attempts.findOne({
                        user: this.bodyParams.user,
                        temperature: this.bodyParams.temperature
                    });

                    if (!attempt) {
                        Attempts.insert(_.extend(this.bodyParams, {createdAt: new Date()}));
                    }

                    return {
                        status: 'success',
                        data: {
                            message: 'Attempt inserted'
                        }
                    };
                } catch (e) {
                    return {
                        statusCode: 400,
                        body: {
                            status: 'fail',
                            message: e.reason
                        }
                    };
                }
            }
        }
    }
});

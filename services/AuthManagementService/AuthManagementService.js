const request = require("request");
const EnvsService = require("../EnvsService");

const AuthManagementService = {

    managementToken: {
        access_token: "",
        expires_in: 0,
        token_type: ""
    },

    config(authConfig) {
        this.authConfig = authConfig;
        this.fetchManagementAccessToken();
    },

    fetchManagementAccessToken() {
        if (EnvsService.env.MANAGEMENT_TEST_TOKEN) {
            setTimeout(() => {
                const token = EnvsService.env.MANAGEMENT_TEST_TOKEN;
                this.managementToken.access_token = token;
                this.managementToken.token_type = 'Bearer';
            }, 1000)
        } else {
            /**
             * ENVs for this code block does not exist yet.
             * Check Auth0 panel and restore them
             */
            const options = {
                method: 'POST',
                url: EnvsService.env.MANAGEMENT_TOKEN_REQUEST_OPTIONS_URL,
                headers: { 'content-type': 'application/json' },
                body: EnvsService.env.MANAGEMENT_TOKEN_REQUEST_OPTIONS_BODY
            };

            request(options, async (error, response, body) => {
                if (error) throw new Error(error);
                this.managementToken = JSON.parse(body);
            });
        }
    },

    fetchAuth0Users(req, res) {

        if (EnvsService.env.USE_FAKE_OTHER_USERS) {
            res.status(200).json({
                message: 'Users',
                data: mockedOtherUsers
            })
        } else {
            /**
             * This code block does not know if managementToken is expired.
             * Add checker logic and refetch if needed.
             */
            
            const options = {
                method: 'GET',
                url: `https://${this.authConfig.domain}/api/v2/users`,
                params: { q: 'page:"1"', search_engine: 'v3' },
                headers: { authorization: `Bearer ${this.managementToken.access_token}` }
            };

            request(options, function (error, response, body) {
                if (error) {
                    return res.status(500).json({
                        message: "Failed to fetch users",
                        error,
                    })
                }

                try {
                    const data = JSON.parse(body);
                    if (data.statusCode && data.statusCode !== 200) {
                        return res.status(data.statusCode).json({
                            message: data.message || 'Users fetching error',
                            error: data.error || 'Unknown error'
                        });
                    }
                    return res.status(200).json({
                        message: "Users data",
                        data
                    });

                } catch (e) {
                    res.status(500).json({
                        message: "Users data parsing error",
                        error: e,
                    });
                }
            })
        }
    }
}

const mockedUserMe = {
    name: 'John Jack Doe',
    given_name: 'John',
    family_name: 'Doe',
    middle_name: 'Jack',
    nickname: 'ripper',
    preferred_username: 'joy',
    email: 'john.doe@domain.org',
    sub: 'oauth:john.doe.id'
}

const mockedOtherUsers = [
    {
        ...mockedUserMe,
        user_id: mockedUserMe.sub
    },
    {
        email: 'some.user@example.com',
        user_id: 'oauth:some.user.id',
        name: 'Some Person',
        nickname: 'somix',
    },
    {
        email: 'natalka.tomaszczyk@domain.org',
        user_id: 'oauth:natalka.tomaszc.id',
        name: 'Natalia Tomaszczyk',
        nickname: 'Natrix',
    },
    {
        email: 'maciek.bartek@domain.org',
        user_id: 'oauth:maciek.bartek.id',
        name: 'Bartek Bartyński',
        nickname: 'eminem',
    }
]

module.exports = {
    AuthManagementService,
    mockedUserMe
}
const request = require("request");
const EnvsService = require("../EnvsService");

const managementToken = {
    access_token: "",
    expires_in: 0,
    token_type: ""
};

function getInstance(authConfig, mockOtherUsers) {
    const service = {
        fetchManagementAccessToken() {
            if (EnvsService.env.MANAGEMENT_TEST_TOKEN) {
                setTimeout(() => {
                    const token = EnvsService.env.MANAGEMENT_TEST_TOKEN;
                    managementToken.access_token = token;
                    managementToken.token_type = 'Bearer';
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
                    managementToken.access_token = JSON.parse(body).access_token;
                    managementToken.expires_in = JSON.parse(body).expires_in;
                    managementToken.token_type = JSON.parse(body).token_type;
                });
            }
        },
    
        fetchAuth0Users(req, res) {
            if (EnvsService.env.USE_FAKE_OTHER_USERS) {
                res.status(200).json({
                    message: 'Users',
                    data: mockOtherUsers
                })
            } else {
                /**
                 * This code block does not know if managementToken is expired.
                 * Add checker logic and refetch if needed.
                 */
                const options = {
                    method: 'GET',
                    url: `https://${authConfig.domain}/api/v2/users`,
                    params: { q: 'page:"1"', search_engine: 'v3' },
                    headers: { authorization: `Bearer ${managementToken.access_token}` }
                };
    
                request(options, (error, response, body) => {
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

    if (!this.instance) {
        this.instance = service;
        service.fetchManagementAccessToken()
    }

    return this.instance;
}

const AuthManagementServiceSingleton = {
    instance: null,
    getInstance,
}

module.exports = AuthManagementServiceSingleton;
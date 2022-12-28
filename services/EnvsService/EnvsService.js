const EnvsService = {
    config(env){
        this.env = { ...env};
        this.configBool();
    },
    configBool(){
        Object.entries(this.env).forEach(entry => {
            const [key, value] = entry;
            const booleanNames = ['true', 'TRUE', 'false', 'FALSE'];
            if (booleanNames.includes(value)){
                this.env[key] = value.toLowerCase() === 'true' 
                    ? true
                    : false;
            }
        })
    },
}

module.exports = EnvsService;